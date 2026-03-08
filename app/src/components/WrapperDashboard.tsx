"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Utensils, Shield, Clock, AlertCircle, Sparkles, Zap, Fingerprint, Activity } from 'lucide-react';
import { ConciergeLogic } from '../features/concierge/ConciergeLogic';
import { globalBroker } from '../features/wrapper/ServiceBroker';

// --- MOCKS ---
const mockServices = [
  { id: '1', name: 'Transporte', provider: 'Uber Black', status: 'chegando', eta: '3 min', icon: Car, color: 'text-zinc-100' },
  { id: '2', name: 'Delivery', provider: 'iFood', status: 'preparando', eta: '25 min', icon: Utensils, color: 'text-zinc-100' },
  { id: '3', name: 'Mercado', provider: 'Rappi', status: 'aguardando', eta: '--', icon: Zap, color: 'text-[#CD7F32]' } // Bronze contrast
];

export default function WrapperDashboard() {
  const [brokerStatus, setBrokerStatus] = useState("Aguardando comando...");
  
  const triggerBroker = async () => {
    setBrokerStatus("Sincronizando via Service Broker...");
    const res = await globalBroker.routeRequest({ serviceId: 'concierge_buffer', payload: { action: 'fallback' } });
    if (res.success) setBrokerStatus(res.data);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)', y: 20 },
    show: { 
      opacity: 1, 
      clipPath: 'inset(0% 0 0 0)', 
      y: 0, 
      transition: { type: "spring", stiffness: 280, damping: 24, duration: 0.6 } 
    }
  };

  // Biometrics Glow Effect State
  const bioRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bioRef.current) {
        const rect = bioRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    if (isHovered) window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-50 p-4 md:p-8 font-sans selection:bg-[#E5C158]/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-6"
      >
        <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-zinc-100">
              The <span className="text-[#E5C158] font-medium drop-shadow-[0_0_15px_rgba(229,193,88,0.3)]">Wrapper</span>
              <span className="ml-4 text-zinc-600 font-semibold text-2xl">V3</span>
            </h1>
            <p className="text-[#CD7F32] mt-2 text-lg font-mono tracking-widest uppercase">Portugal Elite Ecosystem</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              ref={bioRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Autenticação Biometrica"
              className="relative overflow-hidden inline-flex items-center gap-2 bg-black backdrop-blur-3xl px-6 py-3.5 rounded-[32px] border border-white/10 shadow-xl transition-all hover:border-[#E5C158]/50 hover:shadow-[0_0_30px_rgba(229,193,88,0.2)]"
            >
              <Fingerprint className="w-5 h-5 text-[#E5C158]" />
              <span className="text-sm font-semibold text-zinc-200 tracking-wide">Biometrics</span>
              {isHovered && (
                <motion.div
                  className="absolute pointer-events-none rounded-full blur-[12px] opacity-40"
                  style={{
                    background: 'radial-gradient(circle, #E5C158 0%, transparent 70%)',
                    width: 60,
                    height: 60,
                    left: mousePosition.x - 30,
                    top: mousePosition.y - 30,
                  }}
                  transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                />
              )}
            </button>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Pillar 1: Logic linked from Features */}
          <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-4 h-full">
            <ConciergeLogic />
          </motion.div>

          {/* Pillar 5: Broker Integration */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-12 lg:col-span-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[32px] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Activity size={18} className="text-[#E5C158]" />
                <h2 className="text-sm font-light tracking-[0.2em] text-zinc-400 uppercase">Brokeragem de Serviços</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mockServices.map((s) => (
                  <div key={s.id} className="bg-black/40 border border-white/5 p-5 rounded-[24px] hover:border-white/10 transition-all">
                    <s.icon size={20} className={`${s.color} mb-3`} />
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{s.name}</p>
                    <p className="text-sm font-medium text-zinc-100">{s.provider}</p>
                    <p className="text-[11px] font-mono text-[#CD7F32] mt-2">{s.eta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <p className="text-xs font-mono text-zinc-400">{brokerStatus}</p>
              </div>
              <button 
                onClick={triggerBroker}
                className="px-6 py-2 bg-[#E5C158] text-black text-xs font-bold tracking-widest rounded-full hover:bg-white transition-colors"
              >
                SYNC FALLBACK
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex justify-center pt-12">
          <p className="text-[10px] text-zinc-700 font-mono tracking-widest text-center">
            CMTECNOLOGIA SOVEREIGN CORE V4.2 | MINOS SCORE 9.8 CERTIFIED
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
