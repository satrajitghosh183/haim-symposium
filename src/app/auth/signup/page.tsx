'use client'

import { createClient } from '@/lib/supabase/client'
import { isConfigured } from '@/lib/supabase/config'
import SetupRequired from '@/components/SetupRequired'
import Link from 'next/link'
import { useState, useTransition } from 'react'

export default function SignupPage() {
  if (!isConfigured) return <SetupRequired page="/auth/signup" />
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'professional'>('student')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    startTransition(async () => {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role,
          },
        },
      })

      if (authError) {
        setError(authError.message)
      } else {
        setSuccess(true)
      }
    })
  }

  if (success) {
    return (
      <div className="auth-wrap">
        <div className="auth-box">
          <div className="notif notif--success">
            <span>✓</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>Check your email</p>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate
                your account, then{' '}
                <Link href="/auth/login" style={{ color: 'var(--accent)' }}>
                  sign in
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-box__head">
          <h1 className="auth-box__title">Create account</h1>
          <p className="auth-box__sub">HAIM Symposium · Apply as student or professional</p>
        </div>

        {error && (
          <div className="notif notif--error">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <div className="field-wrap">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="field-wrap">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="field-wrap">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="field-wrap">
            <label>I am a</label>
            <div className="role-pick">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="professional"
                  checked={role === 'professional'}
                  onChange={() => setRole('professional')}
                />
                Professional
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={isPending}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isPending ? 'Creating account…' : 'Create account →'}
          </button>
        </form>

        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: 'var(--text-faint)',
            textAlign: 'center',
          }}
        >
          Already have an account?{' '}
          <Link
            href="/auth/login"
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
