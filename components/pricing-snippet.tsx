'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from './i18n-provider';
import Link from 'next/link';

export function PricingSnippet() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'b200' | 'h200' | 'h100' | 'rtx'>(
    'b200',
  );

  const tabs = [
    { id: 'b200' as const, label: t.pricing_page.tabs.b200 },
    { id: 'h200' as const, label: t.pricing_page.tabs.h200 },
    { id: 'h100' as const, label: t.pricing_page.tabs.h100 },
    { id: 'rtx' as const, label: t.pricing_page.tabs.rtx },
  ];

  const rows = t.pricing_page.table[activeTab];
  const headers = t.pricing_page.table.headers;

  return (
    <section id="pricing" className="py-24 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header + Tab selector */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">
              {t.pricing_page.title}
            </h2>
            <p className="text-base text-gray-500 font-normal">
              {t.pricing_page.subtitle}
            </p>
          </motion.div>

          <div className="w-full md:w-auto inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-none px-3 md:px-6 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className={`px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap${i >= 3 ? ' text-right' : ''}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                        {row.vram}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                        {row.vcpu}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-mono whitespace-nowrap text-right">
                        {row.ondemand}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-mono whitespace-nowrap text-right">
                        {row['1month']}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-mono whitespace-nowrap text-right">
                        {row['1year']}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Notes */}
        <div className="mt-8 space-y-2">
          {t.pricing_page.notes.map((note, idx) => (
            <p key={idx} className="text-sm text-gray-400">
              *{' '}
              {note.split(/(50%\s+(?:할인 혜택|promotional discount))/).map((part, i) =>
                /^50%/.test(part) ? (
                  <span key={i} className="font-bold text-gray-500">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </p>
          ))}
        </div>

        {/* Inline CTA Banner */}
        <div className="mt-12 rounded-2xl bg-gray-900 px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
              {t.cta_banner.subtitle}
            </p>
            <p className="text-white text-xl md:text-2xl font-bold mb-1">
              {t.cta_banner.title}
            </p>
            <p className="text-white/50 text-sm">
              {t.cta_banner.disclaimer}
            </p>
          </div>
          <Link
            href="https://forms.gle/2hcY59NMnXeYeJKQ6"
            target="_blank"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            {t.cta_banner.btn_inquiry}
          </Link>
        </div>
      </div>
    </section>
  );
}
