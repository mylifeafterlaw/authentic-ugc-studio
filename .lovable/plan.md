Problem: Multiple sections (About, Portfolio, Services, Why Me, Social Proof, Contact) are squeezed into narrow max-width channels (max-w-2xl, max-w-3xl, max-w-4xl), leaving large empty side margins. The Hero section is not affected and must be left untouched.

Approach: Remove the explicit narrow max-width constraints on the non-hero sections and let the default `container` class provide a consistent, wider content area with built-in padding. No changes to content, fonts, colours, section order, or the Hero.

Files to change:

1. `src/components/AboutSection.tsx`
   - Change `container max-w-3xl` to `container`

2. `src/components/PortfolioSection.tsx`
   - Remove `max-w-3xl mx-auto` from each category inner wrapper (line ~191)
   - Keep the outer `container` and all existing tile/category logic untouched

3. `src/components/ServicesSection.tsx`
   - Change `container max-w-4xl` to `container`

4. `src/components/WhyMeSection.tsx`
   - Remove `max-w-3xl mx-auto` from the grid wrapper (line ~28)

5. `src/components/SocialProofSection.tsx`
   - Change `container max-w-4xl` to `container`

6. `src/components/ContactSection.tsx`
   - Change `container max-w-2xl` to `container`

Result: All non-hero sections share the same `container` width (~1200px at 2xl with 1.5rem side padding), giving a consistent, wider layout with comfortable margins. Hero section is completely untouched.