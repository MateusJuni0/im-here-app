"use client";

import { motion } from "framer-motion";
import { Compass, MapPin, Sparkles, User, Settings, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

const springConfig = { type: "spring", stiffness: 300, damping: 30 };

export default function OnboardingPage() {
  return (
    <main className="min-h-screen p-4 md:p-12 max-w-7xl mx-auto flex flex-col gap-8 justify-center">
      <div className="space-y-4 mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springConfig}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Define Your <span className="gold-gradient-text">Mood</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl"
        >
          Welcome to the Nocturnal Gold experience. Select how you want to explore Portugal tonight.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
        {/* Main Mood Selector */}
        <GlassCard className="md:col-span-2 md:row-span-2 group cursor-pointer" delay={0.2}>
          <div className="space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-gold/10 border border-gold/20">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-3xl font-semibold">Elite Discovery</h2>
            <p className="text-white/40">Our AI curates the most exclusive experiences tailored to your profile.</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gold font-medium">Coming Soon</span>
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold/20 transition-colors">
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-gold" />
            </div>
          </div>
        </GlassCard>

        {/* Location Card */}
        <GlassCard className="md:col-span-1 group cursor-pointer" delay={0.3}>
          <div className="space-y-4">
            <MapPin className="w-6 h-6 text-white/60" />
            <h3 className="text-xl font-medium">Near You</h3>
          </div>
          <div className="text-white/20 text-sm">Detecting location...</div>
        </GlassCard>

        {/* Profile Card */}
        <GlassCard className="md:col-span-1 group cursor-pointer" delay={0.4}>
          <div className="space-y-4">
            <User className="w-6 h-6 text-white/60" />
            <h3 className="text-xl font-medium">Profile</h3>
          </div>
          <div className="text-white/20 text-sm">Guest Mode</div>
        </GlassCard>

        {/* Settings Card */}
        <GlassCard className="md:col-span-2 group cursor-pointer" delay={0.5}>
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-3xl bg-white/5">
              <Compass className="w-8 h-8 text-white/80" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium">Preferences</h3>
              <p className="text-white/40 text-sm">Configure your nocturnal journey.</p>
            </div>
            <Settings className="w-6 h-6 text-white/20" />
          </div>
        </GlassCard>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-white/20 text-sm uppercase tracking-widest font-medium">
          Powered by CM Tecnologia &middot; Nocturnal Gold V1
        </p>
      </motion.footer>
    </main>
  );
}