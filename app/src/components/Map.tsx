'use client';
import { motion } from 'framer-motion';

export default function Map() {
  const pins = [
    { id: 1, top: '20%', left: '30%', active: true },
    { id: 2, top: '50%', left: '70%', active: false },
    { id: 3, top: '80%', left: '40%', active: true },
    { id: 4, top: '40%', left: '20%', active: false },
    { id: 5, top: '70%', left: '80%', active: true },
  ];

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-[#0A0E1A]/80 backdrop-blur-xl">
      {/* Fake Map Background - Malha topográfica abstrata/grid */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at center, #00D4FF 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent opacity-80" />

      {/* Pins dos Usuários */}
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute z-10"
          style={{ top: pin.top, left: pin.left }}
        >
          <motion.div
            animate={
              pin.active
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0, 0.7],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 rounded-full ${pin.active ? 'bg-[#00D4FF]' : 'bg-white/40'} blur-md`}
          />
          <div className={`relative w-3 h-3 rounded-full border border-white/50 ${pin.active ? 'bg-[#00D4FF] shadow-[0_0_15px_#00D4FF]' : 'bg-white/50'}`} />
        </div>
      ))}

      {/* Central User Pin (Você) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[#00D4FF] blur-xl"
        />
        <div className="relative w-5 h-5 rounded-full bg-white border-2 border-[#00D4FF] shadow-[0_0_20px_#00D4FF]" />
      </div>
    </div>
  );
}
