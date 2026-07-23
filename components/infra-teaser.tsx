'use client';

import { motion } from 'motion/react';
import { useI18n } from './i18n-provider';
import { SeoulDottedMap } from './seoul-dotted-map';
import Image from 'next/image';

export function InfraTeaser() {
  const { t, locale } = useI18n();
  const cluster = t.infrastructure.region.cluster;
  // 숨기자 (임시): 인프라 서비스 카드 영역
  const showServicesGrid = false;

  return (
    <>
      {/* Map + Stats Section */}
      <section
        id="infrastructure"
        className="pt-24 pb-14 relative overflow-hidden border-t border-white/5"
        style={{
          background:
            'linear-gradient(180deg, #0E0E10 0%, #0a0a0c 60%, #0c0c0e 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-24 w-[500px] h-[500px] opacity-8 mix-blend-overlay rounded-full blur-3xl"
            style={{ background: '#C9A84C' }}
          />
          <div className="absolute left-[5%] top-0 w-[400px] h-[500px] mix-blend-overlay overflow-hidden">
            <div
              className="absolute left-16 -top-24 w-64 h-[500px] opacity-5 rounded-full blur-3xl"
              style={{ background: '#D49D73' }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Map with overlaid title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Title overlay - top-left */}
              <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white"
                >
                  {cluster.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm text-white/50 font-normal"
                >
                  {cluster.subtitle}
                </motion.p>
              </div>
              <div style={{ perspective: '580px' }}>
                <div style={{ transform: 'rotateX(46deg)', transformOrigin: 'center 60%' }}>
                  <SeoulDottedMap className="w-full max-w-lg mx-auto" locale={locale} />
                </div>
              </div>
            </motion.div>

            {/* Stats + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {cluster.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-2xl p-5 flex flex-col justify-between min-h-[140px]"
                    style={{
                      background:
                        'linear-gradient(180deg, #1A1B1E 0%, #131416 100%)',
                      border: '1px solid rgba(227,229,232,0.08)',
                      boxShadow: 'inset 0 1px 0 rgba(227,229,232,0.06)',
                    }}
                  >
                    <div className="text-xs text-white/50">{stat.desc}</div>
                    <div className="flex flex-col items-end">
                      <span className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-medium text-white/60 mt-0.5 text-right whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA below both columns */}
          {/* <div className="flex justify-center mt-12">
            <Link
              href="https://forms.gle/2hcY59NMnXeYeJKQ6"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-base transition-colors"
            >
              AI Infrastructure 문의하기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div> */}
        </div>
      </section>

      {/* AI DC #1 Specs */}
      <section
        className="py-24 border-t border-white/5"
        style={{
          background: 'linear-gradient(180deg, #0a0a0c 0%, #0c0c0e 100%)',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Left: title + 2x2 grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center md:justify-start mb-4">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(159,122,94,0.1)', border: '1px solid rgba(212,157,115,0.3)', color: '#D4A574' }}>
                  {t.infrastructure.aidc.badge}
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 pb-6 text-white text-center md:text-left">
                {t.infrastructure.aidc.title}
              </h2>
              {/* <p className="text-base text-white/50 mb-10 text-center md:text-left">
                {t.infrastructure.aidc.subtitle}
              </p> */}
              <div className="grid grid-cols-2 gap-4">
                {t.infrastructure.aidc.specs.map((spec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="relative rounded-2xl p-5 overflow-hidden flex flex-col"
                    style={{
                      background:
                        'linear-gradient(180deg, #1A1B1E 0%, #131416 100%)',
                      border: '1px solid rgba(227,229,232,0.08)',
                      boxShadow: 'inset 0 1px 0 rgba(227,229,232,0.06)',
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 pointer-events-none rounded-t-2xl"
                      style={{
                        height: '55%',
                        background:
                          'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 45%, transparent 70%)',
                      }}
                    />
                    <div
                      className="relative z-10 text-xs font-mono mb-2"
                      style={{ color: '#9F7A5E' }}
                    >
                      {spec.index}
                    </div>
                    <h4 className="relative z-10 text-base font-bold text-white mb-2">
                      {spec.title}
                    </h4>
                    {(() => {
                      const renderLines = (text: string) =>
                        text.split('\n').map((line, i) => {
                          if (line.startsWith('• '))
                            return (
                              <div key={i} className="flex items-start gap-1.5">
                                <span
                                  className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                                  style={{ background: '#9F7A5E' }}
                                />
                                <span
                                  className="text-xs leading-snug"
                                  style={{ color: '#8E9399' }}
                                >
                                  {line.slice(2)}
                                </span>
                              </div>
                            );
                          if (line.startsWith('**'))
                            return (
                              <p
                                key={i}
                                className="text-xs md:text-sm leading-snug font-semibold text-white"
                                style={{ color: '#8e9399' }}
                              >
                                {line.slice(2)}
                              </p>
                            );
                          if (line === '')
                            return <div key={i} className="h-1" />;
                          return (
                            <p key={i} className="text-xs md:text-sm leading-snug" style={{ color: '#8e9399' }}>{line}</p>
                          );
                        });
                      const parts = spec.desc.split('\n---\n');
                      if (parts.length === 1)
                        return (
                          <div className="relative z-10 space-y-0.5">
                            {renderLines(parts[0])}
                          </div>
                        );
                      return (
                        <>
                          <div className="relative z-10 space-y-0.5 mb-3">
                            {renderLines(parts[0])}
                          </div>
                          <div
                            className="-mx-5 border-t"
                            style={{ borderColor: 'rgba(227,229,232,0.08)' }}
                          />
                          <div
                            className="relative z-10 -mx-5 -mb-5 px-5 pb-5 pt-3 space-y-0.5 flex-1 flex flex-col justify-center"
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(227,229,232,0.015) 0%, transparent 100%)',
                            }}
                          >
                            {renderLines(parts[1])}
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: AI DC image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />
              <div
                className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(227,229,232,0.08)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
                  maskImage:
                    'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
                }}
              >
                <Image
                  src="/images/jikjidc.jpg"
                  alt="직지 AI DC"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {showServicesGrid && (
        <section
          className="pt-8 pb-24 border-t border-white/5"
          style={{
            background:
              'linear-gradient(180deg, #0c0c0e 0%, #0E0E10 50%, #0a0a0c 100%)',
          }}
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b break-keep from-white to-white/60"
              >
                {t.infrastructure.region.title}
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {t.infrastructure.region.services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative rounded-2xl p-6 overflow-hidden flex flex-col"
                  style={{
                    background:
                      'linear-gradient(180deg, #1A1B1E 0%, #131416 100%)',
                    border: '1px solid rgba(227,229,232,0.08)',
                    boxShadow: 'inset 0 1px 0 rgba(227,229,232,0.06)',
                  }}
                >
                  <h3 className="relative z-10 text-base font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <p
                    className="relative z-10 text-xs mb-4"
                    style={{ color: '#8E9399' }}
                  >
                    {service.subtitle}
                  </p>
                  <ul className="relative z-10 space-y-2.5">
                    {service.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="text-xs flex items-start gap-2"
                      >
                        <div
                          className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                          style={{ background: '#9F7A5E' }}
                        />
                        <span
                          className="leading-relaxed"
                          style={{ color: '#8E9399' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enterprise Isolation / PMDC Section */}
      <section
        id="isolation"
        className="py-24 border-t border-white/5"
        style={{
          background:
            'linear-gradient(180deg, #0a0a0c 0%, #0c0c0e 50%, #0E0E10 100%)',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Centered header — Products style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-white/60">
              {t.infrastructure.isolation.tag}
            </div>
            <h2 className="text-3xl md:text-[48px] font-bold leading-tight text-white max-w-3xl">
              {t.infrastructure.isolation.title}
            </h2>
            <p className="text-base md:text-lg text-white/50">
              {t.infrastructure.isolation.subtitle}
            </p>
          </motion.div>

          {/* Two-column: image + cards */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Left: Product image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
              }}
            >
              <Image
                src="/images/pmdc.png"
                alt="JIKJI PMDC"
                fill
                className="object-cover object-center"
              />
            </motion.div>

            {/* Right: Feature cards */}
            <div className="grid grid-cols-2 gap-4 content-start">
              {t.infrastructure.isolation.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`relative rounded-2xl p-6 overflow-hidden flex flex-col gap-3${idx === 4 ? ' col-span-2' : ''}`}
                  style={{
                    background: 'linear-gradient(180deg, #1A1B1E 0%, #131416 100%)',
                    border: '1px solid rgba(227,229,232,0.08)',
                    boxShadow: 'inset 0 1px 0 rgba(227,229,232,0.06)',
                  }}
                >
                  <div className="relative z-10">
                    <h3 className="text-base font-bold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8E9399' }}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {/* <div className="flex justify-center">
            <Link
              href="https://forms.gle/2hcY59NMnXeYeJKQ6"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-base transition-colors"
            >
              {t.infrastructure.isolation.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div> */}
        </div>
      </section>
    </>
  );
}
