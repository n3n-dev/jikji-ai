'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { ArrowRight, Server, Zap, Database, Settings, type LucideIcon } from 'lucide-react';

const oneclickIcons: LucideIcon[] = [Server, Settings, Database];

export default function ProductsPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[#01071B] selection:bg-white/30">
      <Header />
      
      {/* GPU Cloud Section */}
      <section id="gpucloud" className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
            >
              {t.products.gpucloud.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/60"
            >
              {t.products.gpucloud.contact}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#151C32] rounded-3xl p-8 border border-white/10 h-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 mb-8">
                GPU CLOUD INSTANCE
              </div>
              <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                {t.products.gpucloud.features.title}
              </h2>
              
              <div className="space-y-8">
                {t.products.gpucloud.features.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#151C32] rounded-3xl p-8 border border-white/10 h-full flex flex-col"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 text-center">
                {t.products.gpucloud.oneclick.title}
              </h2>
              <p className="text-center text-white/60 mb-12">
                {t.products.gpucloud.oneclick.subtitle}
              </p>

              <div className="grid gap-6 flex-1">
                {t.products.gpucloud.oneclick.items.map((item, idx) => (
                  <div key={idx} className="bg-black/50 rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center group hover:bg-white/5 transition-colors">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {(() => { const Icon = oneclickIcons[idx]; return <Icon className="w-8 h-8 text-indigo-400" />; })()}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-24 bg-black border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* AI Inference Platform */}
          <div className="mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-sm font-medium text-indigo-300 mb-6">
                AI INFERENCE
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight whitespace-pre-line">
                {t.products.platform.inference.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.products.platform.inference.features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#151C32] rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enterprise AI Agents */}
          <div className="mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-sm font-medium text-emerald-300 mb-6">
                CHAT AGENT
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                {t.products.platform.agents.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.products.platform.agents.features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#151C32] rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* N3N Video AI Platform */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                {t.products.platform.video.title}
              </h2>
              <div className="inline-block bg-white/10 px-6 py-3 rounded-lg border border-white/20 text-xl font-medium text-white/90">
                {t.products.platform.video.subtitle}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.products.platform.video.features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-white/10 text-black group hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <ArrowRight className="w-5 h-5 text-black/30 group-hover:text-black transition-colors" />
                  </div>
                  <p className="text-black/60 text-sm leading-relaxed whitespace-pre-line font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
