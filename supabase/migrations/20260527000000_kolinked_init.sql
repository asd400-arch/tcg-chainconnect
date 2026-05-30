-- Profiles
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  headline text,
  company text,
  country text,
  industry text,
  job_level text,
  bio text,
  linkedin_url text,
  avatar_url text,
  tier text default 'free',
  created_at timestamptz default now()
);

-- Waitlist
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  company text,
  country text,
  industry text,
  created_at timestamptz default now()
);

-- Jobs (placeholder)
create table jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text,
  country text,
  industry text,
  description text,
  salary_range text,
  posted_by uuid references profiles(id),
  is_korean_company boolean default false,
  created_at timestamptz default now()
);

-- RLS
alter table waitlist enable row level security;
create policy "Anyone can join waitlist" on waitlist for insert with check (true);

alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can view all profiles" on profiles for select using (true);

alter table jobs enable row level security;
create policy "Anyone can view jobs" on jobs for select using (true);
create policy "Auth users can post jobs" on jobs for insert with check (auth.uid() = posted_by);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, country, industry)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'industry'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

