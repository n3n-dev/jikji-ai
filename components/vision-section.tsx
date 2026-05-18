'use client';

import { motion } from 'motion/react';
import { Database, Cpu, Activity, Boxes, Laptop, MessageSquare, PlugZap, Route, Zap } from 'lucide-react';
import { useI18n } from './i18n-provider';

const diagramGroups = [
  {
    title: 'AI Cloud',
    items: [
      { title: 'GPU Cloud', subtitle: '고성능 GPU 인스턴스', Icon: Cpu },
      { title: 'FuriosaAI NPU', subtitle: '국산 NPU 기반 고효율 연산', Icon: Zap },
      { title: 'Edge Device Cloud', subtitle: '엣지 환경 AI 검증', Icon: Laptop },
    ],
  },
  {
    title: 'AI Infra',
    items: [
      { title: 'Container', subtitle: '컨테이너 기반 실행 환경', Icon: Boxes },
      { title: 'Endpoint', subtitle: 'Serverless API 배포', Icon: PlugZap },
      { title: 'Storage', subtitle: 'AI 특화 스토리지', Icon: Database },
    ],
  },
  {
    title: 'AI Platform',
    items: [
      { title: 'AI Inference', subtitle: 'Serverless MLOps', Icon: Activity },
      { title: 'Agent', subtitle: '대화형 AI 에이전트', Icon: MessageSquare },
      { title: 'MCP', subtitle: 'AI 도구 통합 프로토콜', Icon: Route },
    ],
  },
];

export function VisionSection() {
  const { t } = useI18n();

  return (
    <section
      id="vision"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#0E0E10' }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-4"
        >
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-white leading-[1.1]">
            {t.company.about.title}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-center text-sm md:text-base text-white/40 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {t.company.about.fullstack_desc}
        </motion.p>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative w-full"
        >
          <div className="flex flex-col md:flex-row items-stretch w-full gap-4 md:gap-3 pt-7">
            {diagramGroups.map((group, gi) => (
              <div key={gi} className="contents">
                <div className="flex-1 min-w-0">
                  <div
                    className="vision-card relative w-full h-full rounded-2xl p-4 md:p-5"
                    style={{ ['--vc-delay' as string]: `${gi * 3}s`,
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                      border: '1px solid rgba(255,255,255,0.13)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Title badge — centered, overlapping top border */}
                    <div className="absolute -top-[15px] left-0 right-0 flex justify-center">
                      <span
                        className="px-4 py-1.5 rounded-lg text-[12px] font-semibold text-white/95 whitespace-nowrap"
                        style={{
                          background: '#1A1B1E',
                          border: '1px solid rgba(255,255,255,0.13)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}
                      >
                        {group.title}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5 mt-2">
                      {group.items.map((item, ii) => (
                        <div
                          key={ii}
                          className="flex items-center gap-3 rounded-xl px-3.5 py-3.5"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.09)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                          }}
                        >
                          <div
                            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.10)',
                            }}
                          >
                            <item.Icon className="text-white/70" style={{ width: '18px', height: '18px' }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm md:text-base font-bold text-white leading-snug">{item.title}</p>
                            {item.subtitle && (
                              <p className="text-[11px] md:text-xs text-white/45 leading-snug mt-0.5">{item.subtitle}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {gi < diagramGroups.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 self-center py-1 md:py-0">
                    <svg
                      width="20" height="16" viewBox="0 0 28 22" fill="none"
                      className="rotate-90 md:rotate-0 md:w-7 md:h-[22px]"
                      style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.18))' }}
                    >
                      <path d="M0 7H16V1.5L27.5 11L16 20.5V15H0Z" fill="rgba(255,255,255,0.28)" />
                      <path d="M0 7H16V1.5L27.5 11L16 20.5V15H0Z" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* subtle bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
