'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';
import { useRouter } from 'next/navigation';
import { ShinyButton } from './ui/shiny-button';

export function CTABanner() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <section id="contact" className="py-24 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Title — single line */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 whitespace-nowrap">
            {t.cta_banner.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-500 font-light mb-10">
            {t.cta_banner.subtitle}
          </p>

          {/* Single button */}
          <div className="flex items-center justify-center mb-8">
            <ShinyButton
              className="!py-3 !px-8 !text-base"
              // onClick={() => router.push('/support')}
              onClick={() => router.push('https://forms.gle/2hcY59NMnXeYeJKQ6')}
            >
              {t.cta_banner.btn_inquiry}
            </ShinyButton>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">
            {t.cta_banner.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
