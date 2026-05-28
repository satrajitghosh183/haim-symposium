import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import SetupRequired from '@/components/SetupRequired'
import { isConfigured } from '@/lib/supabase/config'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminTable from './AdminTable'

export default async function AdminPage() {
  if (!isConfigured) return <SetupRequired page="/admin" />

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Verify organizer role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'organizer') {
    redirect('/')
  }

  // Fetch all applications
  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div style={{ padding: 'var(--pad)', paddingTop: '100px' }}>
        <p style={{ color: 'var(--error)', fontFamily: 'var(--mono)', fontSize: '12px' }}>
          Error loading applications: {error.message}
        </p>
      </div>
    )
  }

  return (
    <>
      <Chrome />
      <Cursor />

      <div
        style={{
          minHeight: '100vh',
          padding: 'var(--pad)',
          paddingTop: 'calc(var(--pad) + 80px)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p className="sub" style={{ marginBottom: '12px' }}>Admin · Organizer view</p>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '36px',
              fontStyle: 'italic',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Applications
          </h1>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-faint)' }}>
            Signed in as {profile.full_name ?? user.email} · Organizer
          </p>
        </div>

        <AdminTable initialApplications={applications ?? []} />
      </div>
    </>
  )
}
