# Dashboard Glass Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** `DashboardMockAnimation` 컴포넌트를 레퍼런스 이미지처럼 glass 재질 + 사이드바 + 드롭다운 애니메이션으로 리디자인한다.

**Architecture:** `components/ui/animated-feature-card.tsx` 내 `DashboardMockAnimation` 함수만 수정. 카드 wrapper(`AnimatedFeatureCard`)와 다른 variant(`FrameworkAnimation`, `StorageAnimation`)는 건드리지 않는다. Framer Motion variants를 사용해 hover 시 드롭다운 열림 애니메이션을 구현한다.

**Tech Stack:** React, Framer Motion (`motion/react`), Tailwind CSS, inline styles (glass effect)

---

### Task 1: Ambient Glow + Glass Window 컨테이너 교체

**Files:**
- Modify: `components/ui/animated-feature-card.tsx` (DashboardMockAnimation 함수 전체 교체)

**Step 1: DashboardMockAnimation 함수 전체를 아래 코드로 교체**

```tsx
function DashboardMockAnimation({ isHovered }: { isHovered: boolean }) {
  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 0 0px rgba(139,92,246,0)',
    },
    hover: {
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 0 0px rgba(139,92,246,0)',
        '0 0 22px rgba(139,92,246,0.75)',
        '0 0 0px rgba(139,92,246,0)',
      ],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  const dropdownVariants = {
    closed: { scaleY: 0, opacity: 0, transformOrigin: 'top' },
    open: {
      scaleY: 1,
      opacity: 1,
      transformOrigin: 'top',
      transition: { duration: 0.2, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-1 relative">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.22) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Glass window */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-white/20"
        style={{
          background: 'rgba(13, 17, 23, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 52px rgba(0,0,0,0.5)',
        }}
      >
        {/* Titlebar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.08]"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <span className="size-[7px] rounded-full bg-[#FF5F57]" />
          <span className="size-[7px] rounded-full bg-[#FFBD2E]" />
          <span className="size-[7px] rounded-full bg-[#28C840]" />
          <span className="ml-2 text-[9px] font-medium tracking-wide text-white/40">
            Dashboard
          </span>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex">
          {/* Sidebar */}
          <div
            className="flex flex-col items-center gap-2.5 px-1.5 py-2.5 border-r border-white/[0.06]"
            style={{ minWidth: 28, background: 'rgba(255,255,255,0.015)' }}
          >
            <div className="w-3 h-0.5 rounded-full bg-white/25" />
            <div className="w-3 h-0.5 rounded-full bg-white/15" />
            <div className="w-3 h-0.5 rounded-full bg-white/15" />
            <div className="w-3 h-0.5 rounded-full bg-white/15" />
            <div className="mt-auto size-1.5 rounded-full bg-white/20" />
          </div>

          {/* Main content */}
          <div className="flex-1 px-2 pt-2 pb-2 flex flex-col gap-1.5 relative">
            {/* GPU Type */}
            <div
              className="relative flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-[9px] text-white/50">GPU Type</span>
              <div
                className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-white/10"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-[9px] text-white font-medium">A100</span>
                <span className="text-white/30 text-[7px] leading-none">▼</span>
              </div>

              {/* Dropdown (hover 시 열림) */}
              <motion.div
                variants={dropdownVariants}
                initial="closed"
                animate={isHovered ? 'open' : 'closed'}
                className="absolute right-2 z-10 rounded-lg overflow-hidden border border-white/15"
                style={{
                  top: 'calc(100% + 3px)',
                  minWidth: 72,
                  background: 'rgba(20, 24, 35, 0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1.5"
                  style={{ background: 'rgba(99,102,241,0.15)' }}
                >
                  <span className="size-1 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-[9px] text-white font-medium">A100</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5">
                  <span className="size-1 rounded-full bg-transparent shrink-0" />
                  <span className="text-[9px] text-white/50">H100</span>
                </div>
              </motion.div>
            </div>

            {/* Instance Count */}
            <div
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-[9px] text-white/50">Instance Count</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-[22px] h-3 rounded-full relative flex items-center px-0.5"
                  style={{ background: '#6366f1' }}
                >
                  <div className="size-2 rounded-full bg-white ml-auto" />
                </div>
                <span className="text-[9px] text-white/60 w-3">1</span>
              </div>
            </div>

            {/* Region */}
            <div
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-[9px] text-white/50">Region</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-[22px] h-3 rounded-full relative flex items-center px-0.5"
                  style={{ background: '#6366f1' }}
                >
                  <div className="size-2 rounded-full bg-white ml-auto" />
                </div>
                <span className="text-[9px] text-white/60 w-8 truncate">Region</span>
              </div>
            </div>

            {/* One-Click SSH Deployment button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              className="w-full mt-0.5 py-1.5 rounded-lg text-[9px] font-semibold text-white flex items-center justify-center gap-1.5"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              }}
            >
              <FiTerminal className="size-2.5 shrink-0" />
              <span>One-Click SSH Deployment</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: 개발 서버 실행 후 시각 확인**

```bash
npm run dev
```

브라우저에서 products 섹션 → GPU Cloud 카드 1 확인:
- glass 배경 (반투명 + blur)
- 사이드바 visible
- hover 시 드롭다운 열림
- 버튼 pulse glow

**Step 3: 빌드 오류 없음 확인**

```bash
npm run build
```

Expected: 오류 없음

**Step 4: Commit**

```bash
git add components/ui/animated-feature-card.tsx docs/plans/
git commit -m "feat: redesign DashboardMockAnimation with glass effect, sidebar, and dropdown animation"
```
