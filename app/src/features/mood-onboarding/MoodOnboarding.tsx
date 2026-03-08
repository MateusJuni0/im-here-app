"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Crown, ArrowRight } from 'lucide-react';

const moods = [
  {
    id: 'saturated',
    title: 'Saturado',
    description: 'Procuro calma, minimalismo e curadoria essencial para descomprimir.',
    icon: Sparkles,
    color: 'from-zinc-500/20 to-zinc-900/40',
    accent: '#A1A1AA'
  },
  {
    id: 'adventurous',
    title: 'Aventureiro',
    description: 'Exploração ativa, locais escondidos e experiências fora do roteiro VIP.',
    icon: Compass,
    color: 'from-[#CD7F32]/20 to-black/60',
    accent: '#CD7F32'
  },
  {
    id: 'vip',
    title: 'VIP Elite',
    description: 'O melhor que Portugal oferece. Exclusividade, luxo e acesso prioritário.',
    icon: Crown,
    color: 'from-[#E5C158]/20 to-black/80',
    accent: '#E5C158'
  }
];

export const MoodOnboarding: React.FC<{ onSelect?: (id: string) => void }> = ({ onSelect }) => {
  return (
    <div className="space-y-8 py-6">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-light tracking-tight text-zinc-100">
          Como deseja <span className="text-[#E5C158] font-medium">sentir</span> Portugal hoje?
        </h2>
        <p className="text-zinc-500 mt-2 text-sm font-mono tracking-wider">ONBOARDING DE DESEJOS | PILLAR 02</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {moods.map((mood, idx) => (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => onSelect?.(mood.id)}
            className={`relative group cursor-pointer overflow-hidden bg-gradient-to-br ${mood.color} backdrop-blur-3xl border border-white/5 rounded-[32px] p-8 flex flex-col justify-between h-[400px] hover:border-[${mood.accent}]/30 transition-all shadow-2xl`}
          >
            {/* Background Glow */}
            <div 
              className="absolute -top-20 -right-20 w-64 h-64 opacity-10 blur-[80px] rounded-full pointer-events-none group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: mood.accent }}
            />

            <div>
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 w-fit mb-6 group-hover:scale-110 transition-transform">
                <mood.icon size={28} style={{ color: mood.accent }} />
              </div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
                {mood.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {mood.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all group-hover:gap-4" style={{ color: mood.accent }}>
              Selecionar Estilo <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
