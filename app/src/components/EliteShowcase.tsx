import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { Play, Info, Heart, Share2, ChevronRight, Star } from 'lucide-react';

// Mock data - Portugal Elite Ecosystem V2
const showcaseData = [
  {
    category: "Vibe Meter: Gastronomia Elite",
    items: [
      { id: 1, title: "Bacalhau à Brás Desconstruído", type: "Belcanto, Lisboa", image: "https://images.unsplash.com/photo-1544025162-836901f46399?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€", rating: 4.9 },
      { id: 2, title: "Degustação no Douro", type: "Quinta do Crasto", image: "https://images.unsplash.com/photo-1551326844-4fdcbf370170?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€", rating: 4.8 },
      { id: 3, title: "Polvo à Lagareiro", type: "Solar dos Presuntos", image: "https://images.unsplash.com/photo-1599084922119-94b63eb4d805?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€", rating: 4.7 },
      { id: 4, title: "Jantar Fado Alfama", type: "Clube de Fado", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€", rating: 4.6 },
      { id: 5, title: "Pastel de Nata Premium", type: "Manteigaria", image: "https://images.unsplash.com/photo-1615822152661-bc84990dcecd?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€", rating: 5.0 },
    ]
  },
  {
    category: "Elite Experiences: Eventos & Lifestyle",
    items: [
      { id: 6, title: "Yacht Party Cascais", type: "Private Charter", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€€", rating: 5.0 },
      { id: 7, title: "Sunset Algarve VIP", type: "Purobeach Vilamoura", image: "https://images.unsplash.com/photo-1533654793924-4fc4949ef7af?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€", rating: 4.9 },
      { id: 8, title: "Tour de Vinhos Alentejo", type: "Herdade do Esporão", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€", rating: 4.8 },
      { id: 9, title: "Lisboa Fashion Week VIP", type: "Pátio da Galé", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4", price: "€€€€", rating: 4.7 },
    ]
  }
];

const ItemCard = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeoutRef = useRef<any>(null);
  
  const focalX = useMotionValue(50);
  const focalY = useMotionValue(50);

  useEffect(() => {
    if (isHovered) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 1500); 
    } else {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setShowVideo(false);
    }
    
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    focalX.set(x);
    focalY.set(y);
  };

  return (
    <motion.div 
      className="relative flex-shrink-0 w-[420px] h-[240px] rounded-xl overflow-hidden cursor-pointer group origin-center shadow-2xl border border-white/5"
      whileHover={{ 
        scale: 1.05, 
        zIndex: 10,
        boxShadow: "0 0 30px rgba(212, 175, 55, 0.2)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
      
      <AnimatePresence mode="wait">
        {!showVideo ? (
          <motion.img 
            key="img"
            src={item.image} 
            alt={item.title} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            style={{ objectPosition: `${focalX.get()}% ${focalY.get()}%` }}
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-500 flex flex-col justify-end p-8">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#D4AF37] text-black px-2 py-0.5 rounded">Elite Select</span>
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star size={10} className="fill-[#D4AF37]" />
              <span className="text-[10px] font-bold">{item.rating}</span>
            </div>
          </div>
          <h4 className="text-2xl font-serif text-white mb-1 drop-shadow-lg">{item.title}</h4>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">{item.type} • <span className="text-[#D4AF37]">{item.price}</span></p>
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
              <Play size={16} className="text-white hover:text-[#D4AF37] transition-colors" />
              <Info size={16} className="text-white hover:text-[#D4AF37] transition-colors" />
              <Heart size={16} className="text-white hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Swimlane = ({ category, items }: { category: string, items: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraintRight, setConstraintRight] = useState(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        setConstraintRight(-Math.max(0, scrollWidth - clientWidth + 96));
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [items]);

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center px-12 mb-6">
        <h3 className="text-white text-2xl font-serif tracking-tight">{category}</h3>
        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
          Explorar Tudo <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="relative px-12 overflow-visible">
        <motion.div 
          ref={containerRef}
          className="flex gap-6 py-6"
          drag="x"
          dragConstraints={{ left: constraintRight, right: 0 }}
          dragElastic={0.15}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
          whileTap={{ cursor: "grabbing" }}
          style={{ cursor: "grab" }}
        >
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const EliteShowcase = () => {
  return (
    <div className="w-full bg-[#030303] min-h-screen pt-32 pb-20 overflow-hidden select-none">
      <div className="px-12 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-px bg-[#D4AF37]"></div>
          <h2 className="text-[#D4AF37] tracking-widest uppercase text-xs font-semibold">Vibe Meter Intelligence</h2>
        </motion.div>
        <h2 className="text-5xl md:text-7xl text-white font-serif font-black tracking-tighter">
          O Pulso de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white italic">Portugal</span>
        </h2>
      </div>

      <div className="space-y-4">
        {showcaseData.map((swimlane, idx) => (
          <Swimlane key={idx} category={swimlane.category} items={swimlane.items} />
        ))}
      </div>

      <div className="px-12 mt-20">
        <div className="p-1 border border-white/5 bg-white/[0.02] rounded-full max-w-fit flex items-center gap-6 pr-8 backdrop-blur-3xl">
          <div className="bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full">
            Status: LIVE
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Scraping Nero ativo • 84 locais verificados hoje em Lisboa
          </p>
        </div>
      </div>
    </div>
  );
};

export default EliteShowcase;
