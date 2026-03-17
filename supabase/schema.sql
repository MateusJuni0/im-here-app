-- Create the 'wallets' table
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'EUR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row-Level Security (RLS) for 'wallets'
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view and update their own wallet
CREATE POLICY "Users can view their own wallet" ON public.wallets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet" ON public.wallets
  FOR UPDATE USING (auth.uid() = user_id);

-- Create the 'transactions' table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID NOT NULL REFERENCES public.wallets(id),
  amount NUMERIC(15, 2) NOT NULL,
  type TEXT NOT NULL, -- e.g., 'deposit', 'withdraw', 'transfer'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row-Level Security (RLS) for 'transactions'
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.wallets WHERE id = wallet_id));

-- Policy to allow users to insert their own transactions (requires wallet_id they own)
CREATE POLICY "Users can insert their own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM public.wallets WHERE id = wallet_id));

-- Optionally, create a 'users' table if it doesn't exist, as 'wallets' references it
-- CREATE TABLE public.users (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   email TEXT UNIQUE,
--   -- other user fields
-- );

-- You might need to enable the uuid-ossp extension in your Supabase project
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
