import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bufferSteps = [
  { id: 'search', label: 'Busca' },
  { id: 'uber_try', label: 'Tentativa Uber' },
  { id: 'uber_fail', label: 'Falha' },
  { id: 'bolt_switch', label: 'Switching para Bolt' },
  { id: 'success', label: 'Sucesso' },
];

export const WrapperStatus = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Simulação do fluxo para demonstração do real-time
  useEffect(() => {
    if (currentStep < bufferSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Spring Physics configurations
  const springConfig: any = {
    type: "spring" as const,
    stiffness: 250,
    damping: 20,
    mass: 0.5
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] p-6 font-sans">
      {/* Glassmorphism Wrapper Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={springConfig}
        className="relative w-full max-w-md p-8 overflow-hidden backdrop-blur-xl bg-black/40"
        style={{ 
          borderRadius: '32px',
          border: '1px solid rgba(212, 175, 55, 0.25)', // Nocturnal Gold border
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.1)'
        }}
      >
        {/* Glow / Gradient Effect Dourado */}
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-full h-32 bg-[#D4AF37] opacity-10 blur-[60px] pointer-events-none rounded-full" />

        <div className="relative z-10">
          <motion.div 
            className="flex items-center justify-between mb-8"
            layout
          >
            <h2 
              className="text-xl font-semibold tracking-wider uppercase text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #FFF, #D4AF37)' }}
            >
              Concierge Buffer
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-xs text-[#D4AF37] opacity-80 tracking-widest uppercase">Live</span>
            </div>
          </motion.div>

          <div className="space-y-3 relative">
            {/* Linha guia do fluxo vertical */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/20 to-transparent z-0" />

            {bufferSteps.map((step, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              const isError = step.id === 'uber_fail';

              // Cores baseadas no estado
              let dotColor = 'rgba(255, 255, 255, 0.1)';
              let textColor = 'rgba(255, 255, 255, 0.4)';
              
              if (isActive) {
                dotColor = isError ? '#EF4444' : '#D4AF37';
                textColor = '#FFFFFF';
              } else if (isPast) {
                dotColor = isError ? '#EF4444' : 'rgba(212, 175, 55, 0.4)';
                textColor = 'rgba(255, 255, 255, 0.7)';
              }

              return (
                <motion.div
                  key={step.id}
                  layout
                  transition={springConfig}
                  className="relative z-10 flex items-center gap-5 p-3 rounded-2xl transition-colors duration-300"
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                  }}
                >
                  {/* Indicator Dot */}
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <motion.div
                      layout
                      className="absolute w-2.5 h-2.5 rounded-full z-10"
                      style={{ backgroundColor: dotColor }}
                      animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                      transition={isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                    />
                    {isActive && (
                      <motion.div 
                        className="absolute w-6 h-6 rounded-full opacity-20"
                        style={{ backgroundColor: dotColor }}
                        animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span 
                    className="text-sm font-medium tracking-wide transition-colors duration-300" 
                    style={{ color: textColor }}
                  >
                    {step.label}
                  </span>
                  
                  {/* Active Processing Indicator */}
                  {isActive && !isPast && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-auto flex space-x-1 opacity-60"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span 
                          key={i}
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: dotColor }}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WrapperStatus;