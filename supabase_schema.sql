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
  created_at timestamptz not null default now()
);

-- Indexes for lightning-fast leaderboard queries
create index if not exists idx_scores_score on public.scores (score desc);
create index if not exists idx_scores_outpost on public.scores (outpost);
create index if not exists idx_scores_difficulty on public.scores (difficulty);
create index if not exists idx_scores_player on public.scores (player_id);
create index if not exists idx_scores_created_at on public.scores (created_at desc);

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

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.scores enable row level security;
alter table public.clans enable row level security;
alter table public.clan_members enable row level security;

-- SCORES POLICIES: Public read + Validated insert
drop policy if exists "Allow public read scores" on public.scores;
create policy "Allow public read scores"
  on public.scores for select
  using (true);

drop policy if exists "Allow public insert scores" on public.scores;
create policy "Allow public insert scores"
  on public.scores for insert
  with check (score >= 0 and length(trim(player_name)) > 0);

-- CLANS POLICIES: Public read + Validated insert
drop policy if exists "Allow public read clans" on public.clans;
create policy "Allow public read clans"
  on public.clans for select
  using (true);

drop policy if exists "Allow public insert clans" on public.clans;
create policy "Allow public insert clans"
  on public.clans for insert
  with check (length(code) = 6 and length(trim(name)) >= 2);

-- CLAN MEMBERS POLICIES: Public read + Validated insert
drop policy if exists "Allow public read clan_members" on public.clan_members;
create policy "Allow public read clan_members"
  on public.clan_members for select
  using (true);

drop policy if exists "Allow public insert clan_members" on public.clan_members;
create policy "Allow public insert clan_members"
  on public.clan_members for insert
  with check (length(player_id) > 0 and length(trim(player_name)) > 0);
