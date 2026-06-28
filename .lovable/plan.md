# Save enquiries to a database + email notifications

Turn the Contact section's "Email Me" link into a real enquiry form. Submissions are stored in Lovable Cloud and a notification email is sent to you for each new enquiry.

## What you'll get
- A branded enquiry form (Name, Email, Brand / company, Message) in the Contact section
- Every submission saved securely to the database
- An email to you on each new enquiry
- Friendly success / error states and validation

## Steps

### 1. Enable Lovable Cloud
Provision the backend (database, storage, functions) — no external account needed.

### 2. Database table
Create `enquiries` table:

```text
id            uuid (pk, default gen_random_uuid())
name          text
email         text
brand         text (nullable)
message       text
created_at    timestamptz default now()
```

Row-Level Security:
- Allow `anon` + `authenticated` to INSERT (public form, anyone can submit)
- No public SELECT — enquiries are only readable via the dashboard / service role
- Grants set accordingly

### 3. Enquiry form UI
Rewrite `src/components/ContactSection.tsx`:
- Keep the existing heading, gradient, and editorial styling
- Add form fields: Name, Email, Brand / company (optional), Message
- Client-side validation with `zod` (required fields, valid email, length limits)
- On submit: insert row into `enquiries`, then trigger the notification email
- Show toast success ("Thanks — I'll be in touch") and error handling
- Keep an "Email Me" mailto fallback link

### 4. Email notification
Set up Lovable's built-in email (requires a sender domain — you'll get a one-click setup prompt). An edge function sends you an email with the enquiry details on each submission.
- Recipient: `my.lifeafterlaw@gmail.com` (the address currently in the contact section) — confirm if you'd prefer another
- Input validated server-side before sending

## Technical notes
- Form input validated both client-side (zad) and server-side (edge function)
- Notification uses an app/transactional email triggered by the submission; the sender domain must be verified before emails actually deliver (you'll be guided through DNS). Until verified, enquiries still save to the database.
- No business logic beyond the form + persistence + notification is changed.
