-- Run this once in Supabase Dashboard > SQL Editor > New query.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text not null default 'General feedback',
  rating integer not null check (rating between 1 and 5),
  review text not null check (char_length(review) between 10 and 1000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.admin_users enable row level security;
alter table public.reviews enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Anyone can submit pending reviews" on public.reviews;
create policy "Anyone can submit pending reviews"
on public.reviews for insert to anon, authenticated
with check (status = 'pending');

drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
on public.reviews for select to anon, authenticated
using (status = 'approved');

drop policy if exists "Admins can read all reviews" on public.reviews;
create policy "Admins can read all reviews"
on public.reviews for select to authenticated
using (public.is_admin());

drop policy if exists "Admins can update reviews" on public.reviews;
create policy "Admins can update reviews"
on public.reviews for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete reviews" on public.reviews;
create policy "Admins can delete reviews"
on public.reviews for delete to authenticated
using (public.is_admin());

drop policy if exists "Admins can read own admin row" on public.admin_users;
create policy "Admins can read own admin row"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));
