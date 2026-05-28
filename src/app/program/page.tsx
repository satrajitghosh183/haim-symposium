import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import DotNav from '@/components/DotNav'
import Flicker from '@/components/Flicker'
import Frame from '@/components/Frame'
import Link from 'next/link'

const DOT_NAV = [
  { href: '#prog-title', label: 'Overview' },
  { href: '#prog-day1', label: 'Day 1' },
  { href: '#prog-day2', label: 'Day 2' },
  { href: '#prog-notes', label: 'Notes' },
  { href: '#prog-cta', label: 'Apply' },
]

const DAY1 = [
  { time: '09:00', end: '13:00', title: 'Arrival · Check-in · Orientation', tag: 'Logistics' },
  { time: '13:00', end: '14:00', title: 'Keynote: Hallucinations as a Systems Problem', tag: 'Keynote' },
  { time: '14:00', end: '16:30', title: 'Ice-breaker · Structured introductions · Topic mapping', tag: 'Warm-up' },
  { time: '16:30', end: '18:00', title: 'Break · Informal conversations', tag: 'Break' },
  { time: '18:00', end: '20:30', title: 'Welcome dinner · Lightning session #1 (5 talks × 5 min)', tag: 'Dinner + Lightning' },
]

const DAY2 = [
  { time: '08:00', end: '09:30', title: 'Breakfast · Lightning session #2 (5 talks × 5 min)', tag: 'Breakfast + Lightning' },
  { time: '10:00', end: '12:30', title: 'Invited talks · Q&A panels (3 × 50 min)', tag: 'Talks' },
  { time: '12:30', end: '14:00', title: 'Lunch · Lightning session #3 (5 talks × 5 min)', tag: 'Lunch + Lightning' },
  { time: '14:00', end: '16:30', title: 'Working groups · Parallel tracks on 3 themes', tag: 'Working Groups' },
  { time: '16:30', end: '18:00', title: 'Lightning session #4 (5 talks × 5 min) · Synthesis plenary', tag: 'Lightning + Synthesis' },
  { time: '18:00', end: '20:30', title: 'Concluding dinner · Awards · Report commitments', tag: 'Dinner + Awards' },
]

const NOTES = [
  { n: '01', title: 'All sessions are held under Chatham House Rule — no attribution without consent', tag: 'Policy' },
  { n: '02', title: 'Lightning talks are 5 minutes strictly timed; slides optional but recommended', tag: 'Format' },
  { n: '03', title: 'Working groups produce a one-page summary each, merged into the final report', tag: 'Output' },
]

export default function ProgramPage() {
  return (
    <>
      <Chrome />
      <Cursor />
      <DotNav links={DOT_NAV} />

      <div className="deck">
        {/* 01 — Title */}
        <Frame
          id="prog-title"
         
        >
          <div style={{ maxWidth: '780px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>Nov 06 – 07 · 2026</p>
            <h1 className="mega" style={{ marginBottom: '32px' }}>
              <Flicker words={['Two','2','II']} interval={4000} as="span" /> days.<br />
              <Flicker words={['Eleven','11','XI']} interval={4400} as="span" /> moves.
            </h1>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                color: 'var(--text-dim)',
                maxWidth: '520px',
                lineHeight: '1.7',
              }}
            >
              The program is structured to maximize cross-pollination between students and professionals.
              Four lightning sessions give every student attendee a speaking slot.
              Working groups generate the raw material for the published report.
            </p>
          </div>
        </Frame>

        {/* 02 — Day 1 */}
        <Frame
          id="prog-day1"
          variant="tall"
         
        >
          <div style={{ maxWidth: '760px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '8px' }}>Day 01</p>
            <h2 className="macro" style={{ marginBottom: '40px' }}>Thursday, Nov 6</h2>
            <div className="timeline-frame">
              {DAY1.map((s) => (
                <div key={s.time} className="slot">
                  <span className="slot__time">{s.time}–{s.end}</span>
                  <span className="slot__title">{s.title}</span>
                  <span className="slot__tag">{s.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 03 — Day 2 */}
        <Frame
          id="prog-day2"
          variant="tall"
         
        >
          <div style={{ maxWidth: '760px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '8px' }}>Day 02</p>
            <h2 className="macro" style={{ marginBottom: '40px' }}>Friday, Nov 7</h2>
            <div className="timeline-frame">
              {DAY2.map((s) => (
                <div key={s.time} className="slot">
                  <span className="slot__time">{s.time}–{s.end}</span>
                  <span className="slot__title">{s.title}</span>
                  <span className="slot__tag">{s.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 04 — Notes */}
        <Frame
          id="prog-notes"
         
        >
          <div style={{ maxWidth: '760px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>Participation notes</p>
            <div>
              {NOTES.map((n) => (
                <div key={n.n} className="lrow">
                  <span className="lrow__n">{n.n}</span>
                  <span className="lrow__title">{n.title}</span>
                  <span className="lrow__tag">{n.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 05 — CTA */}
        <Frame
          id="prog-cta"
         
        >
          <div style={{ maxWidth: '640px', textAlign: 'center' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>Applications</p>
            <h2 className="macro" style={{ marginBottom: '40px' }}>
              Secure your seat.
            </h2>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/apply" className="btn btn--primary">Apply now</Link>
              <Link href="/people" className="btn btn--ghost">Meet the team</Link>
            </div>
          </div>
        </Frame>
      </div>
    </>
  )
}
