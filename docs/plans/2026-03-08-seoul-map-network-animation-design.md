# Seoul Map Network Animation Design

**Date:** 2026-03-08
**Component:** `components/seoul-dotted-map.tsx`

## Goal

Add a network expansion animation to the Seoul dotted map: after the initial "First AI DC" marker appears, 4 additional future DC locations appear sequentially with arcing connection lines from the first DC — conveying the vision of 25 Seoul AI Data Centers.

## Approach

**SVG overlay** on top of the existing canvas. A transparent `<svg>` is absolutely positioned to match the canvas dimensions. Bezier arc paths animate via `stroke-dashoffset`.

## DC Locations (5 total)

| # | Label | Position (% of container) |
|---|-------|--------------------------|
| 1 | First AI DC (existing) | left: 90%, top: 75% |
| 2 | (future) | left: 68%, top: 60% — Gangnam area |
| 3 | (future) | left: 42%, top: 55% — Jung-gu / Yongsan |
| 4 | (future) | left: 28%, top: 38% — Mapo / Eunpyeong |
| 5 | (future) | left: 60%, top: 22% — Dobong / Nowon |

## Animation Sequence

1. Map draw animation completes → `tiltDone = true`
2. 1st marker (existing) appears as before
3. **After 1.5s delay**, markers 2–5 appear one by one, 0.8s apart
4. Each new marker triggers an arc from DC#1 to the new marker (0.5s draw)
5. Arcs persist after drawing (no fade — like the reference images)
6. Loop: after all 5 are shown, pause 3s, then re-animate arcs (dashoffset loop)

## SVG Arc Style

- Quadratic Bezier (`Q` command) with control point arching upward/left
- Stroke: `rgba(180, 210, 255, 0.8)` — cool blue-white
- Stroke width: `1.5px`
- `filter: drop-shadow(0 0 5px rgba(100,180,255,0.9))`
- `stroke-dasharray` / `stroke-dashoffset` animation for draw-on effect
- Duration: `0.5s ease-in-out`

## New Marker Style

- Same gold pulse animation as DC#1 but **smaller** (10px dot, 28px pulse ring)
- No speech bubble (future sites = unlabeled)
- Slight opacity: `0.75` to differentiate from the active DC#1

## Implementation Plan

1. Add `DC_LOCATIONS` array with 5 entries (existing + 4 new)
2. Add state: `visibleDCs` (number, starts at 1 after tiltDone)
3. Use `useEffect` to increment `visibleDCs` on a timer (0.8s interval)
4. Render SVG overlay with `<path>` arcs for each pair (DC#1 → DC#n)
5. Each arc uses CSS animation keyed to visibility state
6. Render additional pulse markers for DC#2–5
