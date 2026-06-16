Swap Services and About section order on the page.

Current order in `src/pages/Index.tsx`:
Hero → Portfolio → About → Services → Contact

New order:
Hero → Portfolio → Services → About → Contact

Changes needed:
1. In `src/pages/Index.tsx`, swap the import order and JSX placement of `AboutSection` and `ServicesSection` so `ServicesSection` renders immediately after `PortfolioSection` and before `AboutSection`.

2. The nav menu in `src/components/Navbar.tsx` already lists Services before About, so no nav change is required.

No content, copy, styling, or layout changes to any section — only reordering.