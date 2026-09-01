# Features Bento Grid Redesign

## Goal
Replace the current 2-column grid in the `GpuCloudContent` Features section with a bento-grid layout matching the reference image.

## Layout
```
┌─────────────────────┬──────────┬──────────┐
│         01          │    02    │    04    │
│  (GPU placeholder)  │ 스토리지  │  확장    │  ~220px
│  성능 최적화 인스턴스 ├──────────┼──────────┤
│                     │    03    │    05    │  ~260px
│                     │ 네트워크  │  운영    │
└─────────────────────┴──────────┴──────────┘
  1.2fr                 1fr        1fr
```
Total grid height ~480px.

## CSS Grid
- `grid-template-columns: 1.2fr 1fr 1fr`
- `grid-template-rows: auto auto` (or fixed ~220px / ~260px)
- Card 01: `row-span-2`

## Section Header
- Left-aligned (change from current `items-center`)
- `text-[36px] md:text-[48px] font-bold text-white`

## Card Styles (shared)
- `bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative`
- Number badge: `text-xs font-mono text-white/30`
- Title: `text-xl font-bold text-white`
- Desc: `text-sm text-white/50`
- Padding: `p-6`

## Card-specific decorations
| Card | Title | Decoration |
|------|-------|-----------|
| 01 | 성능 최적화 인스턴스 | Dark gradient bg, GPU image placeholder (center/bottom) |
| 02 | 동적 스토리지 확장 | Perspective grid SVG (bottom-right) |
| 03 | 강화된 네트워크 보안 | `<Shield>` Lucide icon, large, bottom-right |
| 04 | 탄력적 확장 | Perspective grid SVG (bottom-right) |
| 05 | 운영 신뢰성 | `<Activity>` Lucide icon, bottom-right |

## Files Modified
- `components/products-section.tsx` — replace `Features Grid` block only

## Notes
- GPU image placeholder: leave an `<Image>` slot with a dark bg, mark with TODO comment
- Framer motion stagger entrance animations: keep existing pattern
- Mobile: stack to single column (same as current)
