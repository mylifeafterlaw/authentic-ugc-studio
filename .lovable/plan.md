## About Section — Update Plan

### What changes
1. **Row layout**: Each trait row currently has `icon + single paragraph`. Update to `icon in soft circle + bold headline + muted sub-line` as requested.
2. **Content**: Replace the 5 traits with the exact copy provided.
3. **Closing line**: Replace the italic quote with "Same person on camera as off it."
4. **Icons**: Pick sensible on-brand Lucide icons for each personal point.

### What stays the same
- "About Jess" heading
- Section wrapper, gradient, container, padding, spacing
- Framer Motion animations (`initial`, `whileInView`, `viewport`, `transition`)
- Card styling (`bg-card`, `rounded-lg`, `shadow-soft`, `p-4`)
- Icon circle styling (`rounded-full bg-secondary`, `w-10 h-10`)
- "More about me →" link below the closing line, pointing to `/about-me`

### Technical details
- File: `src/components/AboutSection.tsx`
- Data structure changes from `{ icon, text }` to `{ icon, headline, sub }`
- JSX map updates to render headline as bold text and sub as muted smaller text
- No em-dashes in copy
- Lucide icons (tentative): `Scale` / `Gavel` for law, `Bike` for motorbike, `Brain` for ADHD, `Heart` for wellness, `Dumbbell` for training

### No other sections touched