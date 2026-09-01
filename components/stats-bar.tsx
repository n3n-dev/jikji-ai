'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';

export function StatsBar() {
  const { t } = useI18n();
  const stats = t.infrastructure.region.cluster.stats;

  return (
    <section className="border-t border-white/5 bg-[#01071B]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.value}
                <span className="text-[#5572E2] ml-1 text-xl md:text-2xl font-semibold">
                  {stat.label.split(' ')[0]}
                </span>
              </div>
              <div className="text-xs text-white/40 mt-1 leading-relaxed">
                {stat.desc}
              </div>
              {/* Divider — only between items on desktop */}
              <div className="hidden md:block absolute right-0 top-2 bottom-2 w-px bg-white/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
