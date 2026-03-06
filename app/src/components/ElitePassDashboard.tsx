import { useWalletStore } from '../store/useWalletStore';
import { elitePassManager } from '../services/managers/ElitePassManager';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Zap, Compass, Wallet, ChevronRight, Star, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const ElitePassDashboard = () => {
  const { elitePoints, status } = useWalletStore();
  const benefits = elitePassManager.getBenefits();

  const handleExploration = () => {
    elitePassManager.rewardExploration('LX_FACTORY');
  };

  const handleCheckIn = () => {
    elitePassManager.rewardVibeCheckIn('LUX_FRAGIL');
  };

  const handleWalletUse = () => {
    elitePassManager.rewardWalletUsage(150); // Spend 150 EUR
  };

  // Status colors - Padrão Elite CMTecnologia
  const statusColors = {
    Silver: 'from-[#C0C0C0] via-[#E8E8E8] to-[#A9A9A9]',
    Gold: 'from-[#D4AF37] via-[#FFD700] to-[#B8860B]',
    Diamond: 'from-[#B9F2FF] via-[#E0FFFF] to-[#7DF9FF]'
  };

  const getNextTier = () => {
    if (status === 'Silver') return { name: 'Gold', points: 1000 };
    if (status === 'Gold') return { name: 'Diamond', points: 5000 };
    return { name: 'Max Tier', points: elitePoints };
  };

  const nextTier = getNextTier();
  const progress = status === 'Diamond' 
    ? 100 
    : Math.min(100, (elitePoints / nextTier.points) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-px bg-[#D4AF37]"></div>
            <h2 className="text-[#D4AF37] tracking-widest uppercase text-xs font-semibold">Sovereign Ecosystem</h2>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl text-white"
          >
            Elite Pass <span className="text-[#D4AF37] italic">Dashboard</span>
          </motion.h3>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-right hidden md:block"
        >
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-1">Última Sincronização</p>
          <p className="text-white font-mono text-sm">PORTUGAL_CORE_V2.0</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Status Card */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            className={`relative p-8 rounded-[32px] bg-gradient-to-br ${statusColors[status]} text-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] group`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="p-3 bg-black/10 rounded-2xl backdrop-blur-md border border-black/5">
                <Crown size={24} />
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase opacity-60 tracking-widest">Membro Elite</p>
                <p className="text-sm font-mono font-bold">#PT-039-2026</p>
              </div>
            </div>

            <div className="relative z-10 mt-12 mb-8">
              <p className="text-sm font-bold opacity-70 uppercase tracking-[0.3em] mb-1">Status Atual</p>
              <h3 className="text-6xl font-black uppercase tracking-tighter italic">{status}</h3>
            </div>
            
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className="text-5xl font-bold">{elitePoints.toLocaleString()}</p>
                <p className="text-xs font-black uppercase opacity-60 tracking-widest mt-1">Pontos Acumulados</p>
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-black/20 flex items-center justify-center">
                <Star size={32} className="fill-black/10 stroke-black/40" />
              </div>
            </div>
            
            {/* Progress Bar */}
            {status !== 'Diamond' && (
              <div className="relative z-10 mt-8">
                <div className="flex justify-between text-[10px] font-black uppercase opacity-60 mb-2 tracking-widest">
                  <span>Progressão de Nível</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden border border-black/5">
                  <motion.div 
                    className="h-full bg-black/80 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="text-[10px] font-bold text-center mt-3 opacity-50 uppercase tracking-widest">
                  Mais {(nextTier.points - elitePoints).toLocaleString()} pts para se tornar {nextTier.name}
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-[24px] backdrop-blur-xl">
              <ShieldCheck className="text-[#D4AF37] mb-3" size={20} />
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Segurança</p>
              <p className="text-white font-bold">Ativa</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-[24px] backdrop-blur-xl">
              <Clock className="text-[#D4AF37] mb-3" size={20} />
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Sessão</p>
              <p className="text-white font-bold">Premium</p>
            </div>
          </div>
        </div>

        {/* Right Column: Benefits & Actions */}
        <div className="lg:col-span-7 space-y-8">
          {/* Benefits Section */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Crown size={120} />
            </div>
            
            <h4 className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-8 flex items-center gap-3">
              <CheckCircle2 size={16} /> Benefícios do Ecossistema
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 shadow-[0_0_10px_#D4AF37]" />
                  <span className="text-sm text-gray-300 font-medium leading-tight">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5">
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                Ver Todos os 39 Pilares de Elite <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Simulation / Actions Section */}
          <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[32px] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-xs font-black tracking-[0.3em] text-gray-500 uppercase">Ações de Fidelização</h4>
              <div className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                Simulação Ativa
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'Explorar PT', icon: Compass, action: handleExploration, points: '+50', desc: 'Descoberta Local' },
                { label: 'Vibe Check', icon: Zap, action: handleCheckIn, points: '+100', desc: 'Presença VIP' },
                { label: 'Elite Wallet', icon: Wallet, action: handleWalletUse, points: '+150', desc: 'Consumo Premium' }
              ].map((btn, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={btn.action}
                  className="flex flex-col items-center text-center p-6 rounded-[24px] bg-white/[0.02] border border-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <btn.icon className="text-[#D4AF37]" size={20} />
                  </div>
                  <p className="text-white font-bold text-sm mb-1">{btn.label}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mb-2">{btn.desc}</p>
                  <span className="text-xs font-bold text-[#D4AF37]">{btn.points} pts</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
