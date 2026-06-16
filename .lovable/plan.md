## Services Section — Card & Copy Rewrite

### Goal
Replace all service cards and their copy while keeping the existing card-grid layout, styling, and animations intact. No other sections touched.

### What changes

**1. Subtitle**
- Replace "What I can create for your brand." with:
  "The formats I work in. Mix and match to fit your brief."

**2. Cards — 6 new cards**
Keep the same structure: soft circular icon background, bold serif title, muted subtitle, hover shadow.

| # | Title | Subtitle | Icon (lucide-react) |
|---|-------|----------|---------------------|
| 1 | Talking-to-camera | Natural delivery, scripted or unscripted | Camera |
| 2 | B-roll and voiceover | Lifestyle footage with narration | Film |
| 3 | Product demos and unboxings | Showing the thing in real use | Package |
| 4 | Hook-led short-form | Built for TikTok and Reels | Sparkles |
| 5 | Based in Thailand | Filming across South East Asia | MapPin |
| 6 | Add-ons | Extra hooks, raw footage, captions, rush turnaround | Plus |

Old cards (UGC Videos / Voiceover Content / Product Demos / Travel & Hospitality / Custom Packages) removed entirely.

**3. Foot line**
Add one centered, small, muted line below the card grid:
"Ex-lawyer, so briefs, deadlines and clear comms come as standard."

### What stays the same
- Card grid layout (`grid sm:grid-cols-2 lg:grid-cols-3 gap-5`)
- Card styling (rounded-xl, bg-card, shadow-soft, hover:shadow-card)
- Icon circle styling (w-14 h-14, rounded-full, bg-secondary)
- Framer Motion entrance animations
- Section wrapper (py-20 lg:py-28, gradient-soft, container max-w-5xl)
- No em-dashes used anywhere in copy

### File to edit
- `src/components/ServicesSection.tsx`