import Link from 'next/link'

export default function SetupRequired({ page }: { page: string }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--pad)',
        fontFamily: 'var(--mono)',
      }}
    >
      <div style={{ maxWidth: '640px', width: '100%' }}>
        <p
          className="sub"
          style={{ marginBottom: '24px', color: 'var(--accent)' }}
        >
          — setup required
        </p>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            lineHeight: 0.9,
            letterSpacing: '-0.025em',
            marginBottom: '32px',
          }}
        >
          Supabase not<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>configured</em>.
        </h1>

        <div
          style={{
            borderLeft: '2px solid var(--accent)',
            paddingLeft: '20px',
            marginBottom: '40px',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '8px' }}>
            The <code style={{ color: 'var(--accent)' }}>{page}</code> page requires a Supabase
            project. Create a <code style={{ color: 'var(--text)' }}>.env.local</code> file in
            the project root with your credentials:
          </p>
          <pre
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-soft)',
              padding: '16px 20px',
              fontSize: '12px',
              color: 'var(--text)',
              lineHeight: 1.8,
              overflowX: 'auto',
              marginTop: '12px',
            }}
          >
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...`}
          </pre>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
          {[
            { n: '01', text: 'Go to supabase.com → New project (free tier)' },
            { n: '02', text: 'Settings → API → copy Project URL + anon public key' },
            { n: '03', text: 'Paste into .env.local and restart the dev server' },
            { n: '04', text: 'Run supabase/schema.sql in the Supabase SQL editor' },
          ].map((s) => (
            <div
              key={s.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '12px',
                alignItems: 'start',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--line-soft)',
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.18em' }}>{s.n}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.6 }}>{s.text}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn--ghost">
            ← Back to site
          </Link>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary"
          >
            Open Supabase →
          </a>
        </div>
      </div>
    </div>
  )
}
