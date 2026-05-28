import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import DotNav from '@/components/DotNav'
import Flicker from '@/components/Flicker'
import Frame from '@/components/Frame'
import Link from 'next/link'

const DOT_NAV = [
  { href: '#f-hero',    label: 'Hero'    },
  { href: '#f-noun',    label: 'Noun'    },
  { href: '#f-cohort',  label: 'Cohort'  },
  { href: '#f-time',    label: 'Time'    },
  { href: '#f-topics',  label: 'Topics'  },
  { href: '#f-keynote', label: 'Keynote' },
  { href: '#f-cta',     label: 'Apply'   },
]

export default function Home() {
  return (
    <>
      <Chrome />
      <Cursor />
      <DotNav links={DOT_NAV} />

      <div className="deck">

        {/* ── 01  HERO ─────────────────────────────────────── */}
        <Frame id="f-hero" caption={
          <><span><em>NOV</em> 06 — 07 · 2026</span><span>STATUS — <em>OPEN</em></span><span>50 SEATS</span></>
        }>
          <div>
            <div className="sub" style={{ marginBottom: '24px' }}>
              <em>—</em> a working symposium · in residence · 1.5 days
            </div>

            {/* The original hero title — glitch on hover, em italic accents */}
            <h1
              className="giga glitch"
              data-text="Hallu_cinations."
              style={{ marginBottom: '28px' }}
            >
              Hallu<em>cina</em>—<br />
              tions<em>.</em>
            </h1>

            {/* Inline flicker subline — exactly like the original */}
            <div className="sub">
              the model said something{' '}
              <Flicker words={['false','untrue','invented','wrong','imaginary','fabricated','confabulated','made-up']} />{' '}
              &nbsp;·&nbsp; and we&apos;ll spend{' '}
              <Flicker words={['1.5 days','36 hours','two evenings','a Friday & Saturday']} interval={3400} />{' '}
              &nbsp;·&nbsp; figuring out{' '}
              <Flicker words={['why','how','when','where','whether','what to do']} interval={4000} />.
            </div>

            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '40px' }}>
              <Link href="/apply"     className="btn btn--primary">Apply now <span className="arrow">→</span></Link>
              <Link href="/symposium" className="btn">Read more</Link>
            </div>
          </div>
        </Frame>

        {/* ── 02  NOUN — giant cycling word ────────────────── */}
        <Frame id="f-noun" caption={
          <><span>NOUN <em>—</em> contested</span><span>9 candidates · 1 room</span><span>scroll <em>↓</em></span></>
        }>
          <div>
            <div className="sub" style={{ marginBottom: '28px' }}>
              <em>—</em> what the model does, when it has no idea
            </div>

            {/* This is the whole point — one giant cycling word */}
            <h2 className="giga">
              <Flicker
                words={['Hallucination','Confabulation','Fabrication','Mirage','Phantasm','Delusion','Bullshit','Drift','Counterfeit']}
                interval={2400}
              />
              <em>.</em>
            </h2>

            <p className="sub" style={{ marginTop: '36px', maxWidth: '60ch', lineHeight: '1.7' }}>
              We do not yet have one word. Day one of HAIM is, in part, an argument.
            </p>
          </div>
        </Frame>

        {/* ── 03  COHORT ───────────────────────────────────── */}
        <Frame id="f-cohort" caption={
          <><span><em>25</em> STUDENTS · NSF-funded travel</span><span><em>25</em> PROS · academia + industry</span><span>fully in residence</span></>
        }>
          <div>
            <div className="sub" style={{ marginBottom: '32px' }}>
              <em>—</em> participants in residence
            </div>
            <div className="giga">
              <Flicker words={['50','25+25','½ + ½','fifty','FIFTY','050']} interval={2800} />
            </div>
            <p className="sub" style={{ marginTop: '36px', maxWidth: '60ch', lineHeight: '1.7' }}>
              <em>25</em> students. <em>25</em> professionals. A small room is the point.
            </p>
          </div>
        </Frame>

        {/* ── 04  TIME ─────────────────────────────────────── */}
        <Frame id="f-time" caption={
          <><span>FRI <em>06 NOV</em> · introduction</span><span>SAT <em>07 NOV</em> · working sessions</span><span>11 moves total</span></>
        }>
          <div>
            <div className="sub" style={{ marginBottom: '32px' }}>
              <em>—</em> when, and how long
            </div>
            <h2 className="giga">
              <Flicker words={['1.5 days','36 hours','two nights','Nov 06—07','Fri → Sat']} interval={3000} />
            </h2>
            <p className="sub" style={{ marginTop: '36px', maxWidth: '64ch', lineHeight: '1.7' }}>
              Arrive Friday after the workweek. Leave Saturday night with a draft.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/program" className="btn">See the program <span className="arrow">→</span></Link>
            </div>
          </div>
        </Frame>

        {/* ── 05  TOPICS ───────────────────────────────────── */}
        <Frame id="f-topics" variant="tall" caption={
          <><span>TOPICS — <em>10 + 1</em></span><span>headroom on the agenda</span><span>non-exhaustive</span></>
        }>
          <div className="row-list">
            <div className="sub" style={{ marginBottom: '32px' }}>
              <em>—</em> ten threads, non-exhaustive
            </div>
            {[
              ['01','Visualization of AI models — during & after training',                   'Visualization'],
              ['02','Visualization of inference processes',                                   'Visualization'],
              ['03','Foundational studies — statistical model equivalence & similarity',      'Foundations'  ],
              ['04','Token space versus training-data space',                                 'Geometry'     ],
              ['05','Exploitation of hallucinations in cyberattacks',                         'Security'     ],
              ['06','Automated detection of AI hallucinations',                               'Detection'    ],
              ['07','Prevention and mitigation strategies',                                   'Mitigation'   ],
              ['08','Visualization techniques for detection & mitigation',                    'Visualization'],
              ['09','Development of standards to reduce hallucinations',                      'Standards'    ],
              ['10','Social implications — questions of responsibility',                      'Society'      ],
            ].map(([n, title, tag]) => (
              <div key={n} className="lrow">
                <span className="lrow__n">{n}</span>
                <span className="lrow__t">{title}</span>
                <span className="lrow__c">{tag}</span>
              </div>
            ))}
            <div className="lrow">
              <span className="lrow__n" style={{ color: 'var(--accent)' }}>+</span>
              <span className="lrow__t" style={{ color: 'var(--accent)' }}>— bring a topic we missed</span>
              <span className="lrow__c"><Link href="/apply">Propose →</Link></span>
            </div>
          </div>
        </Frame>

        {/* ── 06  KEYNOTE ──────────────────────────────────── */}
        <Frame id="f-keynote" caption={
          <><span>STATUS — <em>invited</em></span><span>FRI 13:00 — 14:00</span><span>+ 4 invited talks · Sat AM</span></>
        }>
          <div>
            <div className="sub" style={{ marginBottom: '32px' }}>
              <em>—</em> opening keynote · invitation pending
            </div>
            <h2 className="mega" style={{ maxWidth: '16ch' }}>
              <Flicker words={['Yann LeCun','[TBD]','Awaiting reply','Invited']} interval={3400} />,<br />
              on the <em>current status</em><br />
              of <Flicker words={['hallucinations','confabulations','fabrications','mirages']} interval={3100} />.
            </h2>
            <p className="sub" style={{ marginTop: '36px', maxWidth: '60ch', lineHeight: '1.7' }}>
              Invitation out. Awaiting confirmation.
            </p>
          </div>
        </Frame>

        {/* ── 07  CTA ──────────────────────────────────────── */}
        <Frame id="f-cta" caption={
          <><span>© HAIM · Edition <em>I</em> · 2026</span><span>built on questions, not certainty</span><span><a href="mailto:haim@symposium.tbd">haim@symposium.tbd</a></span></>
        }>
          <div>
            <div className="sub" style={{ marginBottom: '32px' }}>
              <em>—</em> final frame
            </div>
            <h2 className="giga">
              Come <em>build</em><br />
              the <Flicker words={['report','proposal','argument','brief','thing']} interval={2800} />.
            </h2>
            <p className="sub" style={{ marginTop: '36px', maxWidth: '60ch', lineHeight: '1.7' }}>
              50 seats. Students attach a one-page abstract.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/apply"     className="btn btn--primary">Apply <span className="arrow">→</span></Link>
              <Link href="/symposium" className="btn">Read more</Link>
            </div>
          </div>
        </Frame>

      </div>
    </>
  )
}
