"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Award, Zap, Star, Trophy } from "lucide-react";

const badges = [
  { id: 1, icon: Zap, label: "Fast Lane", color: "text-blue-400" },
  { id: 2, icon: Star, label: "Top Tier", color: "text-gold" },
  { id: 3, icon: Trophy, label: "Globetrotter", color: "text-purple-400" },
  { id: 4, icon: Award, label: "Early Adopter", color: "text-green-400" },
];

export const ElitePass = () => {
  return (
    <GlassCard className="p-8 relative overflow-hidden group">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
            <Trophy size={14} className="text-gold" />
            <span className="text-[10px] font-black text-gold uppercase tracking-widest">Elite Pass V1</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter">
            LEVEL <span className="gold-gradient-text">24</span>
          </h2>
          <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-gold/50 to-gold"
            />
          </div>
          <p className="text-xs text-white/40 font-medium">
            1,250 XP TO LEVEL 25 • <span className="text-white">PLATINUM TIER</span>
          </p>
        </div>

        <div className="flex gap-4">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="group/badge relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover/badge:border-gold/50">
                <badge.icon size={24} className={`${badge.color} group-hover/badge:scale-110 transition-transform`} />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-[10px] font-bold uppercase tracking-widest">{badge.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
    </GlassCard>
  );
};
