## Hero & Navbar refinements

### 1. Remove the hero subheading
Delete the paragraph "Currently UK-based, returning to Thailand summer 2026. I make short-form video for wellness, tech, and lifestyle brands." so the headline flows straight into the stat bullets.

### 2. Update the stat bullets
- Bullet 1: "Short-form video for wellness, tech, lifestyle **& travel** brands"
- Bullet 2: "Fast turnaround" (remove "in the UK now")
- Bullet 3: "**UK/Thailand based — open to global collaborations**" (replaces "Full SE Asia production from summer 2026")

### 3. Remove the bottom micro-line (optional, your call)
The line "✦ Open to UK and global collaborations" now duplicates the new bullet 3. I'd remove it to avoid repetition — confirm if you'd rather keep it.

### 4. Remove name from navbar top-left
Since "Jess Cousin" now appears in the hero, replace the navbar's name button with a small neutral mark (e.g. initials "JC", or just keep it as an invisible scroll-to-top anchor). Recommended: show compact "JC" so the logo slot isn't empty but doesn't duplicate the full name.

### Extra suggestions for the hero
- **Tighten vertical rhythm**: with the subhead gone, increase spacing above the bullets slightly so the script name → headline → bullets read as three clean tiers.
- **Stronger primary CTA hierarchy**: "View Work" already uses the gradient; consider making "Work With Me" the primary action since enquiries are the goal — happy to swap emphasis.
- **Add a tiny trust line** near the CTAs (e.g. niches or "wellness · tech · lifestyle · travel") only if you want — otherwise leave clean.

### Technical notes
- All changes in `src/components/HeroSection.tsx` (`stats` array + removing the subhead `<p>` and optionally the micro-line).
- Navbar change in `src/components/Navbar.tsx` (lines 36-41).
- No logic, routing, or color changes.
