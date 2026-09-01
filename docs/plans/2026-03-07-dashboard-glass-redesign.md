# Dashboard Glass Redesign

**Date:** 2026-03-07
**File:** `components/ui/animated-feature-card.tsx`
**Scope:** `DashboardMockAnimation` 컴포넌트만 수정

## Goal

`oneclick` 카드 내 대시보드 썸네일을 레퍼런스 이미지처럼 glass 재질로 리디자인.

## Design

### Visual Structure

- **Ambient glow**: window 뒤에 purple radial-gradient blur (외부 glow)
- **Glass window**:
  - `background: rgba(13, 17, 23, 0.65)` + `backdrop-filter: blur(24px)`
  - `border: 1px solid rgba(255,255,255,0.2)`
  - `box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 52px rgba(0,0,0,0.5)`
- **Layout**: 좌측 사이드바(24px) + 우측 메인 콘텐츠

### Components

| 요소 | 스펙 |
|------|------|
| Titlebar | `● ● ●` macOS dots + "Dashboard" 텍스트 |
| Sidebar | 4개 아이콘 형태 rect (white/20), 1개 active dot |
| GPU Type row | `[A100 ▼]` 드롭다운 |
| Instance Count row | 인디고 토글 + "1" |
| Region row | 인디고 토글 + "Region" |
| Button | `One-Click SSH Deployment` gradient + pulse glow |

### Animations

- **idle**: 버튼 pulse glow (기존 유지)
- **hover enter**: GPU 드롭다운 `scaleY: 0 → 1` 열림, A100 하이라이트
- **hover leave**: 드롭다운 닫힘

## Implementation

1. `DashboardMockAnimation` 내부 구조를 사이드바 포함한 2-column 레이아웃으로 변경
2. Window 컨테이너에 glass 스타일 적용
3. Ambient glow div 추가
4. Hover 시 dropdown 열리는 motion 추가
