'use client';

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  index?: number;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-[#01071B] border border-white/5 hover:border-white/10 transition-all overflow-hidden flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors" />

      {Icon && (
        <div className="w-12 h-12 bg-[#151C32] rounded-xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-white/10 transition-colors">
          <Icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        </div>
      )}

      <h3 className="text-xl font-medium mb-3 text-white/90">{title}</h3>
      <p className="text-white/50 leading-relaxed font-light flex-grow">
        {description}
      </p>
    </motion.div>
  );
}
