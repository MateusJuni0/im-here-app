import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bufferSteps = [
  { id: 'search', label: 'Localizando Motorista Elite' },
  { id: 'uber_try', label: 'Negociando Prioridade (Uber Black)' },
  { id: 'uber_fail', label: 'Tempo Limite Excedido' },
  { id: 'bolt_switch', label: 'Transicionando para Rede Bolt' },
  { id: 'success', label: 'Motorista Confirmado' },
];

export const WrapperStatus = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < bufferSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, clipPath: 'inset(100% 0 0 0)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[70vh] p-4 md:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg p-6 md:p-10 overflow-hidden backdrop-blur-2xl bg-[#030303]/60"
        style={{ 
          borderRadius: 'clamp(24px, 4vw, 32px)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(212,175,55,0.05)'
        }}
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-[#D4AF37] opacity-[0.08] blur-[80px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#D4AF37] opacity-[0.05] blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10">
          <motion.div 
            className="flex items-center justify-between mb-10"
            layout
          >
            <div>
              <h2 
                className="text-2xl font-light tracking-[0.2em] uppercase text-white mb-1"
                style={{ backgroundImage: 'linear-gradient(135deg, #FFF 0%, #E5C158 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Concierge
              </h2>
              <p className="text-[#D4AF37]/50 text-xs tracking-widest uppercase font-medium">Rede de Transporte Elite</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C158] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E5C158]"></span>
              </span>
              <span className="text-[10px] text-[#E5C158] opacity-90 tracking-widest uppercase font-bold">Live Status</span>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-1 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute left-[23px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/10 to-transparent z-0" />

            {bufferSteps.map((step, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              const isError = step.id === 'uber_fail';

              let dotColor = 'rgba(255, 255, 255, 0.1)';
              let textColor = 'rgba(255, 255, 255, 0.3)';
              let dotBorder = 'rgba(255, 255, 255, 0.05)';
              
              if (isActive) {
                dotColor = isError ? '#EF4444' : '#E5C158';
                textColor = '#FFFFFF';
                dotBorder = isError ? 'rgba(239, 68, 68, 0.3)' : 'rgba(229, 193, 88, 0.3)';
              } else if (isPast) {
                dotColor = isError ? '#EF4444' : '#D4AF37';
                textColor = 'rgba(255, 255, 255, 0.6)';
                dotBorder = 'transparent';
              }

              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  layout
                  className="relative z-10 flex items-center gap-6 p-4 rounded-2xl transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid transparent',
                    boxShadow: isActive ? '0 10px 30px -10px rgba(212, 175, 55, 0.1)' : 'none'
                  }}
                >
                  <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                    <motion.div
                      layout
                      className="absolute w-2 h-2 rounded-full z-10"
                      style={{ 
                        backgroundColor: dotColor,
                        boxShadow: isActive ? `0 0 10px ${dotColor}` : 'none'
                      }}
                      animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                      transition={isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                    />
                    {isActive && (
                      <motion.div 
                        className="absolute w-6 h-6 rounded-full"
                        style={{ border: `1px solid ${dotBorder}` }}
                        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                      />
                    )}
                  </div>

                  <span 
                    className="text-[13px] md:text-sm tracking-wide transition-colors duration-500 font-medium" 
                    style={{ color: textColor }}
                  >
                    {step.label}
                  </span>
                  
                  <AnimatePresence>
                    {isActive && !isPast && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="ml-auto flex space-x-1.5 opacity-80 overflow-hidden"
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.span 
                            key={i}
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: dotColor }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WrapperStatus;