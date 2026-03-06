import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { Play, Info, Heart, Share2, ChevronRight, Star, Zap, Activity } from 'lucide-react';

const showcaseData = [
  {
    category: "Vibe Meter: Gastronomia Sovereign",
    items: [
      { id: 1, title: "Bacalhau à Brás Desconstruído", type: "Belcanto, Lisboa", image: "https://images.unsplash.com/photo-1544025162-836901f46399?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€", rating: 4.9, span: "col-span-2 row-span-2" },
      { id: 2, title: "Degustação no Douro", type: "Quinta do Crasto", image: "https://images.unsplash.com/photo-1551326844-4fdcbf370170?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€", rating: 4.8, span: "col-span-1 row-span-1" },
      { id: 3, title: "Polvo à Lagareiro", type: "Solar dos Presuntos", image: "https://images.unsplash.com/photo-1599084922119-94b63eb4d805?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€", rating: 4.7, span: "col-span-1 row-span-1" },
    ]
  },
  {
    category: "Elite Lifestyle: Eventos & Nightlife",
    items: [
      { id: 6, title: "Yacht Party Cascais", type: "Private Charter", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€€", rating: 5.0, span: "col-span-1 row-span-2" },
      { id: 7, title: "Sunset Algarve VIP", type: "Purobeach Vilamoura", image: "https://images.unsplash.com/photo-1533654793924-4fc4949ef7af?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€", rating: 4.9, span: "col-span-2 row-span-1" },
      { id: 8, title: "Tour de Vinhos Alentejo", type: "Herdade do Esporão", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€", rating: 4.8, span: "col-span-1 row-span-1" },
      { id: 9, title: "Lisboa Fashion Week VIP", type: "Pátio da Galé", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€", rating: 4.7, span: "col-span-1 row-span-1" },
    ]
  }
];

const BentoCard = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (isHovered) {
      hoverTimeoutRef.current = setTimeout(() => setShowVideo(true), 1200);
    } else {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setShowVideo(false);
    }
    return () => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); };
  }, [isHovered]);

  return (
    <motion.div 
      className={`relative rounded-[32px] overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 group ${item.span}`}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.2)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        {!showVideo ? (
          <motion.img 
            key="img"
            src={item.image} 
            alt={item.title} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <motion.video 
            key="video"
            src={item.video} 
            autoPlay 
            muted 
            loop 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#D4AF37] text-black px-3 py-1 rounded-full">Elite Select</span>
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star size={12} className="fill-[#D4AF37]" />
              <span className="text-xs font-bold">{item.rating}</span>
            </div>
          </div>
          <h4 className="text-3xl font-serif text-white mb-2 leading-tight">{item.title}</h4>
          <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.type} • {item.price}</p>
            <div className="flex gap-4">
              <Play size={18} className="text-white hover:text-[#D4AF37] transition-colors" />
              <Heart size={18} className="text-white hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const EliteShowcase = () => {
  return (
    <div className="w-full bg-[#030303] min-h-screen pt-40 pb-20 px-6 md:px-12 select-none">
      <div className="mb-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-[#D4AF37]"></div>
          <h2 className="text-[#D4AF37] tracking-widest uppercase text-xs font-semibold">Vibe Meter Intelligence</h2>
        </motion.div>
        <h2 className="text-6xl md:text-8xl text-white font-serif font-black tracking-tighter leading-none">
          O Pulso de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white italic">Portugal</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3">
            <Activity className="text-[#D4AF37]" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Lisboa: High Intensity</span>
          </div>
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3">
            <Zap className="text-[#D4AF37]" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">84 Locais Verificados</span>
          </div>
        </div>
      </div>

      {showcaseData.map((section, idx) => (
        <div key={idx} className="mb-24">
          <h3 className="text-white text-2xl font-serif mb-8 flex justify-between items-end">
            {section.category}
            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              Explorar <ChevronRight size={14} />
            </button>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
            {section.items.map(item => (
              <BentoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EliteShowcase;