import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import DotNav from '@/components/DotNav'
import Frame from '@/components/Frame'
import Link from 'next/link'

const DOT_NAV = [
  { href: '#ppl-title', label: 'People' },
  { href: '#ppl-committee', label: 'Committee' },
  { href: '#ppl-keynote', label: 'Keynote' },
  { href: '#ppl-speakers', label: 'Speakers' },
  { href: '#ppl-interest', label: 'Interest' },
]

const COMMITTEE = [
  {
    name: 'Jenny Li',
    role: 'Chair',
    institution: 'MIT CSAIL',
    email: 'jenny.li@mit.edu',
    initial: 'JL',
  },
  {
    name: 'Kit August',
    role: 'Invitations',
    institution: 'Stanford HAI',
    email: 'kaugust@stanford.edu',
    initial: 'KA',
  },
  {
    name: 'Dunni Adenuga',
    role: 'NSF Grants',
    institution: 'NSF',
    email: 'd.adenuga@nsf.gov',
    initial: 'DA',
  },
  {
    name: 'Dov Kruger',
    role: 'Web Host',
    institution: 'Stevens Institute',
    email: 'dkruger@stevens.edu',
    initial: 'DK',
  },
  {
    name: 'Yuli Kumar',
    role: 'Organizer',
    institution: 'Carnegie Mellon',
    email: 'yukumar@cmu.edu',
    initial: 'YK',
  },
  {
    name: 'Satrajit Ghosh',
    role: 'Web & Technical',
    institution: 'MIT McGovern',
    email: 'satrajit@mit.edu',
    initial: 'SG',
  },
]

export default function PeoplePage() {
  return (
    <>
      <Chrome />
      <Cursor />
      <DotNav links={DOT_NAV} />

      <div className="deck">
        {/* 01 — Title */}
        <Frame
          id="ppl-title"
         
        >
          <div style={{ maxWidth: '780px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>Organizers · Speakers · Attendees</p>
            <h1 className="mega" style={{ marginBottom: '32px' }}>
              The humans<br />behind HAIM.
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
              The organizing committee brings together researchers, educators, and practitioners
              with deep expertise in AI safety, machine learning, and science policy.
            </p>
          </div>
        </Frame>

        {/* 02 — Committee */}
        <Frame
          id="ppl-committee"
          variant="tall"
         
        >
          <div style={{ maxWidth: '960px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '40px' }}>Organizing committee · 2026</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
            >
              {COMMITTEE.map((p) => (
                <div key={p.name} className="person">
                  <div className="person__photo">
                    <span>{p.initial}</span>
                  </div>
                  <p className="person__name">{p.name}</p>
                  <p className="person__role">{p.role}</p>
                  <p className="person__inst">{p.institution}</p>
                  <p className="person__mail">{p.email}</p>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 03 — Keynote */}
        <Frame
          id="ppl-keynote"
          variant="split"
         
        >
          <div>
            <p className="sub" style={{ marginBottom: '24px' }}>Keynote speaker</p>
            <h2 className="macro" style={{ marginBottom: '16px' }}>
              Yann LeCun
            </h2>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '24px',
              }}
            >
              Chief AI Scientist · Meta AI
            </p>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--text-dim)',
                lineHeight: '1.7',
                maxWidth: '400px',
              }}
            >
              Turing Award laureate, VP and Chief AI Scientist at Meta, Professor at NYU Courant Institute.
              Pioneer of convolutional neural networks and deep learning. Invited to speak on the
              fundamental limits and failure modes of current AI architectures.
            </p>
            <div
              style={{
                marginTop: '8px',
                padding: '8px 0',
                borderTop: '1px solid var(--line-soft)',
              }}
            >
              <span className="badge badge--pending">Invited · Pending confirmation</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '240px',
                height: '300px',
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  var(--line-soft) 0px,
                  var(--line-soft) 1px,
                  transparent 1px,
                  transparent 12px
                )`,
                backgroundColor: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--line)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '40px',
                  color: 'var(--text-faint)',
                  fontStyle: 'italic',
                }}
              >
                YL
              </span>
            </div>
          </div>
        </Frame>

        {/* 04 — Invited Speakers */}
        <Frame
          id="ppl-speakers"
         
        >
          <div style={{ maxWidth: '960px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '40px' }}>Invited speakers · Pending confirmation</p>
            <div className="people-row">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="person">
                  <div className="person__photo">
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px' }}>TBD</span>
                  </div>
                  <p className="person__name">Invited Speaker {n}</p>
                  <p className="person__role">Pending</p>
                  <p className="person__inst">Institution TBD</p>
                  <p className="person__mail">—</p>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 05 — Interest */}
        <Frame
          id="ppl-interest"
         
        >
          <div style={{ maxWidth: '640px', textAlign: 'center' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>Join us</p>
            <h2 className="macro" style={{ marginBottom: '24px' }}>
              Applications are open.
            </h2>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                color: 'var(--text-dim)',
                lineHeight: '1.7',
                marginBottom: '40px',
              }}
            >
              We welcome students (with a 5-minute lightning talk) and professionals across
              academia, industry, and government. Fifty seats, two tracks.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/apply" className="btn btn--primary">Apply now</Link>
              <Link href="/program" className="btn btn--ghost">See the program</Link>
            </div>
          </div>
        </Frame>
      </div>
    </>
  )
}
