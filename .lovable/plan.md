## About Section – Widen Card Grid

### Problem
The card grid is constrained to `max-w-2xl` on the grid and `max-w-3xl` on the section container. This leaves large empty margins on desktop and makes each card so narrow that headlines and subtext wrap across 3–4 lines, looking cramped.

### Fix

1. **Widen the section and grid containers**
   - Change section container `max-w-3xl` → `max-w-5xl`.
   - Change inner grid `max-w-2xl mx-auto` → `max-w-5xl mx-auto` (or remove its own max-width so it fills the section container).
   - Keep page margins via `px-6`.

2. **Reduce internal card padding slightly**
   - Change card horizontal padding from `px-4` to `px-3.5` (or `px-3`) to give text a little more room inside each wider card.
   - Keep `py-3` vertical padding unchanged.

3. **Preserve all existing design decisions**
   - Two-column `sm:grid-cols-2` layout.
   - 5th card centred on its own row at single-column width.
   - Lighter custom shadow, `bg-card`, rounded corners.
   - `w-12 h-12` icon containers, `w-6 h-6` icons, `bg-secondary` circles.
   - `mt-7` gap above the closing quote, `mt-3` above the link.
   - All copy, headings, links and icons untouched.

### Result
Cards use far more horizontal space, text sits on 1–2 lines instead of 3–4, and the section feels balanced instead of floating in a narrow column.