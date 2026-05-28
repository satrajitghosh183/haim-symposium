'use client'

import { assignLightningSlot, updateApplicationStatus } from '@/app/actions'
import { useState, useTransition } from 'react'

type Application = {
  id: string
  full_name: string
  email: string
  role: string
  institution: string
  primary_topic: string
  pitch: string
  talk_title?: string | null
  abstract?: string | null
  status: string
  created_at: string
  organizer_notes?: string | null
}

interface AdminTableProps {
  initialApplications: Application[]
}

export default function AdminTable({ initialApplications }: AdminTableProps) {
  const [applications, setApplications] = useState(initialApplications)
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState('')
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const [slotSession, setSlotSession] = useState(1)
  const [slotOrder, setSlotOrder] = useState(1)

  const filtered = applications.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter
    const matchesSearch =
      !search ||
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.institution.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleStatus = (id: string, status: 'pending' | 'accepted' | 'rejected' | 'waitlisted') => {
    setActionError('')
    startTransition(async () => {
      const result = await updateApplicationStatus(id, status)
      if (result.error) {
        setActionError(result.error)
      } else {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        )
      }
    })
  }

  const handleAssignSlot = (id: string) => {
    setActionError('')
    startTransition(async () => {
      const result = await assignLightningSlot(id, slotSession, slotOrder)
      if (result.error) {
        setActionError(result.error)
      } else {
        setAssigningId(null)
      }
    })
  }

  const handleDownloadCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Institution', 'Topic', 'Status', 'Applied']
    const rows = applications.map((a) => [
      a.full_name,
      a.email,
      a.role,
      a.institution,
      a.primary_topic,
      a.status,
      new Date(a.created_at).toLocaleDateString(),
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'haim-applications.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const counts = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
    waitlisted: applications.filter((a) => a.status === 'waitlisted').length,
  }

  return (
    <div>
      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        {[
          { label: 'Total', value: counts.total, cls: '' },
          { label: 'Pending', value: counts.pending, cls: 'badge--pending' },
          { label: 'Accepted', value: counts.accepted, cls: 'badge--accepted' },
          { label: 'Rejected', value: counts.rejected, cls: 'badge--rejected' },
          { label: 'Waitlisted', value: counts.waitlisted, cls: 'badge--waitlisted' },
        ].map((s) => (
          <div key={s.label} className="dash-card">
            <span className="dash-card__label">{s.label}</span>
            <span className="dash-card__value">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Error */}
      {actionError && (
        <div className="notif notif--error" style={{ marginBottom: '24px' }}>
          <span>⚠</span>
          <span>{actionError}</span>
        </div>
      )}

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          type="search"
          placeholder="Search name, email, institution…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            color: 'var(--text)',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            padding: '8px 14px',
            outline: 'none',
            flex: '1',
            minWidth: '240px',
          }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['all', 'pending', 'accepted', 'rejected', 'waitlisted'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn${filter === f ? ' btn--primary' : ' btn--ghost'}`}
              style={{ padding: '6px 14px', fontSize: '10px' }}
            >
              {f}
            </button>
          ))}
        </div>
        <button onClick={handleDownloadCSV} className="btn btn--ghost">
          ↓ CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Institution</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: 'center', padding: '40px', color: 'var(--text-faint)' }}
                >
                  No applications match your filters.
                </td>
              </tr>
            )}
            {filtered.map((app) => (
              <>
                <tr key={app.id}>
                  <td>
                    <div>
                      <span style={{ color: 'var(--text)' }}>{app.full_name}</span>
                      <br />
                      <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{app.email}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        borderColor: app.role === 'student' ? 'var(--cyan)' : 'var(--text-faint)',
                        color: app.role === 'student' ? 'var(--cyan)' : 'var(--text-faint)',
                      }}
                    >
                      {app.role}
                    </span>
                  </td>
                  <td>{app.institution}</td>
                  <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {app.primary_topic}
                  </td>
                  <td>
                    <span
                      className={`badge badge--${app.status}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {app.status !== 'accepted' && (
                        <button
                          onClick={() => handleStatus(app.id, 'accepted')}
                          disabled={isPending}
                          className="btn"
                          style={{ padding: '4px 10px', fontSize: '9px', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                        >
                          Accept
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatus(app.id, 'rejected')}
                          disabled={isPending}
                          className="btn btn--danger"
                          style={{ padding: '4px 10px', fontSize: '9px' }}
                        >
                          Reject
                        </button>
                      )}
                      {app.status !== 'waitlisted' && (
                        <button
                          onClick={() => handleStatus(app.id, 'waitlisted')}
                          disabled={isPending}
                          className="btn"
                          style={{ padding: '4px 10px', fontSize: '9px', borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
                        >
                          Wait
                        </button>
                      )}
                      {app.status === 'accepted' && app.role === 'student' && (
                        <button
                          onClick={() => setAssigningId(assigningId === app.id ? null : app.id)}
                          className="btn"
                          style={{ padding: '4px 10px', fontSize: '9px' }}
                        >
                          Slot
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {assigningId === app.id && (
                  <tr key={`${app.id}-assign`}>
                    <td
                      colSpan={7}
                      style={{ background: 'var(--bg-2)', padding: '16px 24px' }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-faint)' }}>
                          Assign lightning slot for {app.full_name}:
                        </span>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <label style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-faint)' }}>
                            Session
                          </label>
                          <select
                            value={slotSession}
                            onChange={(e) => setSlotSession(Number(e.target.value))}
                            style={{
                              background: 'var(--surface)',
                              border: '1px solid var(--line)',
                              color: 'var(--text)',
                              fontFamily: 'var(--mono)',
                              fontSize: '11px',
                              padding: '4px 8px',
                            }}
                          >
                            {[1, 2, 3, 4].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <label style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-faint)' }}>
                            Slot
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={slotOrder}
                            onChange={(e) => setSlotOrder(Number(e.target.value))}
                            style={{
                              width: '60px',
                              background: 'var(--surface)',
                              border: '1px solid var(--line)',
                              color: 'var(--text)',
                              fontFamily: 'var(--mono)',
                              fontSize: '11px',
                              padding: '4px 8px',
                            }}
                          />
                        </div>
                        <button
                          onClick={() => handleAssignSlot(app.id)}
                          disabled={isPending}
                          className="btn btn--primary"
                          style={{ padding: '4px 14px', fontSize: '10px' }}
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => setAssigningId(null)}
                          className="btn btn--ghost"
                          style={{ padding: '4px 10px', fontSize: '10px' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
