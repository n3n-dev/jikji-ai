'use client';

import { useI18n } from './i18n-provider';
import { SectionHeader } from './section-header';
import { FeatureCard } from './feature-card';
import { Database, Zap, ShieldCheck } from 'lucide-react';

const icons = [Database, Zap, ShieldCheck];

export function Features() {
  const { t } = useI18n();

  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden bg-[#01071B] border-t border-white/5"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.features.title}
          subtitle={t.features.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.features.items.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              description={item.description}
              icon={icons[index]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
