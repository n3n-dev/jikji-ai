'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  KeyRound,
  Lock,
  Plug,
  RefreshCw,
  Search,
  Server,
  Shield,
  Sparkles,
  Video,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

type Category = {
  id: string;
  label: string;
};

type Product = {
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
  badge?: 'Update' | 'BETA' | 'New' | '준비중';
  featured?: boolean;
};

const featuredCategory = 'featured';

const categories: Category[] = [
  { id: featuredCategory, label: 'Featured' },
  { id: 'compute', label: 'Compute' },
  { id: 'ai-platform', label: 'AI Platform' },
  { id: 'mlops', label: 'MLOps' },
  { id: 'storage', label: 'Storage' },
  { id: 'networking', label: 'Networking' },
  { id: 'tools', label: 'Tools' },
  { id: 'security', label: 'Security' },
  { id: 'data-analytics', label: 'Data & Analytics' },
  { id: 'media-intelligence', label: 'Media Intelligence' },
  { id: 'infrastructure', label: 'Infrastructure' },
];

const products: Product[] = [
  {
    name: 'GPU Instance',
    category: 'compute',
    description: '클라우드 환경에서 NVIDIA GPU 서버를 빠르게 생성하고 확장하는 서비스',
    icon: Cpu,
    badge: 'Update',
    featured: true,
  },
  {
    name: '퓨리오사AI NPU',
    category: 'compute',
    description: '국산 AI 반도체 기반의 고효율 추론 워크로드 실행 환경',
    icon: BrainCircuit,
    badge: '준비중',
  },
  {
    name: 'Bare Metal GPU',
    category: 'compute',
    description: '전용 물리 서버 기반의 고성능 학습 및 추론 워크로드 실행 환경',
    icon: Server,
    badge: '준비중',
    featured: true,
  },
  {
    name: 'GPU Kubernetes Cluster',
    category: 'compute',
    description: '컨테이너 기반 AI 워크로드를 위한 GPU 클러스터 오케스트레이션',
    icon: Boxes,
    badge: '준비중',
  },
  {
    name: 'AI Inference',
    category: 'mlops',
    description: '모델을 배포하면 자동으로 확장되는 추론 API 엔드포인트 서비스',
    icon: Workflow,
    badge: 'Update',
    featured: true,
  },
  {
    name: 'Model Registry',
    category: 'mlops',
    description: '모델 버전, 아티팩트, 배포 이력을 안전하게 관리하는 저장소',
    icon: Database,
  },
  {
    name: 'AI Agent Studio',
    category: 'ai-platform',
    description: '사내 데이터와 도구를 연결해 업무용 에이전트를 설계하는 개발 도구',
    icon: Bot,
    badge: 'BETA',
    featured: true,
  },
  {
    name: 'Object Storage',
    category: 'storage',
    description: '대용량 데이터셋과 모델 아티팩트를 위한 확장형 오브젝트 스토리지',
    icon: Cloud,
    badge: 'Update',
  },
  {
    name: 'File Storage',
    category: 'storage',
    description: '학습 노드와 추론 서비스에서 공유 가능한 고성능 파일 스토리지',
    icon: HardDrive,
  },
  {
    name: 'Load Balancer',
    category: 'networking',
    description: '외부 트래픽을 안정적으로 분산하고 서비스 가용성을 높이는 네트워크 도구',
    icon: Workflow,
  },
  {
    name: 'MCP 지원',
    category: 'tools',
    description: '외부 도구와 AI 에이전트가 안전하게 연결되도록 지원하는 MCP 연동 기능',
    icon: Plug,
    badge: 'BETA',
  },
  {
    name: 'API Key',
    category: 'tools',
    description: '외부 서비스 연동과 자동화를 위한 API 키를 발급하고 관리하는 도구',
    icon: KeyRound,
    badge: 'New',
  },
  {
    name: 'Firewall Policy',
    category: 'security',
    description: '인바운드와 아웃바운드 접근 규칙을 세밀하게 제어하는 보안 정책',
    icon: Shield,
    badge: 'Update',
  },
  {
    name: 'Secret Vault',
    category: 'security',
    description: 'API 키, 토큰, 인증 정보를 암호화해 안전하게 보관하고 주입',
    icon: Lock,
  },
  {
    name: 'Monitoring',
    category: 'data-analytics',
    description: 'GPU 사용률, 지연 시간, 로그와 알림을 통합 관측하는 운영 대시보드',
    icon: Activity,
    badge: 'New',
    featured: true,
  },
  {
    name: 'Cost Analytics',
    category: 'data-analytics',
    description: '워크로드별 사용량과 비용 추이를 분석해 예산 운영을 지원',
    icon: Gauge,
  },
  {
    name: 'Video Intelligence',
    category: 'media-intelligence',
    description: '대규모 영상 데이터를 실시간 분석해 현장 이벤트와 인사이트를 추출',
    icon: Video,
    featured: true,
  },
  {
    name: 'Pixel On Demand',
    category: 'media-intelligence',
    description: '필요한 화소만 선택 전송해 영상 분석 대역폭과 처리 비용을 최적화',
    icon: Sparkles,
  },
  {
    name: 'Colocation',
    category: 'infrastructure',
    description: '고밀도 AI 서버를 위한 상면, 전력, 냉각, 운영 관제 서비스',
    icon: Server,
  },
  {
    name: 'Private Modular DC',
    category: 'infrastructure',
    description: 'AI 워크로드에 최적화된 모듈러 데이터센터 설계와 구축 서비스',
    icon: Cloud,
    badge: 'New',
  },
];

