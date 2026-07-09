create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  team_alias text not null check (char_length(team_alias) between 2 and 64),
  lang text not null check (lang in ('es', 'pt')),
  started_at timestamptz not null,
  finished_at timestamptz,
  payload jsonb not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (team_alias, started_at)
);

alter table public.game_sessions enable row level security;

revoke all on table public.game_sessions from anon, authenticated;

create index if not exists game_sessions_started_at_idx
  on public.game_sessions (started_at desc);

create index if not exists game_sessions_lang_idx
  on public.game_sessions (lang);
