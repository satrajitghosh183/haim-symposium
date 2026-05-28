import { signOut } from '@/app/actions'
import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import SetupRequired from '@/components/SetupRequired'
import { isConfigured } from '@/lib/supabase/config'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  if (!isConfigured) return <SetupRequired page="/dashboard" />

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch application
  const { data: application } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  // Fetch lightning slot if application exists and is a student
  let lightningTalk = null
  if (application?.id && application.role === 'student') {
    const { data: lt } = await supabase
      .from('lightning_talks')
      .select('*')
      .eq('application_id', application.id)
      .maybeSingle()
    lightningTalk = lt
  }

  const statusBadgeClass =
    application?.status === 'accepted'
      ? 'badge badge--accepted'
      : application?.status === 'rejected'
      ? 'badge badge--rejected'
      : application?.status === 'waitlisted'
      ? 'badge badge--waitlisted'
      : 'badge badge--pending'

  return (
    <>
      <Chrome />
      <Cursor />

      <div
        style={{
          minHeight: '100vh',
          padding: 'var(--pad)',
          paddingTop: 'calc(var(--pad) + 80px)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p className="sub" style={{ marginBottom: '12px' }}>Dashboard</p>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '36px',
              fontStyle: 'italic',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            {profile?.full_name ?? user.email}
          </h1>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-faint)' }}>
            {user.email} · Role: {profile?.role ?? '—'}
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div className="dash-card">
            <span className="dash-card__label">Application</span>
            <span className="dash-card__value" style={{ fontSize: '28px' }}>
              {application ? (
                <span className={statusBadgeClass}>{application.status}</span>
              ) : (
                <span style={{ color: 'var(--text-faint)' }}>—</span>
              )}
            </span>
            <span className="dash-card__sub">
              {application ? `Submitted ${new Date(application.created_at).toLocaleDateString()}` : 'Not yet applied'}
            </span>
          </div>

          <div className="dash-card">
            <span className="dash-card__label">Attending as</span>
            <span className="dash-card__value" style={{ fontSize: '28px' }}>
              {application?.role ?? profile?.role ?? '—'}
            </span>
            <span className="dash-card__sub">Symposium participant type</span>
          </div>

          <div className="dash-card">
            <span className="dash-card__label">Lightning slot</span>
            <span className="dash-card__value" style={{ fontSize: '28px' }}>
              {lightningTalk ? `S${lightningTalk.session_number}·${lightningTalk.slot_order}` : '—'}
            </span>
            <span className="dash-card__sub">
              {lightningTalk ? `Session ${lightningTalk.session_number}, slot ${lightningTalk.slot_order}` : 'Not yet assigned'}
            </span>
          </div>

          <div className="dash-card">
            <span className="dash-card__label">Institution</span>
            <span
              className="dash-card__value"
              style={{ fontSize: '14px', paddingTop: '8px', color: 'var(--text-dim)' }}
            >
              {application?.institution ?? profile?.institution ?? '—'}
            </span>
            <span className="dash-card__sub">Affiliated organization</span>
          </div>
        </div>

        {/* Application detail */}
        {!application ? (
          <div
            style={{
              padding: '40px',
              background: 'var(--surface)',
              border: '1px solid var(--line-soft)',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '24px',
                fontStyle: 'italic',
                color: 'var(--text-dim)',
                marginBottom: '24px',
              }}
            >
              You haven&apos;t applied yet.
            </p>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--text-faint)',
                marginBottom: '32px',
              }}
            >
              Applications for HAIM 2026 are open. Fifty seats available — 25 students, 25 professionals.
            </p>
            <Link href="/apply" className="btn btn--primary">
              Apply now →
            </Link>
          </div>
        ) : (
          <div
            style={{
              padding: '32px',
              background: 'var(--surface)',
              border: '1px solid var(--line-soft)',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <p className="sub" style={{ marginBottom: '8px' }}>Your application</p>
                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '22px',
                    fontStyle: 'italic',
                    color: 'var(--text)',
                  }}
                >
                  {application.full_name}
                </h2>
              </div>
              <span className={statusBadgeClass}>{application.status}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Role', value: application.role },
                { label: 'Institution', value: application.institution },
                { label: 'Topic', value: application.primary_topic },
                { label: 'Applied', value: new Date(application.created_at).toLocaleDateString() },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-faint)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--text-dim)' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-faint)',
                  marginBottom: '8px',
                }}
              >
                Pitch
              </p>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '13px',
                  color: 'var(--text-dim)',
                  lineHeight: '1.6',
                  background: 'var(--bg-2)',
                  padding: '16px',
                  border: '1px solid var(--line-soft)',
                }}
              >
                {application.pitch}
              </p>
            </div>

            {application.role === 'student' && application.talk_title && (
              <div style={{ marginTop: '24px' }}>
                <p
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '8px',
                  }}
                >
                  Lightning talk
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--text)', marginBottom: '8px' }}>
                  {application.talk_title}
                </p>
                {application.abstract && (
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                    {application.abstract}
                  </p>
                )}
                {lightningTalk && (
                  <div
                    style={{ marginTop: '16px', padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--accent)' }}
                  >
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--accent)' }}>
                      Assigned: Session {lightningTalk.session_number} · Slot {lightningTalk.slot_order}
                    </p>
                  </div>
                )}
              </div>
            )}

            {application.organizer_notes && (
              <div style={{ marginTop: '24px' }}>
                <p
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-faint)',
                    marginBottom: '8px',
                  }}
                >
                  Organizer notes
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                  {application.organizer_notes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sign out */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <form action={signOut}>
            <button type="submit" className="btn btn--ghost">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
