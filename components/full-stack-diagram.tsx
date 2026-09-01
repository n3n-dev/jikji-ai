'use client';

import {
  ArrowRight,
  Server,
  Cpu,
  BarChart3,
  Zap,
  MessageSquare,
  Video,
} from 'lucide-react';

const columns = [
  {
    id: 'infrastructure',
    title: 'AI Infrastructure',
    borderColor: 'border-indigo-500/50',
    glowColor: 'shadow-[0_0_30px_rgba(85,114,226,0.15)]',
    items: [
      { label: '직지 edge\n데이터센터', icon: Server },
      { label: 'GPUaaS', icon: Cpu },
    ],
  },
  {
    id: 'platform',
    title: 'AI Platform',
    borderColor: 'border-violet-500/50',
    glowColor: 'shadow-[0_0_30px_rgba(64,100,235,0.15)]',
    items: [
      { label: 'AI & MLOps\nPlatform', icon: BarChart3 },
      { label: '배포·추론\nAPI 서비스', icon: Zap },
    ],
  },
  {
    id: 'applications',
    title: 'AI Applications',
    borderColor: 'border-purple-400/70',
    glowColor: 'shadow-[0_0_40px_rgba(64,100,235,0.25)]',
    items: [
      { label: 'Chat Agent\n서비스', icon: MessageSquare },
      { label: 'N3N 영상\nAI 서비스', icon: Video },
    ],
  },
];

export function FullStackDiagram() {
  return (
    <div className="flex items-stretch gap-2 md:gap-4 w-full py-6 px-4">
      {columns.map((col, i) => (
        <div
          key={col.id}
          className="flex items-center gap-2 md:gap-4 flex-1 min-w-0"
        >
          {i > 0 && (
            <div className="flex-shrink-0 flex items-center">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-indigo-400/70" />
            </div>
          )}
          <div
            className={`
              flex-1 min-w-0 rounded-2xl border ${col.borderColor} ${col.glowColor}
              bg-white/[0.04] backdrop-blur-sm p-4 md:p-5
            `}
          >
            <h3 className="text-white font-bold text-sm md:text-base lg:text-lg mb-3 md:mb-4">
              {col.title}
            </h3>
            <div className="flex flex-col gap-2 md:gap-3">
              {col.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-white/[0.06] rounded-xl p-2.5 md:p-3 border border-white/10 gap-2"
                >
                  <span className="text-white/80 text-xs md:text-sm font-medium whitespace-pre-line leading-snug">
                    {item.label}
                  </span>
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-indigo-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
