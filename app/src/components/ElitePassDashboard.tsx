import React from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { elitePassManager } from '../services/managers/ElitePassManager';
import { motion } from 'framer-motion';

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

  // Status colors
  const statusColors = {
    Silver: 'from-gray-300 to-gray-500',
    Gold: 'from-yellow-300 to-yellow-600',
    Diamond: 'from-cyan-300 to-blue-500'
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
    <div className="w-full max-w-md mx-auto p-6 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 mt-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Elite Pass
        </h2>
      </div>

      {/* Status Card */}
      <motion.div 
        className={`relative p-6 rounded-2xl bg-gradient-to-br ${statusColors[status]} text-black overflow-hidden mb-6`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <p className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-1">Status Atual</p>
            <h3 className="text-4xl font-bold uppercase">{status}</h3>
          </div>
          <div className="text-right">
            <p className="text-3xl font-light">{elitePoints}</p>
            <p className="text-xs font-semibold uppercase opacity-80">Pontos</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        {status !== 'Diamond' && (
          <div className="mt-6">
            <div className="flex justify-between text-xs font-semibold uppercase opacity-80 mb-2">
              <span>{elitePoints} pts</span>
              <span>{nextTier.points} pts para {nextTier.name}</span>
            </div>
            <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-black/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Benefits List */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold tracking-widest text-gold uppercase mb-4 opacity-80">
          Benefícios Ativos
        </h4>
        <ul className="space-y-3">
          {benefits.map((benefit, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 text-sm text-gray-300"
            >
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <span>{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Simulation Actions */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <p className="text-xs text-center text-gray-500 uppercase tracking-wider mb-2">
          Simular Ganhos
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={handleExploration}
            className="p-2 text-xs font-medium bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
          >
            Explorar (+50)
          </button>
          <button 
            onClick={handleCheckIn}
            className="p-2 text-xs font-medium bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
          >
            Vibe (+100)
          </button>
          <button 
            onClick={handleWalletUse}
            className="p-2 text-xs font-medium bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
          >
            Gastar (+150)
          </button>
        </div>
      </div>
    </div>
  );
};