function getCategoryLabel(categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.label ?? categoryId;
}

function ProductBadge({ badge }: { badge?: Product['badge'] }) {
  if (!badge) return null;

  const className =
    badge === '준비중'
      ? 'border border-white/15 bg-white/10 text-white/65'
      : badge === 'BETA'
      ? 'border border-[#9F7A5E]/45 bg-[#9F7A5E]/15 text-[#E7C6AB]'
      : 'bg-[#5EA5EA] text-[#020617]';

  return (
    <span className={`rounded px-1.5 py-0.5 text-[11px] font-bold leading-none ${className}`}>
      {badge}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <a
      href="https://jikjicloud.io/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[236px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#151515] p-7 text-left transition-colors hover:border-[#9F7A5E]/45 focus:outline-none focus:ring-2 focus:ring-[#9F7A5E]/35"
      style={{
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.22)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_80%_65%_at_50%_-20%,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_45%,transparent_72%)]" />
      <div className="flex items-start justify-between gap-4">
        <Icon className="relative h-8 w-8 stroke-[2.3] text-[#E4E4E7]" aria-hidden="true" />
        <ProductBadge badge={product.badge} />
      </div>
      <div className="relative mt-8 flex-1">
        <h3 className="text-[21px] font-bold leading-tight text-white">{product.name}</h3>
        <p className="mt-3 text-[15px] leading-7 text-white/55">{product.description}</p>
      </div>
      <div className="relative mt-8 flex justify-end">
        <ArrowRight
          className="h-6 w-6 text-white/35 transition-colors group-hover:text-[#E7C6AB]"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}

export function ProductCatalog() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([featuredCategory]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        getCategoryLabel(product.category).toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category) ||
        (selectedCategories.includes(featuredCategory) && product.featured);

      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategories]);

  const groupedProducts = useMemo(() => {
    const groupedSource = selectedCategories.includes(featuredCategory)
      ? visibleProducts.filter((product) => !product.featured)
      : visibleProducts;

    return categories
      .filter((category) => category.id !== featuredCategory)
      .map((category) => ({
        ...category,
        products: groupedSource.filter((product) => product.category === category.id),
      }))
      .filter((group) => group.products.length > 0);
  }, [selectedCategories, visibleProducts]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((selected) => selected !== categoryId)
        : [...current, categoryId],
    );
  };

  const resetCatalog = () => {
    setQuery('');
    setSelectedCategories([featuredCategory]);
  };

  return (
    <section
      className="min-h-screen pt-[72px] text-white"
      style={{
        background:
          'linear-gradient(180deg, #0E0E10 0%, #0A0A0C 58%, #0C0C0E 100%)',
      }}
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-[96px] max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg border border-white/10 bg-[#111113]/70 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">서비스 카테고리</h2>
              <button
                type="button"
                onClick={resetCatalog}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#1A1B1E] text-white/70 transition-colors hover:border-[#9F7A5E]/35 hover:text-white"
                aria-label="카탈로그 초기화"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center gap-3 text-[15px] text-white/65 transition-colors hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="h-4 w-4 rounded border-white/25 bg-transparent accent-[#9F7A5E]"
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 flex flex-col gap-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="검색어를 입력해 주세요"
                className="h-12 w-full rounded-md border border-white/10 bg-[#151515] px-4 pr-12 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#9F7A5E]/50"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              />
            </div>

            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`h-9 shrink-0 rounded-md border px-3 text-sm font-medium ${
                    selectedCategories.includes(category.id)
                      ? 'border-[#9F7A5E]/45 bg-[#9F7A5E]/15 text-[#E7C6AB]'
                      : 'border-white/10 bg-[#151515] text-white/60'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <p className="text-[17px] font-bold text-white">
              총 {visibleProducts.length}개의 서비스가 있습니다.
            </p>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#151515] text-white/50">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="space-y-12">
              {selectedCategories.includes(featuredCategory) && (
                <section id="featured" className="scroll-mt-28">
                  <div className="mb-5 flex items-center gap-4">
                    <Sparkles className="h-10 w-10 fill-[#00c4cc] stroke-[#00c4cc]" />
                    <h1 className="text-3xl font-bold tracking-normal text-white">
                      Featured
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {visibleProducts
                      .filter((product) => product.featured)
                      .map((product) => (
                        <ProductCard key={`${product.category}-${product.name}`} product={product} />
                      ))}
                  </div>
                </section>
              )}

              {groupedProducts.map((group) => (
                <section key={group.id} id={group.id} className="scroll-mt-28">
                  <h2 className="mb-5 text-2xl font-bold tracking-normal text-white">
                    {group.label} ({group.products.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {group.products.map((product) => (
                      <ProductCard key={`${group.id}-${product.name}`} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
