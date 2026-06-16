## Goal
Two small contact changes. (Full audit reported separately in chat.)

## Change 1 — Contact section: remove Linktree button
File: `src/components/ContactSection.tsx`
- Remove the third `<a>` button (the "Linktree" one, lines ~39-47), leaving only "Email Me" and "WhatsApp".
- Remove the now-unused `ExternalLink` import.

## Change 2 — Footer: add a subtle Linktree link
File: `src/components/Footer.tsx`
- Add a low-emphasis text link "Linktree" alongside the existing Email / Instagram / YouTube icons in the same flex row.
- Match the quiet styling of the existing "Email" text link (`text-primary-foreground/60 hover:text-primary-foreground ... font-body text-sm`) — not a button.
- Point it to `https://linktr.ee/` as a placeholder (carry over the existing Linktree URL). Flagged in the audit as needing your real Linktree handle.

## Note
Both the removed Contact Linktree button and the new Footer link currently use the placeholder `https://linktr.ee/`. Provide your real Linktree URL and I'll wire it in. No other files change.