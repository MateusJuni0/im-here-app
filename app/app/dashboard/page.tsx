'use client';
import { useState } from 'react';
import MapComponent from '@/components/Map';
import NearbyList from '@/components/NearbyList';
import { Compass, Coffee, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [mode, setMode] = useState<'Aventureiro' | 'Soft'>('Aventureiro');
  const [activeTab, setActiveTab] = useState<'nearby' | 'groups'>('nearby');

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-24 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Descubra
          </h1>
          <p className="text-sm text-white/50">O mundo está à sua espera</p>
        </div>
        <button className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
        </button>
      </header>

      {/* Mode Toggle */}
      <div className="flex p-1 mb-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative">
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-gradient-to-r transition-all duration-300 ease-out
            ${mode === 'Aventureiro' 
              ? 'from-[#00D4FF]/20 to-[#00D4FF]/5 border border-[#00D4FF]/30 left-1' 
              : 'from-purple-500/20 to-purple-500/5 border border-purple-500/30 right-1'
            }`}
        />
        <button
          onClick={() => setMode('Aventureiro')}
          className={`flex-1 flex justify-center items-center gap-2 py-3 z-10 transition-colors duration-300 ${mode === 'Aventureiro' ? 'text-[#00D4FF]' : 'text-white/50'}`}
        >
          <Compass className="w-4 h-4" />
          <span className="font-semibold text-sm">Aventureiro</span>
        </button>
        <button
          onClick={() => setMode('Soft')}
          className={`flex-1 flex justify-center items-center gap-2 py-3 z-10 transition-colors duration-300 ${mode === 'Soft' ? 'text-purple-400' : 'text-white/50'}`}
        >
          <Coffee className="w-4 h-4" />
          <span className="font-semibold text-sm">Soft</span>
        </button>
      </div>

      {/* Map Section */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-semibold text-white">Radar Local</h2>
          <span className="text-xs text-[#00D4FF] font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            Ao vivo
          </span>
        </div>
        <MapComponent />
      </section>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 mb-2">
        <button
          onClick={() => setActiveTab('nearby')}
          className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'nearby' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
        >
          Pessoas Próximas
          {activeTab === 'nearby' && (
            <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'groups' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
        >
          Grupos Ativos
          {activeTab === 'groups' && (
            <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
          )}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'nearby' ? (
            <NearbyList />
          ) : (
            <div className="py-12 text-center text-white/50 text-sm flex flex-col items-center gap-3">
              <Users className="w-10 h-10 text-white/20 mb-2" />
              Nenhum grupo ativo no momento. <br /> Que tal criar um para a sua viagem?
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
