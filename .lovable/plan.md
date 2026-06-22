# Portfolio Tile Captions — Two-Line Structure

Scope: `src/components/PortfolioSection.tsx` only. No changes to layout, tile size, videos, swipe cue, or any other category copy.

## 1. Update the `Tile` type
Add two optional caption fields alongside the existing `label`:
```text
subject?: string  // primary line (uppercase, letter-spaced)
format?: string   // secondary line (smaller, more muted)
```
Keep `label` so existing tiles in other categories keep working unchanged.

## 2. Update Product category data
Replace the three Product tiles' `label` with `subject` + `format`:
- Tile 1: subject "Haircare", format "Before and after · B-roll and voiceover · hook-led"
- Tile 2: subject "Skincare", format "Talking-to-camera with B-roll · natural product integration · hook-led"
- Tile 3: subject "Water bottle", format "Hook-led · talking-to-camera and B-roll"

Copy used verbatim, middle dots `·` preserved, no em-dashes. All other categories keep their current single `label`.

## 3. Update caption rendering in `VideoTile`
Current caption block renders only `tile.label`. Change it to:
- If `subject` exists: render `subject` as the primary line (same current style: `text-[0.65rem] uppercase tracking-[0.2em] font-light text-muted-foreground`), and render `format` directly beneath as a quieter second line (smaller, e.g. `text-[0.55rem]` and lighter/more muted, normal case so the dotted format text reads cleanly, tighter top margin).
- Else fall back to the existing `label` rendering unchanged (so other categories are untouched).
- Also update the `img alt` fallback to use `subject ?? label`.

No other code changes.