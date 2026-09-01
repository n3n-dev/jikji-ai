'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

export type AnimatedFeatureCardVariant = 'oneclick' | 'framework' | 'storage';

type Props = {
  variant: AnimatedFeatureCardVariant;
  cardTitle: string;
  cardDescription: string;
};

const thumbnailMap: Record<AnimatedFeatureCardVariant, string> = {
  oneclick: '/images/feature-oneclick.png',
  framework: '/images/feature-framework.png',
  storage: '/images/feature-storage.png',
};

/* ── Main exported component ── */
export function AnimatedFeatureCard({
  variant,
  cardTitle,
  cardDescription,
}: Props) {
  return (
    <motion.div
      whileHover={{
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.18), 0 0 28px rgba(255,255,255,0.07)',
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex flex-col',
        'h-[22.4rem] w-full overflow-hidden',
        'rounded-2xl',
      )}
      style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 0 rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Top light reflection */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none rounded-t-2xl"
        style={{
          height: '55%',
          background:
            'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)',
        }}
      />

      {/* Top: title + description */}
      <div className="relative z-10 px-6 pt-6 pb-5 border-b border-white/[0.08] shrink-0">
        <div className="text-base font-bold text-white">{cardTitle}</div>
        <div className="mt-1 text-sm leading-relaxed text-white/50">
          {cardDescription}
        </div>
      </div>

      {/* Bottom: thumbnail area */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={thumbnailMap[variant]}
          alt={cardTitle}
          fill
          className="object-contain p-6"
        />
      </div>
    </motion.div>
  );
}
