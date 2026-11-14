-- ==============================================================================
-- NASA Space Apps 2026: Space Base Rescue! (Junior Astronaut Mission Trainer)
-- Universal Multi-Device Leaderboard & Clan/Group System Schema
-- ==============================================================================

-- 1. SCORES TABLE
create table if not exists public.scores (
  id uuid default gen_random_uuid() primary key,
  player_id text not null,
  player_name text not null,
  player_tag text not null default '#0000',
  avatar_config jsonb not null default '{}'::jsonb,
  outpost text not null check (outpost in ('moon', 'mars')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  score integer not null check (score >= 0),
  days_survived integer not null check (days_survived >= 1),
  missions_count integer not null default 1 check (missions_count >= 1),
  created_at timestamptz not null default now(),
  -- Enforce strictly ONE cumulative row per player per outpost & difficulty
  constraint uq_player_outpost_diff unique (player_id, outpost, difficulty)
);

-- Indexes for lightning-fast leaderboard queries
create index if not exists idx_scores_score on public.scores (score desc);
create index if not exists idx_scores_outpost on public.scores (outpost);
create index if not exists idx_scores_difficulty on public.scores (difficulty);
create index if not exists idx_scores_player on public.scores (player_id);
create index if not exists idx_scores_created_at on public.scores (created_at desc);
create index if not exists idx_scores_player_outpost_diff on public.scores (player_id, outpost, difficulty);

-- 2. CLANS TABLE
create table if not exists public.clans (
  id uuid default gen_random_uuid() primary key,
  code text not null unique check (length(code) = 6),
  name text not null check (length(trim(name)) >= 2),
  created_by_player_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_clans_code on public.clans (code);
create index if not exists idx_clans_created_by on public.clans (created_by_player_id);

-- 3. CLAN MEMBERS TABLE
create table if not exists public.clan_members (
  id uuid default gen_random_uuid() primary key,
  clan_id uuid not null references public.clans(id) on delete cascade,
  player_id text not null,
  player_name text not null,
  player_tag text not null default '#0000',
  avatar_config jsonb not null default '{}'::jsonb,
  joined_at timestamptz not null default now(),
  -- Strict rule: A player can only join a specific clan once
  constraint uq_clan_player unique (clan_id, player_id)
);

create index if not exists idx_clan_members_clan on public.clan_members (clan_id);
create index if not exists idx_clan_members_player on public.clan_members (player_id);

-- 4. DATABASE FUNCTION & TRIGGER: STRICT 3-CLAN LIMIT PER PLAYER
create or replace function public.check_max_clans_per_player()
returns trigger as $$
begin
  if (select count(*) from public.clan_members where player_id = new.player_id) >= 3 then
    raise exception 'You can join at most 3 clans!';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists enforce_max_clans_trigger on public.clan_members;
create trigger enforce_max_clans_trigger
before insert on public.clan_members
for each row
execute function public.check_max_clans_per_player();

-- 5. ATOMIC RPC FUNCTION: INCREMENT PLAYER SCORE
create or replace function public.increment_player_score(
  p_player_id text,
  p_player_name text,
  p_player_tag text,
  p_avatar_config jsonb,
  p_outpost text,
  p_difficulty text,
  p_earned_score integer,
  p_days_survived integer
)
returns public.scores as $$
declare
  v_result public.scores;
begin
  insert into public.scores (
    player_id,
    player_name,
    player_tag,
    avatar_config,
    outpost,
    difficulty,
    score,
    days_survived,
    missions_count,
    created_at
  )
  values (
    p_player_id,
    p_player_name,
    p_player_tag,
    p_avatar_config,
    p_outpost,
    p_difficulty,
    p_earned_score,
    p_days_survived,
    1,
    now()
  )
  on conflict (player_id, outpost, difficulty)
  do update set
    score = public.scores.score + excluded.score,
    days_survived = public.scores.days_survived + excluded.days_survived,
    missions_count = public.scores.missions_count + 1,
    player_name = excluded.player_name,
    player_tag = excluded.player_tag,
    avatar_config = excluded.avatar_config,
    created_at = now()
  returning * into v_result;

  return v_result;
end;
$$ language plpgsql security definer;

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.scores enable row level security;
alter table public.clans enable row level security;
alter table public.clan_members enable row level security;

-- SCORES POLICIES: Public read + Validated insert, update (upsert) and delete duplicates
drop policy if exists "Allow public read scores" on public.scores;
create policy "Allow public read scores"
  on public.scores for select
  using (true);

drop policy if exists "Allow public insert scores" on public.scores;
create policy "Allow public insert scores"
  on public.scores for insert
  with check (score >= 0 and length(trim(player_name)) > 0);

drop policy if exists "Allow public update scores" on public.scores;
create policy "Allow public update scores"
  on public.scores for update
  using (true)
  with check (score >= 0 and length(trim(player_name)) > 0);

drop policy if exists "Allow public delete duplicate scores" on public.scores;
create policy "Allow public delete duplicate scores"
  on public.scores for delete
  using (true);

-- CLANS POLICIES: Public read + Validated insert
drop policy if exists "Allow public read clans" on public.clans;
create policy "Allow public read clans"
  on public.clans for select
  using (true);

drop policy if exists "Allow public insert clans" on public.clans;
create policy "Allow public insert clans"
  on public.clans for insert
  with check (length(code) = 6 and length(trim(name)) >= 2);

-- CLAN MEMBERS POLICIES: Public read, insert, update (profile sync), and delete (leave clan)
drop policy if exists "Allow public read clan_members" on public.clan_members;
create policy "Allow public read clan_members"
  on public.clan_members for select
  using (true);

drop policy if exists "Allow public insert clan_members" on public.clan_members;
create policy "Allow public insert clan_members"
  on public.clan_members for insert
  with check (length(player_id) > 0 and length(trim(player_name)) > 0);

drop policy if exists "Allow public update clan_members" on public.clan_members;
create policy "Allow public update clan_members"
  on public.clan_members for update
  using (true)
  with check (length(player_id) > 0 and length(trim(player_name)) > 0);

drop policy if exists "Allow public delete clan_members" on public.clan_members;
create policy "Allow public delete clan_members"
  on public.clan_members for delete
  using (true);

-- ==============================================================================
-- CLEANUP & MERGE SQL FOR EXISTING SUPABASE DATABASES:
-- If your Supabase database already contains separate or duplicate rows per game,
-- run this snippet in your Supabase SQL Editor:
-- ==============================================================================
--
-- 1. Ensure missions_count column exists
-- ALTER TABLE public.scores ADD COLUMN IF NOT EXISTS missions_count integer NOT NULL DEFAULT 1;
--
-- 2. Consolidate duplicate rows per (player_id, outpost, difficulty) by summing scores
-- WITH consolidated AS (
--   SELECT 
--     player_id,
--     outpost,
--     difficulty,
--     sum(score) AS total_score,
--     sum(days_survived) AS total_days,
--     count(*) AS total_missions,
--     max(created_at) AS latest_created_at,
--     (array_agg(id ORDER BY created_at DESC))[1] AS keep_id
--   FROM public.scores
--   GROUP BY player_id, outpost, difficulty
--   HAVING count(*) > 1
-- )
-- UPDATE public.scores s
-- SET 
--   score = c.total_score,
--   days_survived = c.total_days,
--   missions_count = c.total_missions,
--   created_at = c.latest_created_at
-- FROM consolidated c
-- WHERE s.id = c.keep_id;
--
-- 3. Delete the older merged duplicate rows
-- DELETE FROM public.scores
-- WHERE id IN (
--   SELECT a.id
--   FROM public.scores a
--   JOIN public.scores b 
--     ON a.player_id = b.player_id 
--    AND a.outpost = b.outpost 
--    AND a.difficulty = b.difficulty 
--    AND a.created_at < b.created_at
-- );
--
-- 4. Enforce the UNIQUE constraint
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_constraint WHERE conname = 'uq_player_outpost_diff'
--   ) THEN
--     ALTER TABLE public.scores ADD CONSTRAINT uq_player_outpost_diff UNIQUE (player_id, outpost, difficulty);
--   END IF;
-- END $$;
--
-- 5. Add Clan Members UPDATE and DELETE RLS Policies (for Profile Sync & Leave Clan)
-- DROP POLICY IF EXISTS "Allow public update clan_members" ON public.clan_members;
-- CREATE POLICY "Allow public update clan_members" ON public.clan_members FOR UPDATE USING (true) WITH CHECK (length(player_id) > 0 AND length(trim(player_name)) > 0);
-- DROP POLICY IF EXISTS "Allow public delete clan_members" ON public.clan_members;
-- CREATE POLICY "Allow public delete clan_members" ON public.clan_members FOR DELETE USING (true);
