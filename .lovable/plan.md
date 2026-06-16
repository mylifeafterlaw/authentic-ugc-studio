## Plan: Remove two sections

### Sections to delete
1. **"Built for Results"** (`SocialProofSection` — cards + testimonial placeholder)
2. **"Why Work With Me"** (`WhyMeSection` — four-card block)

### Changes

**File: `src/pages/Index.tsx`**
- Remove import lines for `WhyMeSection` and `SocialProofSection`
- Remove `<WhyMeSection />` and `<SocialProofSection />` from the JSX order
- Keep all other sections (Hero, Portfolio, About, Services, Contact) untouched

**Delete files:**
- `src/components/SocialProofSection.tsx`
- `src/components/WhyMeSection.tsx`

**Nav / anchors check:**
- The Navbar only links to `#hero`, `#portfolio`, `#services`, `#about`, and `#contact`. No nav links or anchors reference the deleted sections, so no cleanup needed there.

### Unchanged
- Hero, Portfolio, Services, About, Contact sections
- Navbar, Footer, FloatingCTA
- Tile sizing, gaps, or alignment in Portfolio