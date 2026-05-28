import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import DotNav from '@/components/DotNav'
import Flicker from '@/components/Flicker'
import Frame from '@/components/Frame'
import Link from 'next/link'

const DOT_NAV = [
  { href: '#hero', label: 'Hero' },
  { href: '#noun', label: 'What' },
  { href: '#cohort', label: 'Who' },
  { href: '#time', label: 'When' },
  { href: '#topics', label: 'Topics' },
  { href: '#keynote', label: 'Keynote' },
  { href: '#apply', label: 'Apply' },
]

const TOPICS = [
  { n: '01', title: 'Foundations of hallucination in large language models', key: 'hallucination', tag: 'LLM' },
  { n: '02', title: 'Inference-time confabulation and mitigation strategies', key: 'inference', tag: 'Inference' },
  { n: '03', title: 'Token-level uncertainty and calibration', key: 'Token', tag: 'Calibration' },
  { n: '04', title: 'Hallucinations as cyberattacks vectors', key: 'cyberattacks', tag: 'Security' },
  { n: '05', title: 'Automated detection of model fabrications', key: 'detection', tag: 'Eval' },
  { n: '06', title: 'Prevention through architectural design', key: 'Prevention', tag: 'Architecture' },
  { n: '07', title: 'Regulatory standards and audit frameworks', key: 'standards', tag: 'Policy' },
  { n: '08', title: 'Moral responsibility in deployed AI systems', key: 'responsibility', tag: 'Ethics' },
  { n: '09', title: 'Human-AI collaborative fact-checking pipelines', key: 'collaboration', tag: 'Human-AI' },
  { n: '10', title: 'Benchmark construction and red-teaming methodology', key: 'benchmark', tag: 'Benchmarks' },
]

export default function Home() {
  return (
    <>
      <Chrome />
      <Cursor />
      <DotNav links={DOT_NAV} />

      <div className="deck">
        {/* 01 — Hero */}
        <Frame
          id="hero"
          caption="HAIM · Symposium 2026"
          screenLabel="01 / 07"
        >
          <div style={{ textAlign: 'center', maxWidth: '900px' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>
              A working symposium · NSF Supported
            </p>
            <h1
              className="giga glitch"
              data-text="Hallucinations."
              style={{ marginBottom: '32px' }}
            >
              Hallu<em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>cina</em>—<br />
              tions<em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>.</em>
            </h1>
            <div className="sub" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
              the model said something{' '}
              <Flicker words={['untrue', 'invented', 'wrong', 'fabricated', 'confabulated']} interval={2800} />
              &nbsp;·&nbsp; we&apos;ll spend{' '}
              <Flicker words={['1.5 days', '36 hours', 'a Friday & Saturday']} interval={3400} />
              &nbsp;·&nbsp; figuring out{' '}
              <Flicker words={['why', 'how', 'when', 'what to do']} interval={4000} />
            </div>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '48px' }}>
              <Link href="/apply" className="btn btn--primary">Apply now</Link>
              <Link href="/symposium" className="btn btn--ghost">Learn more</Link>
            </div>
          </div>
        </Frame>

        {/* 02 — Noun */}
        <Frame
          id="noun"
          caption="NOUN — contested · 9 candidates · 1 room"
          screenLabel="02 / 07"
        >
          <div style={{ textAlign: 'center' }}>
            <p className="sub" style={{ marginBottom: '28px' }}>— what the model does, when it has no idea</p>
            <h2 className="giga">
              <Flicker
                words={['Hallucination', 'Confabulation', 'Fabrication', 'Mirage', 'Phantasm', 'Delusion', 'Drift', 'Counterfeit']}
                interval={2400}
                as="span"
              />
              <em>.</em>
            </h2>
            <p className="sub" style={{ marginTop: '36px', maxWidth: '60ch', lineHeight: '1.7' }}>
              We do not yet have one word. Day one of HAIM is, in part, an argument.
            </p>
          </div>
        </Frame>

        {/* 03 — Cohort */}
        <Frame
          id="cohort"
          caption="The cohort"
          screenLabel="03 / 07"
        >
          <div style={{ textAlign: 'center', maxWidth: '700px' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>Selected attendees</p>
            <div className="giga" style={{ marginBottom: '24px', color: 'var(--accent)' }}>
              <Flicker words={['50', '25+25', 'fifty']} interval={3800} as="span" />
            </div>
            <p className="macro" style={{ marginBottom: '24px', color: 'var(--text-dim)' }}>
              25 students · 25 professionals
            </p>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--text-faint)',
                lineHeight: '1.8',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              Half early-career researchers and students. Half industry practitioners and academics.
              Selected through an open application with lightning talk requirement for students.
            </p>
          </div>
        </Frame>

        {/* 04 — Time */}
        <Frame
          id="time"
          caption="The schedule"
          screenLabel="04 / 07"
        >
          <div style={{ textAlign: 'center', maxWidth: '700px' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>Mark your calendar</p>
            <div className="giga" style={{ marginBottom: '32px' }}>
              <Flicker words={['1.5 days', '36 hours', 'Nov 06—07']} interval={3000} as="span" />
            </div>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                color: 'var(--text-dim)',
                marginBottom: '40px',
              }}
            >
              November 6–7, 2026
            </p>
            <Link href="/program" className="btn btn--ghost">View full program →</Link>
          </div>
        </Frame>

        {/* 05 — Topics */}
        <Frame
          id="topics"
          variant="tall"
          caption="Research tracks"
          screenLabel="05 / 07"
        >
          <div style={{ maxWidth: '780px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>Ten working areas</p>
            <div>
              {TOPICS.map((t) => (
                <div key={t.n} className="lrow">
                  <span className="lrow__n">{t.n}</span>
                  <span className="lrow__t">{t.title}</span>
                  <span className="lrow__c">{t.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 06 — Keynote */}
        <Frame
          id="keynote"
          caption="Featured speaker"
          screenLabel="06 / 07"
        >
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>Keynote</p>
            <div className="mega" style={{ marginBottom: '16px' }}>
              <Flicker
                words={['Yann LeCun', '[TBD]', 'Invited']}
                interval={5000}
                as="span"
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--text-faint)',
                letterSpacing: '0.06em',
              }}
            >
              Chief AI Scientist · Meta AI · NYU
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/people" className="btn btn--ghost">All speakers →</Link>
            </div>
          </div>
        </Frame>

        {/* 07 — CTA */}
        <Frame
          id="apply"
          caption="Applications open"
          screenLabel="07 / 07"
        >
          <div style={{ textAlign: 'center', maxWidth: '640px' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>Join the symposium</p>
            <h2 className="macro" style={{ marginBottom: '24px' }}>
              Come build the report.
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
              The symposium produces a public research report on the state of AI hallucinations.
              Every attendee contributes. Apply before the deadline.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/apply" className="btn btn--primary">Apply now</Link>
              <Link href="/symposium" className="btn btn--ghost">Read more</Link>
            </div>
          </div>
        </Frame>
      </div>
    </>
  )
}
