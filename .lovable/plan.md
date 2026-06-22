## Hero — Mobile Portrait Photo

### What
On mobile (below `lg`), display the same portrait photo used in the desktop hero (`heroImg` / `sideStill`) above the name text, straight (no rotation), while keeping the desktop layout unchanged.

### Why
Currently the mobile hero is text-only above the fold; adding the portrait makes the hero more personal and visually engaging before the user scrolls.

### How
In `src/components/HeroSection.tsx`:

1. Add a mobile-only image block (`lg:hidden`) at the top of the text column, before the name.
2. Use `sideStill` (`heroImg`) as the source — same asset as the desktop tilted photo behind the phone.
3. Render it straight: `rounded-2xl`, `shadow-card`, `border-4 border-background`, no `rotate-6`.
4. Size it appropriately for mobile (approx. `w-[180px] sm:w-[220px]` `aspect-[4/5]`), centred above the name with a small bottom margin (`mb-4` or `mb-6`).
5. Leave all desktop code untouched — the tilted photo behind the phone mockup and the phone itself remain exactly as they are.

### Verification
- Mobile viewport (375–414 px): portrait appears straight and centred above "Jess Cousin", phone mockup still visible below the text as before.
- Desktop viewport (1280 px+): no change; tilted photo behind phone remains.

No new dependencies. No JavaScript logic changes. Purely presentational Tailwind class adjustments in one component.