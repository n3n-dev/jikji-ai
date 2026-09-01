# Features Bento Grid Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current 2-column features grid in `GpuCloudContent` with a bento-grid layout matching the reference image — large left card (01) + 2×2 right grid (02–05), each card with unique decorative elements.

**Architecture:** Modify the `Features Grid` block in `products-section.tsx` only. No new files needed — use Lucide icons already in the project and inline SVG for the perspective grid decoration. GPU image area in card 01 is left as a placeholder `div`.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, Lucide React

---

### Task 1: Update section header alignment

**Files:**
- Modify: `components/products-section.tsx` (Features Grid section, ~line 168–209)

**Step 1: Change header from centered to left-aligned**

Find this block (around line 168–178):
```tsx
{/* Features Grid */}
<div className="py-[72px] px-6">
  <div className="mx-auto max-w-[1200px] flex flex-col items-center gap-10">
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl md:text-[36px] font-bold leading-none text-center text-white"
    >
      {t.products.gpucloud.features.title}
    </motion.h3>
```

Replace with:
```tsx
{/* Features Grid */}
<div className="py-[72px] px-6">
  <div className="mx-auto max-w-[1200px] flex flex-col gap-10">
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl md:text-[48px] font-bold leading-none text-white"
    >
      {t.products.gpucloud.features.title}
    </motion.h3>
```

Key changes:
- Remove `items-center` from the outer div
- Remove `text-center` from h3
- Increase size to `md:text-[48px]`

**Step 2: Verify in browser**

Run `npm run dev` and check the Features section — title should be left-aligned and larger.

---

### Task 2: Replace 2-column grid with bento grid structure

**Files:**
- Modify: `components/products-section.tsx`

**Step 1: Remove old grid, add bento grid**

Replace the existing `<div className="border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full">` block (lines ~179–207) with:

```tsx
<div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] md:grid-rows-[220px_260px] gap-3 w-full">
  {/* Card 01 — large left, spans 2 rows */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0 }}
    className="relative md:row-span-2 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col p-6 min-h-[300px]"
  >
    <div className="text-xs font-mono text-white/30 mb-4">01</div>
    <h4 className="text-xl font-bold text-white mb-2">
      {t.products.gpucloud.features.items[0].title}
    </h4>
    <p className="text-sm text-white/50 leading-relaxed">
      {t.products.gpucloud.features.items[0].desc}
    </p>
    {/* TODO: Replace with <Image> when GPU asset is available */}
    <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
      <div className="w-[80%] h-[45%] rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10" />
    </div>
  </motion.div>

  {/* Card 02 — top middle */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.08 }}
    className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col p-6 min-h-[160px]"
  >
    <div className="text-xs font-mono text-white/30 mb-4">02</div>
    <h4 className="text-xl font-bold text-white mb-2">
      {t.products.gpucloud.features.items[1].title}
    </h4>
    <p className="text-sm text-white/50 leading-relaxed">
      {t.products.gpucloud.features.items[1].desc}
    </p>
    <PerspectiveGrid />
  </motion.div>

  {/* Card 04 — top right */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.16 }}
    className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col p-6 min-h-[160px]"
  >
    <div className="text-xs font-mono text-white/30 mb-4">04</div>
    <h4 className="text-xl font-bold text-white mb-2">
      {t.products.gpucloud.features.items[3].title}
    </h4>
    <p className="text-sm text-white/50 leading-relaxed">
      {t.products.gpucloud.features.items[3].desc}
    </p>
    <PerspectiveGrid />
  </motion.div>

  {/* Card 03 — bottom middle */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.12 }}
    className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col p-6 min-h-[160px]"
  >
    <div className="text-xs font-mono text-white/30 mb-4">03</div>
    <h4 className="text-xl font-bold text-white mb-2">
      {t.products.gpucloud.features.items[2].title}
    </h4>
    <p className="text-sm text-white/50 leading-relaxed">
      {t.products.gpucloud.features.items[2].desc}
    </p>
    <div className="absolute bottom-5 right-5 text-white/10 pointer-events-none">
      <Shield className="w-20 h-20 stroke-[1]" />
    </div>
  </motion.div>

  {/* Card 05 — bottom right */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col p-6 min-h-[160px]"
  >
    <div className="text-xs font-mono text-white/30 mb-4">05</div>
    <h4 className="text-xl font-bold text-white mb-2">
      {t.products.gpucloud.features.items[4].title}
    </h4>
    <p className="text-sm text-white/50 leading-relaxed">
      {t.products.gpucloud.features.items[4].desc}
    </p>
    <div className="absolute bottom-5 right-5 text-white/10 pointer-events-none">
      <Activity className="w-16 h-16 stroke-[1]" />
    </div>
  </motion.div>
</div>
```

**Step 2: Add imports at top of file**

Add `Shield, Activity` to the existing lucide-react import:
```tsx
import { ArrowRight, X, Shield, Activity } from 'lucide-react';
```

**Step 3: Add PerspectiveGrid helper component**

Add this above the `GpuCloudContent` function (or below `AgentTerminal`):
```tsx
function PerspectiveGrid() {
  return (
    <div className="absolute bottom-0 right-0 w-[70%] h-[55%] pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-full opacity-[0.12]"
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Horizontal lines with perspective */}
        {[0, 20, 40, 60, 80, 100].map((y, i) => (
          <line
            key={`h${i}`}
            x1={40 + (y / 100) * 60}
            y1={y * 1.2}
            x2={160 - (y / 100) * 60}
            y2={y * 1.2}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
        {/* Vertical lines converging to vanishing point */}
        {[-3, -2, -1, 0, 1, 2, 3].map((x, i) => (
          <line
            key={`v${i}`}
            x1={100 + x * 8}
            y1={0}
            x2={100 + x * 50}
            y2={120}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}
```

**Step 4: Verify layout in browser**

Check on desktop — should match bento grid with:
- Card 01 spanning full left height
- Cards 02/04 on top-right
- Cards 03/05 on bottom-right
- Shield icon on card 03, Activity wave on card 05
- Perspective grid on cards 02 and 04

---

### Task 3: Mobile responsiveness check

**Files:**
- Modify: `components/products-section.tsx` (if needed)

**Step 1: Check mobile layout**

In DevTools, set viewport to 375px. Cards should stack vertically (single column) due to `grid-cols-1`.

**Step 2: Adjust mobile min-heights if cards look too short**

If cards 02–05 appear cramped on mobile, change `min-h-[160px]` to `min-h-[200px]` on those cards.

---

### Task 4: Commit

```bash
git add components/products-section.tsx
git commit -m "feat: redesign features section with bento grid layout"
```
