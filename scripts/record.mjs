import { chromium } from 'playwright'
import { execSync, spawn } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../video-out')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const RAW = join(OUT_DIR, 'raw.webm')
const FINAL = join(OUT_DIR, 'haim-2026.mp4')

const W = 1920
const H = 1080

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function smoothScroll(page, selector, targetY, durationMs = 1200) {
  await page.evaluate(
    ({ sel, y, dur }) => {
      const el = sel ? document.querySelector(sel) : window
      const scroller = el || window
      const start = scroller.scrollTop ?? 0
      const dist = y - start
      const startTime = performance.now()
      function step(now) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / dur, 1)
        // ease in-out cubic
        const ease = progress < 0.5
          ? 4 * progress ** 3
          : 1 - (-2 * progress + 2) ** 3 / 2
        scroller.scrollTo({ top: start + dist * ease })
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    },
    { sel: selector, y: targetY, dur: durationMs }
  )
  await sleep(durationMs + 200)
}

;(async () => {
  console.log('🎬 Launching browser…')
  const browser = await chromium.launch({
    headless: false,
    args: [
      `--window-size=${W},${H}`,
      '--window-position=0,0',
      '--disable-infobars',
      '--no-default-browser-check',
    ],
  })

  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    recordVideo: { dir: OUT_DIR, size: { width: W, height: H } },
  })
  const page = await ctx.newPage()

  // ── HOME PAGE ─────────────────────────────────────────────────────────────
  console.log('→ Home')
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await sleep(2800) // let flicker settle on hero

  // Scroll through each frame
  const frameIds = ['f-noun', 'f-cohort', 'f-time', 'f-topics', 'f-keynote', 'f-cta']
  for (const id of frameIds) {
    const frame = page.locator(`#${id}`)
    await frame.scrollIntoViewIfNeeded()
    await sleep(id === 'f-topics' ? 3200 : 2400)
  }

  // ── PROGRAM PAGE ──────────────────────────────────────────────────────────
  console.log('→ Program')
  await page.goto('http://localhost:3000/program', { waitUntil: 'networkidle' })
  await sleep(1800)
  for (const id of ['f-day1', 'f-day2', 'f-notes']) {
    const el = page.locator(`#${id}`)
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded()
      await sleep(2200)
    }
  }

  // ── PEOPLE PAGE ───────────────────────────────────────────────────────────
  console.log('→ People')
  await page.goto('http://localhost:3000/people', { waitUntil: 'networkidle' })
  await sleep(1800)
  for (const id of ['f-committee', 'f-keynote', 'f-invited']) {
    const el = page.locator(`#${id}`)
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded()
      await sleep(2200)
    }
  }

  // ── SYMPOSIUM PAGE ────────────────────────────────────────────────────────
  console.log('→ Symposium')
  await page.goto('http://localhost:3000/symposium', { waitUntil: 'networkidle' })
  await sleep(1800)
  for (const id of ['f-objective', 'f-format', 'f-topics', 'f-output']) {
    const el = page.locator(`#${id}`)
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded()
      await sleep(2000)
    }
  }

  // ── APPLY PAGE ────────────────────────────────────────────────────────────
  console.log('→ Apply')
  await page.goto('http://localhost:3000/apply', { waitUntil: 'networkidle' })
  await sleep(2400)

  // ── BACK HOME for final shot ───────────────────────────────────────────────
  console.log('→ Final shot')
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await sleep(3000)

  console.log('⏹  Closing browser…')
  const videoPath = await page.video()?.path()
  await ctx.close()
  await browser.close()

  if (!videoPath || !existsSync(videoPath)) {
    console.error('❌ No video captured at', videoPath)
    process.exit(1)
  }

  console.log('✅ Raw captured:', videoPath)

  // ── FFMPEG POST-PROCESS ───────────────────────────────────────────────────
  console.log('🎞  Post-processing with ffmpeg…')

  // Build filtergraph:
  //  1. Scale to 1920×1080 (pad if needed)
  //  2. Fade in 0.6s, fade out 0.8s
  //  3. Subtle vignette
  //  4. Slight contrast + saturation boost (the green accent should pop)
  //  5. Black title card at start (0.8s) and end (1.2s)

  const DURATION_PROBE = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${videoPath}"`
  ).toString().trim()
  const duration = parseFloat(DURATION_PROBE)
  const fadeOutStart = Math.max(duration - 1.2, duration - 1.5)

  const filter = [
    // scale / pad
    `scale=${W}:${H}:force_original_aspect_ratio=decrease`,
    `pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=black`,
    // color grade — boost contrast slightly, keep the neon green popping
    `eq=contrast=1.06:brightness=-0.02:saturation=1.15`,
    // vignette
    `vignette=PI/4`,
    // fade in / fade out
    `fade=t=in:st=0:d=0.7`,
    `fade=t=out:st=${fadeOutStart.toFixed(2)}:d=1.0`,
  ].join(',')

  const cmd = [
    'ffmpeg', '-y',
    '-i', videoPath,
    '-vf', filter,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '16',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    FINAL,
  ]

  console.log('Running:', cmd.join(' '))
  const ff = spawn(cmd[0], cmd.slice(1), { stdio: 'inherit' })
  ff.on('close', (code) => {
    if (code === 0) {
      console.log('\n✨ Done!  →', FINAL)
      // Open in QuickTime
      execSync(`open "${FINAL}"`)
    } else {
      console.error('ffmpeg exited with code', code)
    }
  })
})()
