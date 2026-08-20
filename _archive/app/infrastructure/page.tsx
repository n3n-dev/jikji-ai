'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { Server, Database, Cloud, Shield, Cpu, type LucideIcon } from 'lucide-react';
import { SeoulDottedMap } from '@/components/seoul-dotted-map';

const isolationIcons: LucideIcon[] = [Shield, Database, Cloud, Cpu];

export default function InfrastructurePage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black/10">
      <Header />

      {/* Dark map section */}
      <section
        id="region"
        className="pt-32 pb-24 relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(180deg, #151C32 0%, #01071B 100%)' }}
      >
        {/* Decorative overlays */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Green blob — left */}
          <div className="w-[691px] h-[818px] absolute left-[7%] top-0 mix-blend-overlay overflow-hidden">
            <div className="w-96 h-[882px] absolute left-[128px] -top-48 opacity-10 bg-green-200" />
          </div>
          {/* Pink blob — right */}
          <div className="w-[519px] h-[724px] absolute right-[0%] top-0 mix-blend-overlay overflow-hidden">
            <div className="w-80 h-[684px] absolute left-[99px] -top-[59px] opacity-20 bg-pink-200" />
          </div>
          {/* White streak — center */}
          <div className="w-44 h-32 absolute left-[29%] top-[120px] mix-blend-overlay overflow-hidden">
            <div className="w-20 h-6 absolute left-[52px] top-[42px] origin-top-left rotate-[15deg] opacity-40 bg-white" />
          </div>
          {/* White blur accent — right center */}
          <div className="w-28 h-9 absolute left-[72%] top-[400px] origin-top-left -rotate-[25deg] opacity-5 mix-blend-overlay bg-white rounded-[55px] blur-lg" />
          {/* Cyan glow — top center */}
          <div className="w-[572px] h-[572px] absolute left-[calc(50%-286px)] -top-[125px] opacity-20 mix-blend-overlay bg-cyan-200 rounded-full blur-3xl" />
          {/* Globe outline rings */}
          <div className="w-[1911px] h-[1698px] absolute -left-[628px] -top-[342px] opacity-10 outline outline-1 outline-offset-[-0.5px] outline-white rounded-full" />
          <div className="w-[1600px] h-[1420px] absolute left-[calc(50%-800px)] -top-[200px] opacity-5 outline outline-1 outline-offset-[-0.5px] outline-white rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center -mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {t.infrastructure.region.cluster.title}
            </h2>
            <p className="text-xl text-white/60">
              {t.infrastructure.region.cluster.subtitle}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <SeoulDottedMap
              className="w-full max-w-2xl"
              campusLabel={t.infrastructure.region.cluster.campus_label}
              openingLabel={t.infrastructure.region.cluster.opening_label}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.infrastructure.region.cluster.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-sm text-white/60 mb-2">{stat.desc}</div>
                <div className="text-4xl md:text-6xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Light content section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
            >
              {t.infrastructure.region.title}
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {t.infrastructure.region.services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-black/5"
              >
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-black/60 mb-6 h-10">{service.subtitle}</p>
                <ul className="space-y-3">
                  {service.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm font-medium flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5572E2] mt-1.5 shrink-0" />
                      <span className="text-black/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Isolation Section */}
      <section id="isolation" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                {t.infrastructure.isolation.title}
              </h2>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                {t.infrastructure.isolation.subtitle}
              </p>
              <p className="text-xl font-semibold text-[#5572E2] mb-12">
                {t.infrastructure.isolation.desc}
              </p>

              <div className="space-y-8">
                {t.infrastructure.isolation.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5572E2]/10 flex items-center justify-center shrink-0">
                      {(() => { const Icon = isolationIcons[idx]; return <Icon className="w-6 h-6 text-[#5572E2]" />; })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-black/60 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <div className="relative inline-flex rounded-full p-[1px] overflow-hidden">
                  {/* Spinning conic gradient border */}
                  <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E1E3EE_0%,#5572E2_50%,#E1E3EE_100%)]" />
                  <a
                    href="mailto:business@jikji.ai"
                    className="relative z-10 inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all bg-zinc-950 bg-gradient-to-tr from-zinc-300/5 via-[#5572E2]/20 to-transparent hover:from-zinc-300/10 hover:via-[#5572E2]/30"
                  >
                    {t.infrastructure.isolation.cta}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-black/5 rounded-3xl overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                {/* Placeholder for PMDC image */}
                <div className="text-center">
                  <Server className="w-24 h-24 text-black/20 mx-auto mb-4" />
                  <span className="text-black/40 font-medium text-lg">PMDC Container Image</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
