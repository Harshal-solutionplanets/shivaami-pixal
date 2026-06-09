-- Create contact table
CREATE TABLE IF NOT EXISTS public.contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON public.contact
    FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users (like admin) to read contact leads
CREATE POLICY "Allow authenticated selects" ON public.contact
    FOR SELECT TO authenticated USING (true);
