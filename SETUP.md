# HAIM 2026 — Setup Guide

## Local development (no database)

The public pages — Home, Symposium, Program, People — work immediately with no setup.

```bash
npm install
npm run dev
# → http://localhost:3000
```

Auth, applications, the dashboard, and the admin panel require a Supabase project.

---

## Full setup (auth + database)

### 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project (free tier is sufficient)
2. Choose a region close to your users
3. Wait ~2 min for provisioning

### 2 — Get your credentials

In your Supabase dashboard:

**Settings → API**

Copy:
- **Project URL** — looks like `https://xxxxxxxxxxxx.supabase.co`
- **anon public key** — long JWT starting with `eyJ…`

### 3 — Create `.env.local`

In the project root, create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Never commit `.env.local`. It is already in `.gitignore`.

### 4 — Run the database schema

In Supabase dashboard → **SQL Editor** → paste the contents of `supabase/schema.sql` → Run.

This creates:
- `profiles` — auto-created for every new signup, stores name, role (student / professional / organizer)
- `applications` — symposium applications with status tracking
- `lightning_talks` — slot assignments for accepted students
- Row-level security policies on all tables
- A trigger that auto-creates a profile when a user signs up

### 5 — Restart the dev server

```bash
npm run dev
```

The app will now fully work including login, signup, apply, dashboard, and admin.

---

## Making someone an organizer

Organizers get access to the `/admin` panel. To promote a user:

In Supabase → **Table Editor** → `profiles` → find the user → set `role` to `organizer`.

Or run in the SQL editor:

```sql
update public.profiles
set role = 'organizer'
where email = 'jenny@example.com';
```

---

## Deploy to Vercel

### 1 — Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/haim-symposium.git
git push -u origin main
```

### 2 — Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → Import the GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

Your site goes live at `haim-symposium.vercel.app` (or a custom domain if you add one).

### 3 — Configure Supabase auth redirect URLs

In Supabase → **Authentication → URL Configuration**:

- **Site URL**: `https://haim-symposium.vercel.app`
- **Redirect URLs**: add `https://haim-symposium.vercel.app/auth/callback`

---

## Project structure

```
src/
├── app/
│   ├── page.tsx               # Home (7 frames)
│   ├── symposium/page.tsx     # About the symposium
│   ├── program/page.tsx       # Nov 6–7 agenda
│   ├── people/page.tsx        # Committee + speakers
│   ├── apply/page.tsx         # Application form (auth required)
│   ├── dashboard/page.tsx     # Applicant dashboard
│   ├── admin/page.tsx         # Organizer panel
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts  # Supabase OAuth callback
│   └── actions.ts             # Server Actions (submit, approve, assign slots)
├── components/
│   ├── Chrome.tsx             # Fixed corner overlay + nav
│   ├── Cursor.tsx             # Custom lagged cursor
│   ├── DotNav.tsx             # Right-side dot nav
│   ├── Flicker.tsx            # Scramble text animation
│   ├── Frame.tsx              # Full-viewport scroll-snap section
│   └── SetupRequired.tsx      # Shown when Supabase is not configured
├── lib/supabase/
│   ├── client.ts              # Browser Supabase client
│   ├── server.ts              # Server Supabase client (awaits cookies)
│   └── config.ts              # isConfigured helper
└── proxy.ts                   # Auth session refresh + route protection
supabase/
└── schema.sql                 # Full DB schema with RLS policies
```

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | For auth/DB features | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth/DB features | Supabase anon public key |

The site runs without these — only the auth, apply, dashboard, and admin pages require them.
