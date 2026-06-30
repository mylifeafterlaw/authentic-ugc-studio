CREATE TABLE public.connection_test (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  note text
);

GRANT INSERT ON public.connection_test TO anon, authenticated;
GRANT ALL ON public.connection_test TO service_role;

ALTER TABLE public.connection_test ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert connection tests"
ON public.connection_test
FOR INSERT
TO anon, authenticated
WITH CHECK (true);