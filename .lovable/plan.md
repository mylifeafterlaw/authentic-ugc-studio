# Part 1 — Cleanup (will build on approval)

Remove the throwaway connection test now that it's confirmed working:

- Delete `src/components/ConnectionTest.tsx`.
- Remove the `<ConnectionTest />` import and usage from `src/pages/Index.tsx`.
- Drop the `connection_test` table (and its insert policy) via a migration.

Nothing else touches existing tables, auth, the enquiries form, or the admin dashboard.

---

# Part 2 — Readout (no build, just findings)

This is what already exists, so the analytics feature can reuse it rather than duplicate it.

## Admin dashboard
- **Route:** `/admin`, defined in `src/App.tsx`. It's wrapped in `<RequireAdmin>`, so only logged-in admins reach it.
- **File:** `src/pages/Admin.tsx`.
- **Structure:** A single page with a header (title, signed-in email, Refresh + Sign out buttons) and two stacked `<section>` blocks — "Recent Enquiries" and "Email Delivery Status". Each section renders a shadcn `<Table>`. Data loads in one `load()` function that runs both queries in parallel on mount and on Refresh.
- **Adding an Analytics section:** Yes, this is straightforward. A new "Analytics" section can be added as a third `<section>` on the same page following the identical pattern (query → state → table/cards). If it grows, the page could be split into tabs (a `Tabs` component already exists in the UI kit), but a new section is the lowest-friction option and matches the current layout.

## Auth setup
- **Provider:** `src/hooks/useAuth.tsx` wraps the app in `App.tsx`. It tracks session/user via the backend auth client and exposes `user`, `session`, `isAdmin`, `loading`, `signOut`.
- **Login page:** `/auth` (`src/pages/Auth.tsx`) — email/password plus Google sign-in.
- **Admin gating:** `src/components/RequireAdmin.tsx` checks `useAuth()`. Not logged in → redirect to `/auth`. Logged in but not admin → "Not authorised" message. Admin → renders the page.
- **How admin is identified:** On login, `useAuth` queries `user_roles` for a row where `user_id = auth.uid()` and `role = 'admin'`. There's also a security-definer function `has_role(_user_id, _role)` used inside RLS policies, and a trigger `grant_admin_for_owner_email` that auto-grants the `admin` role to `my.lifeafterlaw@gmail.com` once that account's email is confirmed.

## user_roles table
Columns:
- `id` — uuid, primary key
- `user_id` — uuid (references the auth user)
- `role` — enum `app_role` (`admin` | `moderator` | `user`)
- `created_at` — timestamptz

RLS: one policy — authenticated users can read **their own** role rows (`auth.uid() = user_id`). No insert/update/delete from the client; roles are managed server-side (e.g. the owner-email trigger). The anon key cannot read it at all.

## enquiries table
Columns:
- `id` — uuid, primary key
- `name` — text (required)
- `email` — text (required)
- `brand` — text (optional)
- `message` — text (required)
- `created_at` — timestamptz

How entries are logged: the public contact form (`src/components/ContactSection.tsx`) validates input with zod, then does `supabase.from("enquiries").insert({...})` directly from the browser using the public anon key — no edge function for the write. After a successful insert it fires a `notify-enquiry` edge function for the notification email (non-blocking). **This is the pattern to mirror for analytics events:** a public table that the anon key can insert into but not read, written directly from the client.

## RLS summary (what the public anon key can/can't do)
- **enquiries:** anon + authenticated can **insert** (`Anyone can submit an enquiry`). Only authenticated **admins** can **read** (`has_role(auth.uid(),'admin')`). Anon cannot read — insert-only, exactly the analytics pattern.
- **user_roles:** anon has no access. Authenticated users can only read their own role row. No client writes.
- **connection_test:** anon + authenticated can insert; nobody can read via the client (to be dropped in cleanup).

### Recommended pattern for analytics (for when you scope it)
An `analytics_events` table that mirrors enquiries: anon **insert-only** (page visits, video plays, email-link clicks written directly from the client), admin-only **read** via `has_role(...)`, surfaced as a new section/tab in `/admin`. Capture `?ref=` tag, event type, and a timestamp; reuse `useAuth` + `RequireAdmin` for the admin view.
