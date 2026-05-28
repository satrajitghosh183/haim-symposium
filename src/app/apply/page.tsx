'use client'

import { submitApplication } from '@/app/actions'
import { createClient } from '@/lib/supabase/client'
import { isConfigured } from '@/lib/supabase/config'
import SetupRequired from '@/components/SetupRequired'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const TOPICS = [
  'Foundations of hallucination in LLMs',
  'Inference-time confabulation and mitigation',
  'Token-level uncertainty and calibration',
  'Hallucinations as cyberattack vectors',
  'Automated detection of fabrications',
  'Prevention through architectural design',
  'Regulatory standards and audit frameworks',
  'Moral responsibility in deployed AI',
  'Human-AI collaborative fact-checking',
  'Benchmark construction and red-teaming',
]

const schema = z
  .object({
    role: z.enum(['student', 'professional']),
    full_name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email required'),
    institution: z.string().min(2, 'Institution is required'),
    primary_topic: z.string().min(1, 'Please select a topic'),
    pitch: z.string().min(50, 'Pitch must be at least 50 characters'),
    talk_title: z.string().optional(),
    abstract: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === 'student') {
        return (data.talk_title?.length ?? 0) > 2 && (data.abstract?.length ?? 0) > 20
      }
      return true
    },
    {
      message: 'Students must provide a talk title and abstract',
      path: ['talk_title'],
    }
  )

type FormData = z.infer<typeof schema>

export default function ApplyPage() {
  if (!isConfigured) return <SetupRequired page="/apply" />
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'student' },
  })

  const role = watch('role')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/auth/login?next=/apply')
      } else {
        setAuthChecked(true)
      }
    })
  }, [router])

  const onSubmit = (data: FormData) => {
    setServerError('')
    startTransition(async () => {
      const result = await submitApplication(data)
      if (result.error) {
        setServerError(result.error)
      } else {
        setSubmitted(true)
      }
    })
  }

  if (!authChecked) {
    return (
      <div className="auth-wrap">
        <p className="sub">Loading…</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="auth-wrap">
        <div className="auth-box" style={{ maxWidth: '560px' }}>
          <div className="notif notif--success">
            <span>✓</span>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>Application submitted</p>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                We will review your application and respond within 4 weeks. You can track
                your status in your{' '}
                <a href="/dashboard" style={{ color: 'var(--accent)' }}>
                  dashboard
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-wrap" style={{ alignItems: 'flex-start', paddingTop: '100px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          padding: '48px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <div>
          <p className="sub" style={{ marginBottom: '12px' }}>HAIM · 2026</p>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '32px',
              fontStyle: 'italic',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Apply to attend
          </h1>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
            }}
          >
            Nov 06–07 · 2026 · 50 seats
          </p>
        </div>

        {serverError && (
          <div className="notif notif--error">
            <span>⚠</span>
            <span>{serverError}</span>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Role picker */}
          <div className="field-wrap">
            <label>I am applying as</label>
            <div className="role-pick">
              <label>
                <input type="radio" value="student" {...register('role')} />
                Student
              </label>
              <label>
                <input type="radio" value="professional" {...register('role')} />
                Professional
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="field-wrap">
            <label htmlFor="full_name">Full name</label>
            <input
              id="full_name"
              type="text"
              placeholder="Ada Lovelace"
              {...register('full_name')}
            />
            {errors.full_name && (
              <span className="field-error">{errors.full_name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="field-wrap">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@institution.edu"
              {...register('email')}
            />
            {errors.email && (
              <span className="field-error">{errors.email.message}</span>
            )}
          </div>

          {/* Institution */}
          <div className="field-wrap">
            <label htmlFor="institution">Institution / Organization</label>
            <input
              id="institution"
              type="text"
              placeholder="MIT · Stanford · Anthropic…"
              {...register('institution')}
            />
            {errors.institution && (
              <span className="field-error">{errors.institution.message}</span>
            )}
          </div>

          {/* Primary topic */}
          <div className="field-wrap">
            <label htmlFor="primary_topic">Primary research topic</label>
            <select id="primary_topic" {...register('primary_topic')}>
              <option value="">Select a topic…</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.primary_topic && (
              <span className="field-error">{errors.primary_topic.message}</span>
            )}
          </div>

          {/* Pitch */}
          <div className="field-wrap">
            <label htmlFor="pitch">
              Why do you want to attend? (min 50 chars)
            </label>
            <textarea
              id="pitch"
              rows={5}
              placeholder="Describe your background, what you hope to contribute, and what you hope to learn…"
              {...register('pitch')}
            />
            {errors.pitch && (
              <span className="field-error">{errors.pitch.message}</span>
            )}
          </div>

          {/* Student-only fields */}
          {role === 'student' && (
            <>
              <div className="notif notif--info">
                <span>ℹ</span>
                <span>
                  Students must present a 5-minute lightning talk. Please provide a title and
                  abstract below.
                </span>
              </div>

              <div className="field-wrap">
                <label htmlFor="talk_title">Lightning talk title</label>
                <input
                  id="talk_title"
                  type="text"
                  placeholder="Your talk title…"
                  {...register('talk_title')}
                />
                {errors.talk_title && (
                  <span className="field-error">{errors.talk_title.message}</span>
                )}
              </div>

              <div className="field-wrap">
                <label htmlFor="abstract">Talk abstract</label>
                <textarea
                  id="abstract"
                  rows={4}
                  placeholder="Brief abstract of your lightning talk…"
                  {...register('abstract')}
                />
                {errors.abstract && (
                  <span className="field-error">{errors.abstract.message}</span>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn--primary"
            disabled={isPending}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isPending ? 'Submitting…' : 'Submit application →'}
          </button>
        </form>
      </div>
    </div>
  )
}
