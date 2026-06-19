## About Section Redesign Plan

### Scope
Only `src/components/AboutSection.tsx`. No other sections touched.

### Changes

1. **Two-column grid (desktop)**
   - Replace the single `space-y-3` stack with a CSS Grid (`grid-cols-2`) on desktop.
   - Cards sit in pairs across two rows.
   - The 5th card keeps the **same single-column width** as the other four cards and is centred horizontally beneath the two columns (e.g. via `mx-auto` or `justify-self-center`), so it does not stretch across the full grid width.
   - Collapse to single column on mobile (`grid-cols-1`).
   - Constrain the whole grid to a centred `max-w-3xl` (already present on the container) so it doesn't stretch edge to edge.

2. **Tidier, lighter cards**
   - Keep `bg-card` and rounded corners, but reduce shadow class from `shadow-soft` to a flatter custom utility (or inline lighter shadow).
   - Remove fixed padding that creates large internal empty space; let cards size to their content with modest padding (`py-3 px-4` or similar).
   - Ensure cards align neatly within their grid cell without stretching vertically across the row.

3. **Larger, warmer icons**
   - Increase the icon container circle from `w-10 h-10` to `w-12 h-12`.
   - Increase the icon itself from `w-5 h-5` to `w-6 h-6`.
   - Keep the `bg-secondary` soft circle background.

4. **Tighter spacing**
   - Reduce the gap between the bottom of the card grid and the `"Same person on camera as off it"` line from `mt-10` to `mt-6` or `mt-8`.
   - Keep the small gap (`mt-3`) between that line and the `More about me` link.

5. **Copy & assets preserved**
   - Exact same headings, subtext, icons, and links retained.
   - On-brand colour tokens (`bg-secondary`, `text-primary`, etc.) kept throughout.