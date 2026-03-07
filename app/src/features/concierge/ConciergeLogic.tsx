import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ConciergeLogic: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [weather, setWeather] = useState('Sunny');
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    // Mock logic for time and weather
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;
    
    setTimeOfDay(isNight ? 'Night' : 'Day');
    setWeather(isNight ? 'Clear Night' : 'Sunny');

    if (isNight) {
      setSuggestion("Wind down your day. Review tomorrow's schedule and set your morning alarm.");
    } else {
      setSuggestion("Prime time for deep work. Let's tackle the high-priority tasks first.");
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 backdrop-blur-xl bg-black/40 rounded-3xl border border-[#D4AF37]/25 w-full max-w-md mx-auto shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-full h-32 bg-[#D4AF37] opacity-10 blur-[60px] pointer-events-none rounded-full" />
      <h2 className="text-xl font-semibold tracking-wider uppercase text-[#D4AF37] mb-6">
        Pillar 1: Concierge Preditivo
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Current Time:</span>
          <span className="text-[#D4AF37] font-semibold">{timeOfDay}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Weather:</span>
          <span className="text-[#D4AF37] font-semibold">{weather}</span>
        </div>
        <div className="mt-4 p-4 bg-black/40 border border-[#D4AF37]/30 rounded-lg">
          <p className="text-[#D4AF37] text-sm leading-relaxed">
            {suggestion}
          </p>
        </div>
      </div>
    </motion.div>
  );
};