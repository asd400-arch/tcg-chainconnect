CREATE TABLE profiles (
  id uuid references auth.users primary key,
  full_name text,
  headline text,
  company text,
  country text,
  linkedin_url text,
  avatar_url text,
  tier text default 'free',
  created_at timestamptz default now()
);

CREATE TABLE waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  company text,
  country text,
  created_at timestamptz default now()
);

-- RLS
alter table waitlist enable row level security;
create policy "Anyone can join waitlist" on waitlist for insert with check (true);
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

