# Connection Test Plan

Goal: prove a single row can be written from the live site to the database, using the backend already connected to this site (Lovable Cloud). No external project, no manual env var setup, no hardcoded keys.

## Important context
Your site is already connected to a managed backend. The Supabase client, dependency, and environment variables already exist and are auto-managed — so steps 1 and 2 of your original list are already done. There is nothing for you to paste anywhere; it works locally and on the deployed build automatically.

That means the only new work is: the test table, its security rules, and a temporary test button.

## 1. Create the `connection_test` table (database migration)
Columns:
- `id` — uuid, primary key, default `gen_random_uuid()`
- `created_at` — timestamptz, default `now()`
- `note` — text

## 2. Row Level Security: insert-only for the public key
- Enable RLS on the table.
- Add an INSERT policy allowing the public `anon` role (and `authenticated`) to insert rows.
- Add NO select policy → reads are blocked for the public key.
- Grants: `GRANT INSERT ON public.connection_test TO anon, authenticated;` and `GRANT ALL TO service_role;` — deliberately no `SELECT` grant to `anon`, so the public key cannot read it back.

## 3. Temporary test button (frontend, throwaway)
- Add a small temporary `ConnectionTest` component with a "Run connection test" button.
- On click it inserts one row: `note = "test write from site"` via the existing Supabase client.
- It shows success or error feedback inline.
- It also attempts a read-back to demonstrate the public key is blocked from SELECT (expected: error / no rows).
- Mounted somewhere easy to reach temporarily (e.g. top of the homepage). Clearly marked as throwaway.

## 4. Verification (what I'll tell you after building)
- Env vars: nothing to paste — already managed by the connected backend for both local and deployed builds.
- Confirm the row: open Backend → database, view the `connection_test` table, see a row with note "test write from site".
- Confirm no read access: the in-page read-back will fail / return nothing, proving the public key is insert-only.

## 5. Cleanup (later, on your say-so)
Once confirmed, I remove the test button/component and optionally drop the `connection_test` table.

## Technical notes
- Uses existing `src/integrations/supabase/client.ts` — no new client, no new keys.
- One migration (table + RLS + grants) and one new temporary component, plus a one-line mount in the homepage.
- No changes to existing tables, auth, enquiries form, or admin dashboard.