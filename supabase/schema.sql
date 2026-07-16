-- MCAT Prep — database schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- It is idempotent: re-running it is safe.

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user, created automatically on signup
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users on delete cascade,
  display_name text,
  target_score int,
  test_date    date,
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "own profile: select" on public.profiles;
create policy "own profile: select" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "own profile: insert" on public.profiles;
create policy "own profile: insert" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "own profile: update" on public.profiles;
create policy "own profile: update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Populate a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- card_reviews: spaced-repetition state, one row per (user, card)
-- ---------------------------------------------------------------------------
create table if not exists public.card_reviews (
  user_id      uuid not null references auth.users on delete cascade,
  card_id      text not null,
  section      text not null,
  -- SM-2 state
  ease         real not null default 2.5,
  interval_days int  not null default 0,
  repetitions  int  not null default 0,
  lapses       int  not null default 0,
  due_at       timestamptz not null default now(),
  last_rating  int,
  reviewed_at  timestamptz not null default now(),
  primary key (user_id, card_id)
);

alter table public.card_reviews enable row level security;

drop policy if exists "own reviews: all" on public.card_reviews;
create policy "own reviews: all" on public.card_reviews
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists card_reviews_due_idx
  on public.card_reviews (user_id, due_at);

-- ---------------------------------------------------------------------------
-- quiz_attempts: one row per completed quiz
-- ---------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  quiz_id        text not null,
  section        text not null,
  score          int  not null,
  total          int  not null,
  duration_secs  int,
  -- question_id -> chosen option index, for review after the fact
  answers        jsonb not null default '{}'::jsonb,
  completed_at   timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

drop policy if exists "own attempts: all" on public.quiz_attempts;
create policy "own attempts: all" on public.quiz_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists quiz_attempts_user_idx
  on public.quiz_attempts (user_id, completed_at desc);

-- ---------------------------------------------------------------------------
-- exam_attempts: one row per completed full diagnostic exam
-- ---------------------------------------------------------------------------
create table if not exists public.exam_attempts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  exam_id        text not null,
  -- question_id -> chosen option index
  answers        jsonb not null default '{}'::jsonb,
  -- [{ section, raw, total, scaled }, ...]
  section_scores jsonb not null default '[]'::jsonb,
  total_scaled   int not null,
  duration_secs  int,
  completed_at   timestamptz not null default now()
);

alter table public.exam_attempts enable row level security;

drop policy if exists "own exam attempts: all" on public.exam_attempts;
create policy "own exam attempts: all" on public.exam_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists exam_attempts_user_idx
  on public.exam_attempts (user_id, completed_at desc);

-- ---------------------------------------------------------------------------
-- study_sessions: lightweight activity log powering the streak counter
-- ---------------------------------------------------------------------------
create table if not exists public.study_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  kind        text not null,
  cards_seen  int not null default 0,
  studied_on  date not null default (now() at time zone 'utc')::date,
  created_at  timestamptz not null default now()
);

-- 'exam' joined 'flashcards' and 'quiz' after the initial release. Replace the
-- constraint rather than assuming its current shape, so re-running is safe on
-- both new and existing databases.
alter table public.study_sessions drop constraint if exists study_sessions_kind_check;
alter table public.study_sessions add constraint study_sessions_kind_check
  check (kind in ('flashcards', 'quiz', 'exam'));

alter table public.study_sessions enable row level security;

drop policy if exists "own sessions: all" on public.study_sessions;
create policy "own sessions: all" on public.study_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists study_sessions_user_idx
  on public.study_sessions (user_id, studied_on desc);
