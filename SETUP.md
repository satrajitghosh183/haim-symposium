# HAIM 2026 — Setup Guide

## Quick start (no database needed)

All public pages work immediately — Home, Symposium, Program, People, Submit form UI.

```bash
npm install
npm run dev
# → http://localhost:3000
```

Auth, applications, the dashboard, and the admin panel require a Supabase project.
Without credentials, those pages show a clear "Setup Required" screen instead of crashing.

---

## Full setup (auth + database)

### 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project (free tier is sufficient)
2. Choose a region close to your users
3. Wait ~2 min for provisioning

### 2 — Get your credentials

In your Supabase dashboard → **Settings → API**

Copy:
- **Project URL** — `https://xxxxxxxxxxxx.supabase.co`
- **anon public key** — long JWT starting with `eyJ…`

### 3 — Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Never commit `.env.local` — it is already in `.gitignore`.

### 4 — Run the database schema

In Supabase dashboard → **SQL Editor** → paste `supabase/schema.sql` → Run.

Tables created:
- `profiles` — auto-created on signup; stores name, email, role (`student` / `professional` / `organizer`)
- `applications` — symposium applications with status tracking (`pending` / `accepted` / `rejected` / `waitlisted`)
- `lightning_talks` — slot assignments for accepted students (session 1–4, order within session)

Also creates row-level security policies on all tables and a trigger that auto-creates a profile when a user signs up.

### 5 — Restart the dev server

```bash
npm run dev
```

---

## Organizing committee

| Name | Role | Institution | Email |
|---|---|---|---|
| J. Jenny Li | General Chair | Kean University | juli@kean.edu |
| Dov Kruger | General Chair | Rutgers University | dov.kruger@rutgers.edu |
| Katherine August | Program Chair | Stevens Institute / NJIT | kit.august@gmail.com |
| Dunni Adenuga | Program Chair | Kean University | dunni.adenuga@kean.edu |
| Yulia Kumar | Student Chair | Kean University | yuliakumar2017@gmail.com |
| Satrajit Ghosh | Student Chair | — | satrajitghosh183@gmail.com |

## Making someone an organizer

Organizers unlock the `/admin` panel (view all applications, approve/reject, assign lightning slots, CSV export).

In Supabase → **Table Editor** → `profiles` → find the user → set `role` to `organizer`.

Or via SQL:

```sql
update public.profiles
set role = 'organizer'
where email = 'juli@kean.edu';
```

---

## Pages

| Route | Description | Auth required |
|---|---|---|
| `/` | Home — 7 scroll-snap frames with flicker animations | No |
| `/symposium` | About the symposium — objectives, format, topics, output | No |
| `/program` | Nov 6–7 agenda — Day 1 (Introduction) + Day 2 (Working sessions) | No |
| `/people` | Organizing committee with real photos + bios, keynote, invited speakers | No |
| `/apply` | Participant application form (role, pitch, abstract for students) | Yes — Supabase |
| `/submit` | Paper & abstract submission — Full paper / Short paper / Extended abstract | Yes — Supabase |
| `/dashboard` | Applicant dashboard — status, lightning slot, application detail | Yes — Supabase |
| `/admin` | Organizer panel — all applications, approve/reject, assign slots, CSV | Yes — organizer role |
| `/auth/login` | Sign in | — |
| `/auth/signup` | Create account (name, email, password, role) | — |
| `/auth/callback` | Supabase OAuth callback | — |

## Two ways to attend

1. **Apply as a participant** — `/apply`
   - Fill in role (student or professional), institution, primary topic, pitch
   - Students must also submit a talk title and abstract for the lightning circuit
   - Committee reviews applications and sets status via `/admin`

2. **Submit a paper** — `/submit`
   - Three tracks: Full paper (8–12 pp), Short paper (4–6 pp), Extended abstract (1–2 pp)
   - Extended abstracts from students automatically qualify for a lightning talk slot
   - Accepted paper authors are invited to attend

---

## Deploy to Vercel

The repo is already at **https://github.com/satrajitghosh183/haim-symposium**

### 1 — Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → Import `satrajitghosh183/haim-symposium`
2. Framework preset: **Next.js** (auto-detected)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — live at `haim-symposium.vercel.app`

### 2 — Configure Supabase auth redirect URLs

In Supabase → **Authentication → URL Configuration**:

- **Site URL**: `https://haim-symposium.vercel.app`
- **Redirect URLs**: `https://haim-symposium.vercel.app/auth/callback`

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                # Home — 7 scroll-snap frames
│   ├── symposium/page.tsx      # About the symposium
│   ├── program/page.tsx        # Nov 6–7 agenda
│   ├── people/page.tsx         # Committee (real photos) + keynote + speakers
│   ├── apply/page.tsx          # Participant application (Supabase-gated)
│   ├── submit/page.tsx         # Paper & abstract submission (Supabase-gated)
│   ├── dashboard/page.tsx      # Applicant dashboard
│   ├── admin/
│   │   ├── page.tsx            # Organizer panel (role-gated)
│   │   └── AdminTable.tsx      # Interactive table with filter + CSV export
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts   # Supabase email confirmation callback
│   └── actions.ts              # Server Actions: submit, approve, assign slots, sign out
├── components/
│   ├── Chrome.tsx              # Fixed top overlay: brand, nav, stop-hallucinations btn
│   ├── Cursor.tsx              # Custom lagged cursor — zero React re-renders (all DOM refs)
│   ├── DotNav.tsx              # Right-side dot nav with IntersectionObserver
│   ├── Flicker.tsx             # Scramble/cycle text — respects global pause context
│   ├── Frame.tsx               # Full-viewport scroll-snap section wrapper
│   └── SetupRequired.tsx       # Shown on Supabase-dependent pages when not configured
├── lib/
│   ├── flicker-context.tsx     # Global pause/resume context for all Flicker instances
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server Supabase client (awaits cookies())
│       └── config.ts           # isConfigured — guards pages that need Supabase
└── proxy.ts                    # Session refresh + route protection (Next.js 16 proxy)
public/
└── people/                     # Committee headshots (sourced from university faculty pages)
    ├── jenny-li.jpg
    ├── dov-kruger.jpg
    ├── kit-august.jpg
    ├── dunni-adenuga.png
    ├── yulia-kumar.jpg
    └── satrajit-ghosh.jpg
supabase/
└── schema.sql                  # Full DB schema with RLS + auto-profile trigger
scripts/
└── record.mjs                  # Playwright screen recorder → ffmpeg post-processor
```

---

## Environment variables

| Variable | Required for | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Auth + DB pages | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth + DB pages | Supabase anon public key |

Public pages never touch Supabase and work without any environment variables.
