'use client'

import { createClient } from '@/lib/supabase/client'
import { isConfigured } from '@/lib/supabase/config'
import SetupRequired from '@/components/SetupRequired'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function LoginPage() {
  if (!isConfigured) return <SetupRequired page="/auth/login" />
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    startTransition(async () => {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    })
  }

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-box__head">
          <h1 className="auth-box__title">Sign in</h1>
          <p className="auth-box__sub">HAIM Symposium · Attendee Portal</p>
        </div>

        {error && (
          <div className="notif notif--error">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={isPending}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isPending ? 'Signing in…' : 'Sign in →'}
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
          No account?{' '}
          <Link
            href="/auth/signup"
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
