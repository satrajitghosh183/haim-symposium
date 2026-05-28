'use client'

import Chrome from '@/components/Chrome'
import Cursor from '@/components/Cursor'
import SetupRequired from '@/components/SetupRequired'
import { isConfigured } from '@/lib/supabase/config'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  authors: z.string().min(3, 'List at least one author'),
  abstract: z.string().min(150, 'Abstract must be at least 150 characters'),
  track: z.enum(['full', 'short', 'lightning']),
  email: z.string().email('Valid email required'),
  institution: z.string().min(2, 'Institution required'),
  keywords: z.string().min(3, 'Add at least one keyword'),
})

type FormData = z.infer<typeof schema>

const TRACKS = [
  {
    id: 'full',
    label: 'Full paper',
    pages: '8–12 pages',
    desc: 'Original research on hallucination causes, detection, mitigation, or evaluation.',
  },
  {
    id: 'short',
    label: 'Short paper',
    pages: '4–6 pages',
    desc: 'Position papers, negative results, or early-stage work with clear research direction.',
  },
  {
    id: 'lightning',
    label: 'Extended abstract',
    pages: '1–2 pages',
    desc: 'Student lightning talk submissions. Accepted abstracts get a 4-minute slot across shared meals.',
  },
]

export default function SubmitPage() {
  if (!isConfigured) return <SetupRequired page="/submit" />

  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { track: 'full' },
  })

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      // TODO: wire to Supabase submissions table
      console.log('Paper submission:', data)
      setSubmitted(true)
    })
  }

  if (submitted) {
    return (
      <>
        <Chrome />
        <Cursor />
        <div className="auth-wrap">
          <div className="auth-box" style={{ textAlign: 'center' }}>
            <h1 className="auth-box__title" style={{ marginBottom: '16px' }}>
              <em>Submitted.</em>
            </h1>
            <p className="sub" style={{ marginBottom: '32px' }}>
              We&apos;ll be in touch within two weeks.
            </p>
            <Link href="/" className="btn btn--ghost">← Back to home</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Chrome />
      <Cursor />

      <div style={{ minHeight: '100vh', padding: 'var(--pad)', paddingTop: 'calc(var(--pad) + 80px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '56px' }}>
            <p className="sub" style={{ marginBottom: '16px' }}>
              <em>—</em> paper &amp; abstract submission
            </p>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6vw,80px)', lineHeight: 0.9, letterSpacing: '-0.025em', marginBottom: '24px' }}>
              Submit your<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>work.</em>
            </h1>
            <p className="sub" style={{ lineHeight: 1.7, maxWidth: '56ch' }}>
              Two ways to attend HAIM 2026: apply as a participant, or submit a paper.
              Accepted papers earn a presentation slot; student extended abstracts get a lightning talk.
            </p>
          </div>

          {/* Track cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '48px' }}>
            {TRACKS.map((t) => (
              <label
                key={t.id}
                style={{
                  border: `1px solid ${watch('track') === t.id ? 'var(--accent)' : 'var(--line-soft)'}`,
                  padding: '20px',
                  cursor: 'none',
                  background: watch('track') === t.id ? 'color-mix(in oklab, var(--accent) 6%, transparent)' : 'transparent',
                  transition: 'all .2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <input type="radio" value={t.id} {...register('track')} style={{ display: 'none' }} />
                <span style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: watch('track') === t.id ? 'var(--accent)' : 'var(--text)' }}>
                  {t.label}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                  {t.pages}
                </span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  {t.desc}
                </span>
              </label>
            ))}
          </div>

          {/* Form */}
          <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <div className="field-wrap">
              <label>Paper title</label>
              <input placeholder="The full title of your submission" {...register('title')} />
              {errors.title && <span className="field-error">{errors.title.message}</span>}
            </div>

            <div className="row">
              <div className="field-wrap">
                <label>Authors</label>
                <input placeholder="Author 1, Author 2, …" {...register('authors')} />
                {errors.authors && <span className="field-error">{errors.authors.message}</span>}
              </div>
              <div className="field-wrap">
                <label>Corresponding email</label>
                <input type="email" placeholder="you@institution.edu" {...register('email')} />
                {errors.email && <span className="field-error">{errors.email.message}</span>}
              </div>
            </div>

            <div className="row">
              <div className="field-wrap">
                <label>Institution</label>
                <input placeholder="University or organisation" {...register('institution')} />
                {errors.institution && <span className="field-error">{errors.institution.message}</span>}
              </div>
              <div className="field-wrap">
                <label>Keywords</label>
                <input placeholder="hallucination, detection, LLMs, …" {...register('keywords')} />
                {errors.keywords && <span className="field-error">{errors.keywords.message}</span>}
              </div>
            </div>

            <div className="field-wrap">
              <label>Abstract</label>
              <textarea rows={7} placeholder="Minimum 150 characters. Full papers may use this field for the abstract; extended abstracts should include their complete text here." {...register('abstract')} />
              {errors.abstract && <span className="field-error">{errors.abstract.message}</span>}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={isPending}
                style={{ minWidth: '200px', justifyContent: 'center' }}
              >
                {isPending ? 'Submitting…' : 'Submit paper →'}
              </button>
              <span className="sub">or</span>
              <Link href="/apply" className="btn btn--ghost">Apply as participant instead</Link>
            </div>
          </form>

          {/* Deadlines */}
          <div style={{ marginTop: '64px', borderTop: '1px solid var(--line-soft)', paddingTop: '40px' }}>
            <p className="sub" style={{ marginBottom: '24px' }}>— key dates</p>
            {[
              ['Abstract deadline',    'TBD'],
              ['Full paper deadline',  'TBD'],
              ['Decisions sent',       'TBD'],
              ['Symposium',            'Nov 06 — 07 · 2026'],
            ].map(([label, date]) => (
              <div key={label} className="lrow" style={{ gridTemplateColumns: '1fr auto' }}>
                <span className="lrow__t" style={{ fontSize: 'clamp(16px,1.4vw,22px)' }}>{label}</span>
                <span className="lrow__c" style={{ color: date === 'TBD' ? 'var(--text-faint)' : 'var(--accent)' }}>{date}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
