-- Esegui questo file nell'editor SQL di Supabase (Project > SQL Editor > New query)

create table profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  ruolo text check (ruolo in ('cliente','pro')) not null,
  nome text not null,
  bio text,
  mestiere text,
  zona text,
  avatar_url text,
  stripe_account_id text,
  verificato boolean default false,
  created_at timestamp default now()
);

create table portfolio_posts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  media_url text not null,
  didascalia text,
  created_at timestamp default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  titolo text not null,
  descrizione text,
  prezzo numeric not null,
  mestiere text,
  attivo boolean default true,
  created_at timestamp default now()
);

create table requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id),
  titolo text not null,
  descrizione text,
  mestiere text,
  zona text,
  budget numeric,
  stato text check (stato in ('aperta','assegnata','chiusa')) default 'aperta',
  created_at timestamp default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id),
  request_id uuid references requests(id),
  client_id uuid references profiles(id),
  pro_id uuid references profiles(id),
  importo numeric not null,
  commissione numeric not null,
  stato text check (stato in ('in_attesa','pagato','completato')) default 'in_attesa',
  stripe_payment_intent_id text,
  created_at timestamp default now()
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  autore_id uuid references profiles(id),
  voto int check (voto between 1 and 5),
  commento text,
  created_at timestamp default now()
);

-- Sicurezza di base: ognuno vede tutto in lettura, scrive solo il proprio
alter table profiles enable row level security;
create policy "Profili visibili a tutti" on profiles for select using (true);
create policy "Utente modifica solo il proprio profilo" on profiles for update using (auth.uid() = user_id);
