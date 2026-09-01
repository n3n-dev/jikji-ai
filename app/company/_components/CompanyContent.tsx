'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import Image from 'next/image';
import {
  FiDatabase,
  FiCpu,
  FiActivity,
  FiCode,
  FiMessageSquare,
  FiPlay,
} from 'react-icons/fi';

// Note: Metadata export is not available in client components
// Consider converting to Server Component or use next/head in the future

export default function CompanyContent() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-black selection:bg-white/30">
      <Header />

      {/* About Section — hidden */}
      <section
        id="about"
        className="hidden pt-32 pb-8 md:pt-48 md:pb-12 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              {t.company.about.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
            >
              {t.company.about.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Full Stack Diagram Section — hidden */}
      <section className="hidden pt-8 pb-20 md:pt-12 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-900/10 rounded-full blur-[140px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div>
            {/* Staircase diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-stretch gap-2 md:gap-3"
            >
              {/* Box 1: AI Infrastructure — bottom */}
              <div className="flex-1 rounded-2xl border border-[#5b4a9a]/40 bg-gradient-to-b from-[#1d1840]/90 to-[#13102a]/90 backdrop-blur-sm p-4 md:p-5">
                <p className="text-xs font-bold text-white mb-3">
                  AI Infrastructure
                </p>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">
                      직지 edge
                      <br />
                      데이터센터
                    </span>
                    <FiDatabase className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80">
                      GPUaaS
                    </span>
                    <FiCpu className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex-shrink-0 flex items-center text-violet-500/40">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" />
                </svg>
              </div>

              {/* Box 2: AI Platform — mid */}
              <div className="flex-1 rounded-2xl border border-[#5b4a9a]/40 bg-gradient-to-b from-[#1d1840]/90 to-[#13102a]/90 backdrop-blur-sm p-4 md:p-5">
                <p className="text-xs font-bold text-white mb-3">AI Platform</p>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">
                      AI & MLOps
                      <br />
                      Platform
                    </span>
                    <FiActivity className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                  <div className="rounded-xl bg-[#2d2560]/60 border border-white/5 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">
                      배포·추론
                      <br />
                      API 서비스
                    </span>
                    <FiCode className="flex-shrink-0 text-violet-400/70 text-lg" />
                  </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex-shrink-0 flex items-center text-violet-500/40">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" />
                </svg>
              </div>

              {/* Box 3: AI Applications — top, with glow */}
              <div className="flex-1 rounded-2xl border border-violet-400/30 bg-gradient-to-b from-[#231f4a]/90 to-[#16133a]/90 backdrop-blur-sm p-4 md:p-5 shadow-[0_0_40px_rgba(139,92,246,0.18)] ring-1 ring-violet-500/20">
                <p className="text-xs font-bold text-white mb-3">
                  AI Applications
                </p>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#342d70]/60 border border-violet-400/10 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">
                      Chat Agent
                      <br />
                      서비스
                    </span>
                    <FiMessageSquare className="flex-shrink-0 text-violet-300/80 text-lg" />
                  </div>
                  <div className="rounded-xl bg-[#342d70]/60 border border-violet-400/10 px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] md:text-xs text-white/80 leading-tight">
                      N3N 영상
                      <br />
                      AI 서비스
                    </span>
                    <FiPlay className="flex-shrink-0 text-violet-300/80 text-lg" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Heritage Section — 지식의 혁신, 그 맥을 잇다 */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex justify-center"
            >
              <div className="relative aspect-square w-4/5 rounded-xl overflow-hidden">
                <Image
                  src="/images/jikjiheritage.jpg"
                  alt="직지 반도체"
                  fill
                  sizes=""
                  unoptimized
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-4/5 mx-auto md:w-full md:mx-0 space-y-4"
            >


              {/* Main headline */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white whitespace-nowrap"
                style={{ fontFamily: "'ChosunIlboMyungjo', serif" }}
              >
                {t.company.about.heritage_title}
              </h2>

              {/* Body */}
              <div className="flex flex-col gap-4">
                {t.company.about.heritage_desc.split('\n').map((line, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg text-white/60 leading-relaxed break-keep"
                  >
                    {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section(추후 추가예정) */}

      <Footer />
    </main>
  );
}
