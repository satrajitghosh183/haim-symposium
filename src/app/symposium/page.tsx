import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import DotNav from '@/components/DotNav'
import Flicker from '@/components/Flicker'
import Frame from '@/components/Frame'
import Link from 'next/link'

const DOT_NAV = [
  { href: '#s-title', label: 'Overview' },
  { href: '#s-obj', label: 'Objective' },
  { href: '#s-format', label: 'Format' },
  { href: '#s-topics', label: 'Topics' },
  { href: '#s-output', label: 'Output' },
  { href: '#s-next', label: 'Next' },
]

const FORMAT_ROWS = [
  { n: '01', title: 'Invited keynote to frame the problem space', tag: 'Keynote' },
  { n: '02', title: 'Four student lightning talks per session, repeated across four sessions', tag: 'Lightning' },
  { n: '03', title: 'Three parallel working groups, rotating membership', tag: 'Working Groups' },
  { n: '04', title: 'Joint synthesis session to draft the final report', tag: 'Synthesis' },
]

const TOPIC_ROWS = [
  { n: '01', title: 'Foundations of hallucination in large language models', tag: 'LLM' },
  { n: '02', title: 'Inference-time confabulation and mitigation strategies', tag: 'Inference' },
  { n: '03', title: 'Token-level uncertainty and calibration', tag: 'Calibration' },
  { n: '04', title: 'Hallucinations as cyberattack vectors', tag: 'Security' },
  { n: '05', title: 'Automated detection of model fabrications', tag: 'Eval' },
  { n: '06', title: 'Prevention through architectural design', tag: 'Architecture' },
  { n: '07', title: 'Regulatory standards and audit frameworks', tag: 'Policy' },
  { n: '08', title: 'Moral responsibility in deployed AI systems', tag: 'Ethics' },
  { n: '09', title: 'Human-AI collaborative fact-checking pipelines', tag: 'Human-AI' },
  { n: '10', title: 'Benchmark construction and red-teaming methodology', tag: 'Benchmarks' },
]

export default function SymposiumPage() {
  return (
    <>
      <Chrome />
      <Cursor />
      <DotNav links={DOT_NAV} />

      <div className="deck">
        {/* 01 — Title */}
        <Frame
          id="s-title"
         
        >
          <div style={{ maxWidth: '800px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>HAIM · 2026</p>
            <h1 className="mega" style={{ marginBottom: '32px' }}>
              A working room<br />of{' '}
              <Flicker words={['fifty', '50', 'half a hundred']} interval={3500} as="span" />.
            </h1>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '16px',
                color: 'var(--text-dim)',
                maxWidth: '560px',
                lineHeight: '1.7',
              }}
            >
              HAIM is not a conference. It is a structured working meeting. Fifty people,
              two days, one output — a practitioner-facing report on the state of hallucination
              in AI systems.
            </p>
          </div>
        </Frame>

        {/* 02 — Objective */}
        <Frame
          id="s-obj"
         
        >
          <div style={{ maxWidth: '780px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>The objective</p>
            <h2 className="macro" style={{ marginBottom: '32px' }}>
              Map the problem.<br />Name the gaps.
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                marginTop: '24px',
              }}
            >
              {[
                {
                  label: 'Research',
                  body: 'Surface the latest findings on hallucination across model families, modalities, and deployment contexts.',
                },
                {
                  label: 'Practice',
                  body: 'Translate research insights into actionable guidance for teams deploying AI systems today.',
                },
                {
                  label: 'Policy',
                  body: 'Identify where regulation, standards, and liability frameworks need to catch up to the technology.',
                },
                {
                  label: 'Community',
                  body: 'Build lasting connections between early-career researchers and experienced practitioners.',
                },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: '8px',
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '14px',
                      color: 'var(--text-dim)',
                      lineHeight: '1.6',
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 03 — Format */}
        <Frame
          id="s-format"
         
        >
          <div style={{ maxWidth: '780px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>Format</p>
            <div>
              {FORMAT_ROWS.map((r) => (
                <div key={r.n} className="lrow">
                  <span className="lrow__n">{r.n}</span>
                  <span className="lrow__title">{r.title}</span>
                  <span className="lrow__tag">{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 04 — Topics */}
        <Frame
          id="s-topics"
          variant="tall"
         
        >
          <div style={{ maxWidth: '780px', width: '100%' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>Ten research tracks</p>
            <div>
              {TOPIC_ROWS.map((r) => (
                <div key={r.n} className="lrow">
                  <span className="lrow__n">{r.n}</span>
                  <span className="lrow__title">{r.title}</span>
                  <span className="lrow__tag">{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 05 — Output */}
        <Frame
          id="s-output"
         
        >
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>The deliverable</p>
            <h2 className="macro" style={{ marginBottom: '32px' }}>
              A public report.<br />Open access. Citable.
            </h2>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                color: 'var(--text-dim)',
                lineHeight: '1.7',
                maxWidth: '520px',
                margin: '0 auto 32px',
              }}
            >
              Every attendee co-authors the report. It covers definitions, taxonomy, current state
              of detection and mitigation, open problems, and policy recommendations. Published
              open-access within 90 days of the symposium.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '32px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Pages', value: '~40' },
                { label: 'Authors', value: '50' },
                { label: 'License', value: 'CC-BY' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <p className="macro" style={{ color: 'var(--accent)' }}>{s.value}</p>
                  <p className="sub">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* 06 — Next */}
        <Frame
          id="s-next"
         
        >
          <div style={{ maxWidth: '640px', textAlign: 'center' }}>
            <p className="sub" style={{ marginBottom: '32px' }}>What next</p>
            <h2 className="macro" style={{ marginBottom: '40px' }}>
              Ready to participate?
            </h2>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link href="/program" className="btn btn--ghost">View program</Link>
              <Link href="/people" className="btn btn--ghost">Meet the people</Link>
              <Link href="/apply" className="btn btn--primary">Apply now</Link>
            </div>
          </div>
        </Frame>
      </div>
    </>
  )
}
