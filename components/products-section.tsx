'use client';

import { useI18n } from './i18n-provider';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { AnimatedFeatureCard } from './ui/animated-feature-card';
import { cn } from '@/lib/utils';

export function ProductsSection() {
  const gpuCloudRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);

  return (
    <section id="products" className="relative" style={{ background: 'linear-gradient(180deg, #0E0E10 0%, #0a0a0c 60%, #0c0c0e 100%)' }}>
      <div ref={gpuCloudRef} id="gpucloud">
        <GpuCloudContent />
      </div>
      <div ref={platformRef} id="platform">
        <PlatformContent />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   GPU CLOUD CONTENT
   ───────────────────────────────────────── */
function GpuCloudContent() {
  const { t } = useI18n();
  const [shieldActive, setShieldActive] = useState(false);

  return (
    <>
      {/* Tagline */}
      {/* <div className="flex flex-col items-center justify-center py-[72px] gap-4 bg-[#01071B]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-[36px] font-bold leading-[1.33] text-center text-[#D9D9D9] max-w-5xl px-6"
        >
          {t.products.gpucloud.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-white/60 text-center px-6"
        >
          {t.products.gpucloud.subtitle}
        </motion.p>
      </div> */}

      {/* OneClick Start */}
      <div className="pt-8 pb-6">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[12px] md:text-sm font-medium">
              <span className="text-white/30">GPU CLOUD</span>
              <span className="text-white/30">-</span>
              <span className="text-white/60">JIKJI GPUaaS</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-[28px] md:text-[48px] font-bold leading-tight text-center text-white">
                {t.products.gpucloud.oneclick.title}
              </h3>
              <p className="text-base md:text-lg text-white/50 text-center">
                {t.products.gpucloud.oneclick.subtitle}
              </p>
            </div>
          </motion.div>

          {/* 3 Animated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {(['oneclick', 'framework', 'storage'] as const).map(
              (variant, idx) => (
                <motion.div
                  key={variant}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AnimatedFeatureCard
                    variant={variant}
                    cardTitle={t.products.gpucloud.oneclick.items[idx].title}
                    cardDescription={
                      t.products.gpucloud.oneclick.items[idx].desc
                    }
                  />
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="pt-6 pb-[72px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[200px_200px] gap-6 w-full">
            {/* Card 01 — large left, spans 2 rows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative md:row-span-2 rounded-2xl overflow-hidden flex flex-col p-6 min-h-[300px]"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
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
              <div className="relative z-10 text-xs font-mono text-white/30 mb-4">
                01
              </div>
              <h4 className="relative z-10 text-base md:text-xl font-bold text-white mb-2">
                {t.products.gpucloud.features.items[0].title}
              </h4>
              <p className="relative z-10 text-sm text-white/50 leading-relaxed">
                {t.products.gpucloud.features.items[0].desc}
              </p>
              <div
                className="absolute bottom-2 left-3 right-4 pointer-events-none"
                style={{
                  height: '54%',
                  maskImage:
                    'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskComposite: 'source-in',
                }}
              >
                <Image
                  src="/images/optimize2.png"
                  alt=""
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </motion.div>

            {/* Card 02 — top middle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="relative rounded-2xl overflow-hidden flex flex-col p-6 min-h-[160px]"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-2xl"
                style={{
                  height: '55%',
                  background:
                    'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)',
                }}
              />
              <div className="relative z-10 text-xs font-mono text-white/30 mb-4">
                02
              </div>
              <h4 className="relative z-10 text-base md:text-xl font-bold text-white mb-2">
                {t.products.gpucloud.features.items[1].title}
              </h4>
              <p className="relative z-10 text-sm text-white/50 leading-relaxed">
                {t.products.gpucloud.features.items[1].desc}
              </p>
            </motion.div>

            {/* Card 04 — top right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="relative rounded-2xl overflow-hidden flex flex-col p-6 min-h-[160px]"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-2xl"
                style={{
                  height: '55%',
                  background:
                    'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)',
                }}
              />
              <div className="relative z-10 text-xs font-mono text-white/30 mb-4">
                04
              </div>
              <h4 className="relative z-10 text-base md:text-xl font-bold text-white mb-2">
                {t.products.gpucloud.features.items[3].title}
              </h4>
              <p className="relative z-10 text-sm text-white/50 leading-relaxed">
                {t.products.gpucloud.features.items[3].desc}
              </p>
            </motion.div>

            {/* Card 03 — bottom middle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="relative rounded-2xl overflow-hidden flex flex-col p-6 min-h-[160px] cursor-pointer"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
              onClick={() => setShieldActive((v) => !v)}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-2xl"
                style={{
                  height: '55%',
                  background:
                    'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)',
                }}
              />
              <div className="relative z-10 text-xs font-mono text-white/30 mb-4">
                03
              </div>
              <h4 className="relative z-10 text-base md:text-xl font-bold text-white mb-2">
                {t.products.gpucloud.features.items[2].title}
              </h4>
              <p className="relative z-10 text-sm text-white/50 leading-relaxed">
                {t.products.gpucloud.features.items[2].desc}
              </p>
              <div className="hidden">
                <Image
                  src="/images/security.png"
                  alt=""
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Card 05 — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden flex flex-col p-6 min-h-[160px]"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-2xl"
                style={{
                  height: '55%',
                  background:
                    'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)',
                }}
              />
              <div className="relative z-10 text-xs font-mono text-white/30 mb-4">
                05
              </div>
              <h4 className="relative z-10 text-base md:text-xl font-bold text-white mb-2">
                {t.products.gpucloud.features.items[4].title}
              </h4>
              <p className="relative z-10 text-sm text-white/50 leading-relaxed">
                {t.products.gpucloud.features.items[4].desc}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   AGENT TERMINAL
   ───────────────────────────────────────── */
function AgentTerminal({ examplePrompt }: { examplePrompt: string }) {
  const Kw = (s: string) => <span style={{ color: '#E3E5E8' }}>{s}</span>; // command — Glass Highlight
  const Flg = (s: string) => <span style={{ color: '#8E9399' }}>{s}</span>; // flags — Metallic Silver
  const Str = (s: string) => <span style={{ color: '#D49D73' }}>{s}</span>; // strings — Warm Amber
  const Key = (s: string) => <span style={{ color: '#9F7A5E' }}>{s}</span>; // JSON keys — Copper Bronze
  const Bool = (s: string) => <span style={{ color: '#8E9399' }}>{s}</span>; // booleans — Metallic Silver
  const Pnc = (s: string) => (
    <span style={{ color: 'rgba(142,147,153,0.5)' }}>{s}</span>
  ); // punctuation — dimmed
  const Cmt = (s: string) => (
    <span style={{ color: 'rgba(142,147,153,0.25)' }}>{s}</span>
  ); // continuation \

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full mb-0"
    >
      {/* Ambient glow — subtle copper */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-40px',
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(159,122,94,0.12) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Glass window */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1A1B1E 0%, #0E0E10 100%)',
          border: '1px solid rgba(227,229,232,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(227,229,232,0.07)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-1.5 px-4 py-3 border-b"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderColor: 'rgba(227,229,232,0.06)',
          }}
        >
          <span
            className="size-3 rounded-full"
            style={{ background: 'rgba(142,147,153,0.25)' }}
          />
          <span
            className="size-3 rounded-full"
            style={{ background: 'rgba(142,147,153,0.18)' }}
          />
          <span
            className="size-3 rounded-full"
            style={{ background: 'rgba(142,147,153,0.12)' }}
          />
        </div>

        {/* Code body */}
        <pre className="px-6 py-4 text-[11.5px] leading-[1.75] font-mono overflow-x-hidden whitespace-pre-wrap break-all">
          <span>
            {Kw('curl')} {Flg('-s')}{' '}
            {Str('https://api.jikjilabs.local/v1/chat/completions')} {Cmt('\\')}
            {'\n'}
          </span>
          <span>
            {'  '}
            {Flg('-H')} {Str('"Authorization: Bearer <API_KEY>"')} {Cmt('\\')}
            {'\n'}
          </span>
          <span>
            {'  '}
            {Flg('-H')} {Str('"Content-Type: application/json"')} {Cmt('\\')}
            {'\n'}
          </span>
          <span>
            {'  '}
            {Flg('-d')} {Pnc("'{")}
            {'\n'}
          </span>
          <span>
            {'    '}
            {Key('"model"')}
            {Pnc(':')}
            {Str('"llama"')}
            {Pnc(',')}
            {'\n'}
          </span>
          <span>
            {'    '}
            {Key('"messages"')}
            {Pnc(':[')}
            {Pnc('{')}
            {Key('"role"')}
            {Pnc(':')}
            {Str('"user"')}
            {Pnc(',')}
            {Key('"content"')}
            {Pnc(':')}
            {Str(`"${examplePrompt}"`)}
            {Pnc('}],')}
            {'\n'}
          </span>
          <span>
            {'    '}
            {Key('"retrieval"')}
            {Pnc(':{')}
            {Key('"enabled"')}
            {Pnc(':')}
            {Bool('true')}
            {Pnc(',')}
            {Key('"web_search"')}
            {Pnc(':')}
            {Bool('true')}
            {Pnc('},')}
            {'\n'}
          </span>
          <span>
            {'    '}
            {Key('"memory"')}
            {Pnc(':{')}
            {Key('"session_id"')}
            {Pnc(':')}
            {Str('"cust-42"')}
            {Pnc('}')}
            {'\n'}
          </span>
          <span>
            {'  '}
            {Pnc("}'")}
            <span
              className="inline-block w-[2px] h-[0.9em] ml-0.5 animate-pulse align-middle"
              style={{ background: '#9F7A5E' }}
            />
          </span>
        </pre>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   VIDEO MODAL
   ───────────────────────────────────────── */
interface VideoModalProps {
  item: { title: string; desc: string; detail: string } | null;
  onClose: () => void;
}

function VideoModal({ item, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
            style={{
              background: '#ffffff',
              boxShadow: '0 32px 80px rgba(0,0,0,0.22)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-black/8"
              style={{ background: '#f5f5f7' }}
            >
              <span className="text-sm font-semibold text-black/70 uppercase tracking-wide">
                {item.title}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-black/30 hover:text-black hover:bg-black/8 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
              {/* Detail text */}
              <p className="text-sm text-black/60 leading-relaxed whitespace-pre-line">
                {item.detail}
              </p>

              {/* Sub-items */}
              {item.desc &&
                item.desc.split('\n').filter(Boolean).length > 0 && (
                  <div className="border-t border-black/8 pt-6 flex flex-col gap-3">
                    {item.desc
                      .split('\n')
                      .filter(Boolean)
                      .map((tech, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-black/25" />
                          <span className="text-sm text-black/70 leading-relaxed">
                            {tech}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   PLATFORM CONTENT
   ───────────────────────────────────────── */
function PlatformContent() {
  const { t } = useI18n();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const selectedItem =
    selectedCard !== null
      ? t.products.platform.video.features[selectedCard]
      : null;

  return (
    <div>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-24">
        {/* AI Inference Platform */}
        <div id="ai-inference" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[12px] md:text-sm font-medium mb-6">
              <span className="text-white/30">PLATFORM</span>
              <span className="text-white/30">-</span>
              <span className="text-white/60">AI INFERENCE</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight max-w-4xl mx-auto leading-tight text-white">
                {t.products.platform.inference.heading}
              </h2>
              <p className="text-base text-white/50">
                {t.products.platform.inference.heading_sub}
              </p>
            </div>
          </motion.div>

          {/* 5-Step Pipeline Diagram */}
          <div className="mb-14 relative px-2">
            {/* Desktop: single row with traveling pulse connector */}
            <div
              className="absolute top-[21px] left-[10%] right-[10%] hidden md:block overflow-hidden"
              style={{ height: '2px' }}
            >
              <div
                className="absolute left-0 right-0"
                style={{
                  top: '0px',
                  height: '1px',
                  background:
                    'linear-gradient(90deg, #9F7A5E50, #9F7A5E80 50%, #9F7A5E50)',
                }}
              />
              <motion.div
                className="absolute top-0 h-full"
                style={{
                  width: '15%',
                  background:
                    'linear-gradient(90deg, transparent, #FFCF9E 50%, transparent)',
                }}
                animate={{ x: ['-100%', '500%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-5 gap-4">
              {t.products.platform.inference.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-5 shrink-0 w-11 h-11">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                      transition={{
                        duration: 1.0,
                        repeat: Infinity,
                        repeatDelay: 4.0,
                        delay: idx * 1.0,
                        ease: 'easeOut',
                      }}
                      style={{ background: 'rgba(212,157,115,0.4)' }}
                    />
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center"
                      style={{
                        background: '#1A1B1E',
                        border: '1px solid #E3E5E820',
                        boxShadow: '0 0 14px rgba(212,157,115,0.15)',
                      }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{
                          background: '#9F7A5E',
                          boxShadow: '0 0 6px rgba(212,157,115,0.5)',
                        }}
                      />
                    </div>
                  </div>
                  <p
                    className="text-[10px] font-mono tracking-widest mb-1.5"
                    style={{ color: '#9F7A5E' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <p
                    className="text-sm font-semibold leading-snug mb-1.5"
                    style={{ color: '#E3E5E8' }}
                  >
                    {step.label}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: '#8E9399' }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mobile: 2-col rows with horizontal connectors */}
            <div className="md:hidden flex flex-col gap-8">
              {(
                [
                  [0, 1],
                  [2, 3],
                ] as const
              ).map((pair, pairIdx) => (
                <div key={pairIdx} className="relative grid grid-cols-2 gap-8">
                  {/* Horizontal connector line at dot center */}
                  <div
                    className="absolute top-[21px] inset-x-0 pointer-events-none"
                    style={{
                      height: '1px',
                      background:
                        'linear-gradient(90deg, transparent 2%, #9F7A5E80 15%, #9F7A5E80 85%, transparent 98%)',
                    }}
                  />
                  {pair.map((stepIdx) => (
                    <motion.div
                      key={stepIdx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: stepIdx * 0.1 }}
                      className="flex flex-col items-center text-center relative z-10"
                    >
                      <div className="relative mb-5 shrink-0 w-11 h-11">
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                          transition={{
                            duration: 1.0,
                            repeat: Infinity,
                            repeatDelay: 4.0,
                            delay: stepIdx * 1.0,
                            ease: 'easeOut',
                          }}
                          style={{ background: 'rgba(212,157,115,0.4)' }}
                        />
                        <div
                          className="absolute inset-0 rounded-full flex items-center justify-center"
                          style={{
                            background: '#1A1B1E',
                            border: '1px solid #E3E5E820',
                            boxShadow: '0 0 14px rgba(212,157,115,0.15)',
                          }}
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{
                              background: '#9F7A5E',
                              boxShadow: '0 0 6px rgba(212,157,115,0.5)',
                            }}
                          />
                        </div>
                      </div>
                      <p
                        className="text-[10px] font-mono tracking-widest mb-1.5"
                        style={{ color: '#9F7A5E' }}
                      >
                        {String(stepIdx + 1).padStart(2, '0')}
                      </p>
                      <p
                        className="text-sm font-semibold leading-snug mb-1.5"
                        style={{ color: '#E3E5E8' }}
                      >
                        {t.products.platform.inference.steps[stepIdx].label}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: '#8E9399' }}
                      >
                        {t.products.platform.inference.steps[stepIdx].desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ))}
              {/* Step 5: centered in its own row */}
              <div className="relative flex justify-center">
                <div
                  className="absolute top-[21px] inset-x-0 pointer-events-none"
                  style={{
                    height: '1px',
                    background:
                      'linear-gradient(90deg, transparent 2%, #9F7A5E80 15%, #9F7A5E80 85%, transparent 98%)',
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center text-center w-[calc(50%-16px)]"
                >
                  <div className="relative mb-5 shrink-0 w-11 h-11">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                      transition={{
                        duration: 1.0,
                        repeat: Infinity,
                        repeatDelay: 4.0,
                        delay: 4.0,
                        ease: 'easeOut',
                      }}
                      style={{ background: 'rgba(212,157,115,0.4)' }}
                    />
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center"
                      style={{
                        background: '#1A1B1E',
                        border: '1px solid #E3E5E820',
                        boxShadow: '0 0 14px rgba(212,157,115,0.15)',
                      }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{
                          background: '#9F7A5E',
                          boxShadow: '0 0 6px rgba(212,157,115,0.5)',
                        }}
                      />
                    </div>
                  </div>
                  <p
                    className="text-[10px] font-mono tracking-widest mb-1.5"
                    style={{ color: '#9F7A5E' }}
                  >
                    05
                  </p>
                  <p
                    className="text-sm font-semibold leading-snug mb-1.5"
                    style={{ color: '#E3E5E8' }}
                  >
                    {t.products.platform.inference.steps[4].label}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: '#8E9399' }}
                  >
                    {t.products.platform.inference.steps[4].desc}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            {t.products.platform.inference.features.map((item, idx, arr) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'relative overflow-hidden p-6',
                  idx > 0 && 'border-t border-white/10',
                  idx === 1 && 'md:border-t-0',
                  idx % 2 === 1 && 'md:border-l border-white/10',
                  arr.length % 2 === 1 &&
                  idx === arr.length - 1 &&
                  'md:col-span-2',
                )}
              >
                {/* Top light reflection — first row only */}
                {idx < 2 && (
                  <div
                    className="absolute inset-x-0 top-0 pointer-events-none"
                    style={{
                      height: '55%',
                      background:
                        'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)',
                    }}
                  />
                )}
                <div className="relative z-10 text-xs font-mono text-white/30 mb-4">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="relative z-10 text-base md:text-xl font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="relative z-10 text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enterprise AI Agents */}
        <div id="chat-agent" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[12px] md:text-sm font-medium mb-6">
              <span className="text-white/30">PLATFORM</span>
              <span className="text-white/30">-</span>
              <span className="text-white/60">CHAT AGENT</span>
            </div>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight max-w-4xl mx-auto leading-tight text-white">
              {t.products.platform.agents.heading}
            </h2>
          </motion.div>

          {/* Terminal + feature cards */}
          <div className="flex flex-col gap-6 items-center">
            {/* Terminal centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3 w-full max-w-2xl"
            >
              <div className="relative">
                <AgentTerminal
                  examplePrompt={t.products.platform.agents.example_prompt}
                />
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none rounded-b-2xl"
                  style={{
                    height: '80px',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    maskImage: 'linear-gradient(to bottom, transparent, black)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, transparent, black)',
                  }}
                />
              </div>
            </motion.div>

            {/* Feature cards below */}
            <div
              className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {t.products.platform.agents.features.map((item, idx, arr) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={cn(
                    'relative overflow-hidden px-7 py-6 flex flex-col gap-1',
                    idx > 0 && 'border-t border-white/10',
                    idx === 1 && 'md:border-t-0',
                    idx % 2 === 1 && 'md:border-l border-white/10',
                    arr.length % 2 === 1 &&
                    idx === arr.length - 1 &&
                    'md:col-span-2',
                  )}
                >
                  {/* Top light reflection — first row only */}
                  {idx < 2 && (
                    <div
                      className="absolute inset-x-0 top-0 pointer-events-none"
                      style={{
                        height: '55%',
                        background:
                          'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)',
                      }}
                    />
                  )}
                  <h4 className="relative z-10 text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="relative z-10 text-sm text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* N3N Video AI Platform */}
        <div id="n3n-video-ai" className="flex flex-col gap-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[12px] md:text-sm font-medium">
              <span className="text-white/30">PLATFORM</span>
              <span className="text-white/30">-</span>
              <span className="text-white/60">N3N VIDEO AI</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight leading-tight text-white">
                {t.products.platform.video.heading}
              </h2>
              <p className="text-base text-white/50 leading-relaxed">
                {t.products.platform.video.heading_sub}
              </p>
            </div>
          </motion.div>

          {/* Cards */}
          <div
            className="rounded-2xl overflow-hidden grid grid-cols-2 md:grid-cols-5"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            {t.products.platform.video.features.map((item, idx, arr) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={cn(
                  'relative overflow-hidden px-5 py-6 flex flex-col gap-1',
                  idx > 0 && 'border-t border-white/10',
                  idx < arr.length - 1 && 'md:border-t-0',
                  idx === 0 && 'md:border-t-0',
                  idx > 0 && 'md:border-l border-white/10',
                  arr.length === 5 && idx === 4 && 'col-span-2 md:col-span-1',
                )}
              >
                <div className="text-xs font-mono text-white/30 mb-3">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  {item.title}
                </h4>
                <ul className="flex flex-col gap-1 mt-1">
                  {item.desc.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-white/50 leading-relaxed">
                      <span className="mt-[7px] w-1 h-1 rounded-full shrink-0 bg-white/30" />
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <VideoModal item={selectedItem} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
