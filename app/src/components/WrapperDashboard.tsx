"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Utensils, Shield, Clock, AlertCircle, Sparkles, Zap, Fingerprint } from 'lucide-react';

// --- MOCKS ---
const mockServices = [
  { id: '1', name: 'Transporte', provider: 'Uber Black', status: 'chegando', eta: '3 min', icon: Car, color: 'text-zinc-100' },
  { id: '2', name: 'Delivery', provider: 'iFood', status: 'preparando', eta: '25 min', icon: Utensils, color: 'text-zinc-100' },
  { id: '3', name: 'Mercado', provider: 'Rappi', status: 'aguardando', eta: '--', icon: Zap, color: 'text-[#CD7F32]' } // Bronze contrast
];

const mockConcierge = {
  active: true,
  status: 'fallback_triggered',
  message: 'Negociando reserva premium... Bolt indisponivel, acionando Uber Black em background.',
  level: 'premium'
};

export default function WrapperDashboard() {
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
    <div className="min-h-screen bg-[#050505] text-zinc-50 p-4 md:p-8 font-sans selection:bg-[#D4AF37]/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-6"
      >
        <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-100">
              The <span className="text-[#D4AF37] font-medium drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Wrapper</span>
            </h1>
            <p className="text-[#CD7F32] mt-2 text-lg font-medium">Unified Service Concierge</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              ref={bioRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-black backdrop-blur-3xl px-6 py-3.5 rounded-[32px] border border-white/10 shadow-xl transition-all hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <Fingerprint className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-zinc-200 tracking-wide">Biometrics</span>
              {isHovered && (
                <motion.div
                  className="absolute pointer-events-none rounded-full blur-[12px] opacity-40"
                  style={{
                    background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
                    width: 60,
                    height: 60,
                    left: mousePosition.x - 30,
                    top: mousePosition.y - 30,
                  }}
                  transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                />
              )}
            </button>
            <div className="inline-flex items-center gap-3 bg-white/[0.02] backdrop-blur-2xl px-6 py-3.5 rounded-[32px] border border-white/5 shadow-2xl">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium tracking-wide">Shield Operacional</span>
            </div>
          </div>
        </motion.header>

        {/* Bento Grid: Tightened gap to 4 (1rem) on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          <motion.div
            variants={itemVariants}
            className="md:col-span-12 lg:col-span-8 bg-[#0a0a0a] backdrop-blur-3xl border border-[#D4AF37]/20 rounded-[28px] p-6 relative overflow-hidden group shadow-[0_8px_40px_-15px_rgba(212,175,55,0.15)]"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/30">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">Concierge Buffer</h2>
                  <p className="text-sm text-[#CD7F32] mt-0.5 font-medium">Gestao Ativa de Fallback</p>
                </div>
              </div>

              <div className="bg-black/80 rounded-[20px] p-5 border border-white/5 backdrop-blur-xl">
                {mockConcierge.active ? (
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-base font-medium text-zinc-100 mb-1.5">
                        Acao Automatica em Progresso
                      </p>
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        {mockConcierge.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-zinc-500">Nenhum fallback ativo no momento.</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-12 lg:col-span-4 bg-white/[0.02] backdrop-blur-2xl border border-white/5 hover:border-[#D4AF37]/20 transition-colors rounded-[28px] p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <h3 className="text-base font-medium text-[#CD7F32] mb-4 relative z-10">Inteligencia de Arbitragem</h3>
            
            <div className="space-y-4 relative z-10">
              <div>
                <span className="text-4xl font-light tracking-tighter text-[#D4AF37]">
                  R$ 142<span className="text-xl text-[#D4AF37]/50">,50</span>
                </span>
                <p className="text-xs text-[#CD7F32] mt-2 font-medium">Economizados esta semana</p>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent my-4" />
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#CD7F32]">Rede de Fallback</span>
                <span className="text-zinc-200 font-medium px-3 py-1 bg-white/5 border border-white/5 rounded-full">12 Provedores</span>
              </div>
            </div>
          </motion.div>

          {mockServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="md:col-span-6 lg:col-span-4 bg-white/[0.02] backdrop-blur-2xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 duration-300 rounded-[28px] p-6 flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors border border-white/[0.02]">
                  <service.icon className={`w-5 h-5 ${service.color}`} />
                </div>
                {service.eta !== '--' && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-black/50 rounded-full border border-[#D4AF37]/20 backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-xs font-medium text-[#D4AF37]">{service.eta}</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-[#CD7F32] text-xs font-semibold mb-1 tracking-wide uppercase">{service.name}</h4>
                <p className="text-xl font-light text-zinc-100 mb-4">{service.provider}</p>

                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shadow-sm ${
                    service.status === 'chegando' ? 'bg-[#D4AF37] animate-pulse shadow-[#D4AF37]/50' : 
                    service.status === 'preparando' ? 'bg-[#D4AF37]/70' : 'bg-[#CD7F32]/50'
                  }`} />
                  <span className="text-xs text-[#CD7F32] font-medium capitalize tracking-wide">{service.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
