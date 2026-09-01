# Seoul Map Network Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add sequential DC location markers + animated arc lines connecting from DC#1 to newly appearing locations on the Seoul dotted map.

**Architecture:** SVG overlay (absolutely positioned, 100%×100%) rendered on top of the existing canvas. Arc lines use quadratic bezier paths animated with `stroke-dashoffset`. New markers reuse the existing gold pulse style. State machine: `tiltDone` (existing) → sequential `visibleDCs` counter (new).

**Tech Stack:** React, TypeScript, CSS keyframes, SVG

---

### Task 1: Add DC location data and state

**Files:**
- Modify: `components/seoul-dotted-map.tsx`

**Step 1: Add DC_LOCATIONS constant** (after line 73, before the `draw` callback)

Add this block right after the existing `useState(false)` for `tiltDone`:

```tsx
const DC_LOCATIONS = [
  // DC#1 — existing, Gangdong area
  { left: '90%', top: '75%', label: 'First AI DC', year: '2027' },
  // DC#2 — Gangnam
  { left: '68%', top: '68%', label: null, year: null },
  // DC#3 — Jung-gu / Yongsan
  { left: '50%', top: '52%', label: null, year: null },
  // DC#4 — Mapo
  { left: '32%', top: '44%', label: null, year: null },
  // DC#5 — Dobong / Nowon
  { left: '62%', top: '24%', label: null, year: null },
];
```

**Step 2: Add visibleDCs state** (right after `tiltDone` state line)

```tsx
const [visibleDCs, setVisibleDCs] = useState(1);
```

**Step 3: Verify** — component should still compile and render identically (no visible change yet).

---

### Task 2: Sequential appearance timer

**Files:**
- Modify: `components/seoul-dotted-map.tsx`

**Step 1: Add useEffect after the tilt animation useEffect** (after line ~185, before `return`)

```tsx
useEffect(() => {
  if (!tiltDone) return;
  if (visibleDCs >= DC_LOCATIONS.length) return;
  const timer = setTimeout(() => {
    setVisibleDCs((n) => n + 1);
  }, visibleDCs === 1 ? 1500 : 800);
  return () => clearTimeout(timer);
}, [tiltDone, visibleDCs]);
```

This triggers: first DC is visible from start, then 1.5s after tiltDone the 2nd appears, then every 0.8s the next one appears.

**Step 2: Verify** — open component in browser, confirm it still renders without errors. You won't see a difference yet.

---

### Task 3: SVG overlay with arc lines

**Files:**
- Modify: `components/seoul-dotted-map.tsx` (inside the JSX `return`)

**Step 1: Add SVG overlay** — insert after the closing `</div>` of the canvas mask div and before `{tiltDone && (`:

```tsx
{/* SVG arc overlay */}
<svg
  style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
    zIndex: 5,
  }}
>
  <defs>
    <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  {DC_LOCATIONS.slice(1).map((dc, i) => {
    const idx = i + 1; // 1-based index
    if (visibleDCs <= idx) return null;

    // Parse percentage positions to numbers (0–1)
    const x1 = parseFloat(DC_LOCATIONS[0].left) / 100;
    const y1 = parseFloat(DC_LOCATIONS[0].top) / 100;
    const x2 = parseFloat(dc.left) / 100;
    const y2 = parseFloat(dc.top) / 100;

    // Control point: midpoint, lifted upward
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - 0.22;

    // SVG uses viewBox coordinates — use 100x100 userspace via % strings directly
    const p1 = `${x1 * 100}% ${y1 * 100}%`;
    const p2 = `${x2 * 100}% ${y2 * 100}%`;
    const cp = `${cx * 100}% ${cy * 100}%`;

    return (
      <path
        key={idx}
        d={`M ${p1} Q ${cp} ${p2}`}
        fill="none"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.2"
        filter="url(#arcGlow)"
        style={{
          animation: `arcDraw 0.55s ease-out forwards`,
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
        }}
      />
    );
  })}
</svg>
```

**Step 2: Add arcDraw keyframe** — inside the existing `<style>` tag at the bottom of the JSX, add:

```css
@keyframes arcDraw {
  to { stroke-dashoffset: 0; }
}
```

**Step 3: Verify** — arcs should draw on after each DC appears. If arcs don't animate on re-render (React reuses DOM nodes), we need the key fix in Task 4.

---

### Task 4: Fix arc animation key (ensures re-trigger on each DC)

SVG `<path>` needs a key that changes when `visibleDCs` changes so React unmounts+remounts it (triggering CSS animation restart).

**Files:**
- Modify: `components/seoul-dotted-map.tsx`

**Step 1: Update the key prop** on the arc `<path>`:

Change:
```tsx
key={idx}
```
To:
```tsx
key={`arc-${idx}-${visibleDCs}`}
```

This forces React to remount the element, restarting the CSS animation.

**Step 2: Verify** — each arc should animate draw-on exactly once when its DC appears.

---

### Task 5: Add future DC pulse markers (DC#2–5)

**Files:**
- Modify: `components/seoul-dotted-map.tsx`

**Step 1: Add markers for DC#2–5** — inside `{tiltDone && (<> ... </>)}`, after the existing pulse circle block:

```tsx
{/* Future DC markers */}
{DC_LOCATIONS.slice(1).map((dc, i) => {
  const idx = i + 1;
  if (visibleDCs <= idx) return null;
  return (
    <div
      key={`marker-${idx}`}
      style={{
        position: 'absolute',
        left: dc.left,
        top: dc.top,
        zIndex: 10,
        opacity: 0,
        animation: 'shadowAppear 0.2s ease-out forwards',
      }}
    >
      <div
        style={{
          background: 'rgba(180,210,255,0.25)',
          borderRadius: '50%',
          height: 10,
          width: 10,
          position: 'absolute',
          margin: '-5px 0 0 -5px',
          zIndex: 1,
          boxShadow: '0 0 6px rgba(150,200,255,0.5)',
        }}
      >
        <div
          style={{
            borderRadius: '50%',
            height: 28,
            width: 28,
            position: 'absolute',
            margin: '-9px 0 0 -9px',
            animation: 'pinPulsate 1.2s ease-out infinite',
            animationDelay: `${idx * 0.2}s`,
            opacity: 0,
            boxShadow: '0 0 1px 2px rgba(150,200,255,0.5)',
          }}
        />
      </div>
    </div>
  );
})}
```

**Step 2: Verify** — 4 additional blue-tinted pulse dots should appear sequentially across the Seoul map.

---

### Task 6: Visual QA and coordinate tuning

**Step 1:** Run the dev server:
```bash
npm run dev
```

**Step 2:** Navigate to the section containing `SeoulDottedMap` in the browser.

**Step 3:** Check each DC location visually:
- Are all 5 markers on the Seoul map (inside district boundaries)?
- Do arcs connect cleanly from DC#1 to each new marker?
- Is the control point height giving a nice arc (not too flat, not too steep)?

**Step 4:** If any marker position is off-map, adjust its `left`/`top` percentage in `DC_LOCATIONS`:
- Move left/right by ±3–5% increments
- Move up/down by ±3–5% increments

**Step 5:** If arc control point is too flat/steep, adjust the `- 0.22` offset in:
```tsx
const cy = Math.min(y1, y2) - 0.22;
```
Increase to `- 0.28` for higher arcs, decrease to `- 0.15` for flatter arcs.

---

### Task 7: Commit

```bash
git add components/seoul-dotted-map.tsx
git commit -m "feat: add sequential DC network animation to Seoul map"
```
