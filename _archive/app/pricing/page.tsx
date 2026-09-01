'use client';

import { useI18n } from '@/components/i18n-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'b200' | 'h200' | 'h100' | 'rtx'>('b200');

  const tabs = [
    { id: 'b200', label: t.pricing_page.tabs.b200 },
    { id: 'h200', label: t.pricing_page.tabs.h200 },
    { id: 'h100', label: t.pricing_page.tabs.h100 },
    { id: 'rtx', label: t.pricing_page.tabs.rtx },
  ] as const;

  const currentData = t.pricing_page.table[activeTab];

  return (
    <main className="min-h-screen bg-[#01071B] selection:bg-white/30 flex flex-col">
      <Header />
      
      <section className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
            >
              {t.pricing_page.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light"
            >
              {t.pricing_page.subtitle}
            </motion.p>
          </div>

          {/* Pricing Table Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-24"
          >
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-[#111] p-1 rounded-xl border border-white/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-black shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#01071B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      {t.pricing_page.table.headers.map((header, idx) => (
                        <th key={idx} className="px-6 py-4 text-sm font-medium text-white/70 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {currentData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-5 text-sm font-medium text-white whitespace-nowrap">
                          {row.name}
                        </td>
                        <td className="px-6 py-5 text-sm text-white/60 whitespace-nowrap">
                          {row.vram}
                        </td>
                        <td className="px-6 py-5 text-sm text-white/60 whitespace-nowrap">
                          {row.vcpu}
                        </td>
                        <td className="px-6 py-5 text-sm text-white/90 font-mono whitespace-nowrap">
                          {row.ondemand}
                        </td>
                        <td className="px-6 py-5 text-sm text-white/90 font-mono whitespace-nowrap">
                          {row['1month']}
                        </td>
                        <td className="px-6 py-5 text-sm text-white/90 font-mono whitespace-nowrap">
                          {row['1year']}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4 space-y-1">
              {t.pricing_page.notes.map((note, idx) => (
                <p key={idx} className="text-xs text-white/40">
                  * {note}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Consulting Section --사용안함 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            id="consulting"
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              {t.pricing_page.consulting.title}
            </h2>
            <p className="text-lg text-white/80 mb-2 font-medium">
              {t.pricing_page.consulting.desc1}
            </p>
            <p className="text-white/60 mb-8 whitespace-pre-line leading-relaxed">
              {t.pricing_page.consulting.desc2}
            </p>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
              <Mail className="w-5 h-5 text-indigo-600" />
              <a href="mailto:business@jikji.ai">
                {t.pricing_page.consulting.contact}
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
