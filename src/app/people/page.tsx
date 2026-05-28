import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import DotNav from '@/components/DotNav'
import Flicker from '@/components/Flicker'
import Frame from '@/components/Frame'
import Link from 'next/link'
import Image from 'next/image'

const DOT_NAV = [
  { href: '#ppl-title',     label: 'People'    },
  { href: '#ppl-committee', label: 'Committee' },
  { href: '#ppl-keynote',   label: 'Keynote'   },
  { href: '#ppl-speakers',  label: 'Speakers'  },
  { href: '#ppl-interest',  label: 'Join'      },
]

const COMMITTEE = [
  {
    name: 'J. Jenny Li',
    nameEm: 'Li',
    role: 'General Chair',
    institution: 'Kean University · Dept. of Computer Science & Technology',
    bio: 'Full Professor. PhD, University of Waterloo. 100+ publications, 20 patents. NSF Program Director.',
    email: 'juli@kean.edu',
    photo: '/people/jenny-li.jpg',
  },
  {
    name: 'Dov Kruger',
    nameEm: 'Kruger',
    role: 'General Chair',
    institution: 'Rutgers University · Dept. of Electrical & Computer Engineering',
    bio: 'Associate Teaching Professor. PhD, Stevens Institute of Technology. High-performance computing & networking.',
    email: 'dov.kruger@rutgers.edu',
    photo: '/people/dov-kruger.jpg',
  },
  {
    name: 'Katherine August',
    nameEm: 'August',
    role: 'Program Chair',
    institution: 'Stevens Institute of Technology · NJIT',
    bio: 'Researcher in biomedical engineering, signal processing & neurorehabilitation. h-index 22, 3,600+ citations.',
    email: 'kit.august@gmail.com',
    photo: '/people/kit-august.jpg',
  },
  {
    name: 'Dunni Adenuga',
    nameEm: 'Adenuga',
    role: 'Program Chair',
    institution: 'Kean University · Dept. of Computer Science & Technology',
    bio: 'Assistant Professor. PhD, Penn State University. Human-Centered AI & Explainable AI.',
    email: 'dunni.adenuga@kean.edu',
    photo: '/people/dunni-adenuga.png',
  },
  {
    name: 'Yulia Kumar',
    nameEm: 'Kumar',
    role: 'Student Chair',
    institution: 'Kean University · Dept. of Computer Science & Technology',
    bio: 'Lecturer & PhD researcher. Computer Vision, NLP, Transformers. Rutgers ECE PhD candidate.',
    email: 'yuliakumar2017@gmail.com',
    photo: '/people/yulia-kumar.jpg',
  },
  {
    name: 'Satrajit Ghosh',
    nameEm: 'Ghosh',
    role: 'Student Chair',
    institution: 'Software Engineer & Researcher',
    bio: 'Game developer and software engineer. VR, AI, and full-stack systems.',
    email: 'satrajitghosh183@gmail.com',
    photo: '/people/satrajit-ghosh.jpg',
  },
]

function PersonCard({ p }: { p: typeof COMMITTEE[0] }) {
  const [first, ...rest] = p.name.split(' ')
  const last = rest.join(' ')
  return (
    <div className="person">
      <div
        className="person__photo"
        style={{ position: 'relative', overflow: 'hidden' }}
        data-label={p.role}
      >
        <Image
          src={p.photo}
          alt={p.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes="(max-width:600px) 100vw, 33vw"
        />
      </div>
      <p className="person__role">{p.role}</p>
      <p className="person__name">
        {first} <em>{last}</em>
      </p>
      <p className="person__inst">{p.institution}</p>
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '12px',
          color: 'var(--text-faint)',
          lineHeight: 1.6,
        }}
      >
        {p.bio}
      </p>
      <p className="person__mail">{p.email}</p>
    </div>
  )
}

export default function PeoplePage() {
  return (
    <>
      <Chrome />
      <Cursor />
      <DotNav links={DOT_NAV} />

      <div className="deck">

        {/* 01 — Title */}
        <Frame id="ppl-title">
          <div style={{ maxWidth: '780px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>Organizers · Speakers · Attendees</p>
            <h1 className="mega" style={{ marginBottom: '32px' }}>
              The <Flicker words={['humans','people','minds','researchers','builders']} interval={3000} as="span" /><br />
              behind HAIM.
            </h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', color: 'var(--text-dim)', maxWidth: '520px', lineHeight: '1.7' }}>
              Six organizers across four institutions. Research spanning AI safety, human-centered AI,
              high-performance computing, signal processing, and science education.
            </p>
          </div>
        </Frame>

        {/* 02 — Committee */}
        <Frame id="ppl-committee" variant="tall">
          <div style={{ maxWidth: '1100px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '40px' }}>— organizing committee · 2026</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              {COMMITTEE.map((p) => <PersonCard key={p.name} p={p} />)}
            </div>
          </div>
        </Frame>

        {/* 03 — Keynote */}
        <Frame id="ppl-keynote" variant="split">
          <div>
            <p className="sub" style={{ marginBottom: '24px' }}>— opening keynote · invitation pending</p>
            <h2 className="macro" style={{ marginBottom: '16px' }}>
              <Flicker words={['Yann LeCun','[TBD]','Awaiting reply']} interval={4000} as="span" />
            </h2>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '24px' }}>
              Chief AI Scientist · Meta AI · NYU Courant
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.7', maxWidth: '400px' }}>
              Turing Award laureate. Pioneer of convolutional neural networks. Invited to speak on the
              fundamental limits and failure modes of current AI architectures.
            </p>
            <div style={{ marginTop: '24px' }}>
              <span className="badge badge--pending">Invited · Pending confirmation</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '240px', height: '300px',
              backgroundImage: 'repeating-linear-gradient(45deg, var(--line-soft) 0px, var(--line-soft) 1px, transparent 1px, transparent 12px)',
              backgroundColor: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--line)',
            }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'var(--text-faint)', fontStyle: 'italic' }}>YL</span>
            </div>
          </div>
        </Frame>

        {/* 04 — Invited Speakers */}
        <Frame id="ppl-speakers">
          <div style={{ maxWidth: '960px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '40px' }}>— invited speakers · Saturday AM · TBD</p>
            <div className="people-row">
              {['Foundations','Detection','Visualization','Standards'].map((theme, n) => (
                <div key={n} className="person">
                  <div className="person__photo" data-label={`Slot 0${n+1}`} />
                  <p className="person__role">Invited talk</p>
                  <p className="person__name"><em>Speaker {n+1}</em></p>
                  <p className="person__inst">{theme} · TBD</p>
                  <p className="person__mail">—</p>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 05 — CTA */}
        <Frame id="ppl-interest">
          <div style={{ maxWidth: '640px', textAlign: 'center' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>— join us</p>
            <h2 className="macro" style={{ marginBottom: '24px' }}>
              Applications are <Flicker words={['open','live','ready']} interval={3200} as="span" />.
            </h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', color: 'var(--text-dim)', lineHeight: '1.7', marginBottom: '40px' }}>
              50 seats. Two tracks: students (lightning talk required) and professionals.
              NSF travel grants available for students.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/apply"   className="btn btn--primary">Apply now <span className="arrow">→</span></Link>
              <Link href="/program" className="btn btn--ghost">See the program</Link>
            </div>
          </div>
        </Frame>

      </div>
    </>
  )
}
