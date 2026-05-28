-- HAIM Symposium · Supabase Schema
-- Run this in the SQL Editor of your Supabase project

-- ── profiles auto-created on signup ───────────────────
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  role text check (role in ('student', 'professional', 'organizer')) default 'student',
  institution text,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Organizers can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'organizer'
    )
  );

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── applications ───────────────────────────────────────
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('student', 'professional')) not null,
  full_name text not null,
  email text not null,
  institution text not null,
  primary_topic text not null,
  pitch text not null,
  talk_title text,
  abstract text,
  status text check (status in ('pending','accepted','rejected','waitlisted')) default 'pending',
  organizer_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.applications enable row level security;

create policy "Users view own application"
  on public.applications for select
  using (auth.uid() = user_id);

create policy "Users insert own application"
  on public.applications for insert
  with check (auth.uid() = user_id);

create policy "Users update own application"
  on public.applications for update
  using (auth.uid() = user_id);

create policy "Organizers view all applications"
  on public.applications for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'organizer')
  );

create policy "Organizers update all applications"
  on public.applications for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'organizer')
  );


-- ── lightning_talks ───────────────────────────────────
create table if not exists public.lightning_talks (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade not null unique,
  session_number int check (session_number between 1 and 4) not null,
  slot_order int not null,
  title text not null,
  abstract text,
  created_at timestamptz default now()
);

alter table public.lightning_talks enable row level security;

create policy "Anyone can view lightning talks"
  on public.lightning_talks for select
  using (true);

create policy "Organizers manage lightning talks"
  on public.lightning_talks for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'organizer')
  );
