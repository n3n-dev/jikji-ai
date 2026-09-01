'use client';

import { useI18n } from './i18n-provider';
import { motion } from 'motion/react';
import NeuralBackground from './ui/flow-field-background';
import Link from 'next/link';

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative pt-36 pb-0 md:pt-48 md:pb-0 overflow-hidden"
      style={{
        background: '#0E0E10',
      }}
    >
      {/* Wave animation background — full bleed */}
      <div className="absolute inset-0" style={{ opacity: 0.55 }}>
        <NeuralBackground
          color="#928a72"
          colorEnd="#413934"
          trailOpacity={0.08}
          particleCount={510}
          speed={0.35}
          flowScale={0.002}
        />
      </div>

      {/* Subtle darkening overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14,14,16,0.25) 0%, rgba(14,14,16,0.45) 80%, #0E0E10 100%)',
        }}
      />

      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gold glow - center top */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[-125px] w-[572px] h-[572px] mix-blend-overlay rounded-full blur-3xl"
          style={{ background: '#ffe7a3', opacity: 0.13 }}
        />
        {/* Gold streak */}
        <div className="absolute left-[420px] top-[120px] w-44 h-32 mix-blend-overlay overflow-hidden">
          <div
            className="absolute left-[52px] top-[42px] w-20 h-6 origin-top-left rotate-[15deg] opacity-20 rounded-full blur-sm"
            style={{ background: '#928a72' }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-0 relative z-10 text-center flex flex-col items-center">
        {/* badge hidden */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-2 leading-relaxed font-normal"
          style={{ color: '#ffffff' }}
        >
          {t.hero.description}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[32px] md:text-7xl lg:text-[80px] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-10 max-w-5xl mx-auto leading-[1.1] whitespace-normal"
        >
          {t.hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-12 flex flex-row items-center justify-center gap-3 md:gap-4"
        >
          <Link
            href="https://forms.gle/2hcY59NMnXeYeJKQ6"
            className="inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-3.5 rounded-[10px] bg-white hover:bg-white/90 text-black font-semibold text-sm md:text-base transition-colors"
            target="_blank"
          >
            {t.hero.cta_primary}
          </Link>
          {/* cta_secondary hidden */}
        </motion.div>
      </div>
    </section>
  );
}
