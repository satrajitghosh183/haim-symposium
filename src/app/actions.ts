'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ── Submit application ────────────────────────────────
export async function submitApplication(formData: {
  role: 'student' | 'professional'
  full_name: string
  email: string
  institution: string
  primary_topic: string
  pitch: string
  talk_title?: string
  abstract?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'You must be signed in to apply.' }
  }

  // Check for existing application
  const { data: existing } = await supabase
    .from('applications')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    return { error: 'You have already submitted an application.' }
  }

  const { data, error } = await supabase.from('applications').insert({
    user_id: user.id,
    role: formData.role,
    full_name: formData.full_name,
    email: formData.email,
    institution: formData.institution,
    primary_topic: formData.primary_topic,
    pitch: formData.pitch,
    talk_title: formData.talk_title ?? null,
    abstract: formData.abstract ?? null,
    status: 'pending',
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { data }
}

// ── Update application status (organizer) ────────────
export async function updateApplicationStatus(
  id: string,
  status: 'pending' | 'accepted' | 'rejected' | 'waitlisted',
  notes?: string
) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'Not authenticated.' }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.role !== 'organizer') {
    return { error: 'Insufficient permissions.' }
  }

  const { data, error } = await supabase
    .from('applications')
    .update({
      status,
      organizer_notes: notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { data }
}

// ── Assign lightning talk slot (organizer) ────────────
export async function assignLightningSlot(
  applicationId: string,
  sessionNumber: number,
  order: number
) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'Not authenticated.' }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.role !== 'organizer') {
    return { error: 'Insufficient permissions.' }
  }

  // Get the application to pull title/abstract
  const { data: app, error: appError } = await supabase
    .from('applications')
    .select('talk_title, abstract, role')
    .eq('id', applicationId)
    .single()

  if (appError || !app) {
    return { error: 'Application not found.' }
  }

  if (app.role !== 'student') {
    return { error: 'Lightning slots are only for student applicants.' }
  }

  const { data, error } = await supabase
    .from('lightning_talks')
    .upsert({
      application_id: applicationId,
      session_number: sessionNumber,
      slot_order: order,
      title: app.talk_title ?? 'Untitled',
      abstract: app.abstract ?? null,
    })
    .select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/dashboard')
  return { data }
}

// ── Sign out ──────────────────────────────────────────
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
