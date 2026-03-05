import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

// Mock data
const showcaseData = [
  {
    category: "Vibe Meter: Experiências Gastronômicas",
    items: [
      { id: 1, title: "Bacalhau à Brás Desconstruído", type: "dish", image: "https://images.unsplash.com/photo-1544025162-836901f46399?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 2, title: "Degustação no Douro", type: "event", image: "https://images.unsplash.com/photo-1551326844-4fdcbf370170?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 3, title: "Polvo à Lagareiro", type: "dish", image: "https://images.unsplash.com/photo-1599084922119-94b63eb4d805?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 4, title: "Jantar Fado Alfama", type: "event", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 5, title: "Pastel de Nata Premium", type: "dish", image: "https://images.unsplash.com/photo-1615822152661-bc84990dcecd?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  },
  {
    category: "Vibe Meter: Eventos Exclusivos",
    items: [
      { id: 6, title: "Festa no Iate Cascais", type: "event", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 7, title: "Sunset Algarve", type: "event", image: "https://images.unsplash.com/photo-1533654793924-4fc4949ef7af?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 8, title: "Tour de Vinhos Alentejo", type: "event", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  }
];

const ItemCard = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // AI Focal Point - Simulated
  const focalX = useMotionValue(50);
  const focalY = useMotionValue(50);

  useEffect(() => {
    if (isHovered) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 1500); // 1.5s delay for video preview
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
    
    // Smooth AI Focal Point simulation (dynamically shifting focus based on interaction)
    focalX.set(x);
    focalY.set(y);
  };

  return (
    <motion.div 
      className="relative flex-shrink-0 w-72 h-44 rounded-md overflow-hidden cursor-pointer group origin-center"
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {!showVideo ? (
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-300"
          style={{ objectPosition: `${focalX.get()}% ${focalY.get()}%` }}
        />
      ) : (
        <video 
          src={item.video} 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-white font-semibold text-sm drop-shadow-md">{item.title}</h4>
        <p className="text-xs text-gray-300 mt-1 capitalize">{item.type}</p>
      </div>
    </motion.div>
  );
};

const Swimlane = ({ category, items }: { category: string, items: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraintRight, setConstraintRight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      // Calculate max drag distance based on content width vs window
      setConstraintRight(-Math.max(0, scrollWidth - clientWidth + 96));
    }
  }, [items]);

  return (
    <div className="mb-10">
      <h3 className="text-white text-xl font-bold mb-4 px-12">{category}</h3>
      <div className="relative px-12 overflow-visible">
        <motion.div 
          ref={containerRef}
          className="flex gap-4 py-4"
          drag="x"
          dragConstraints={{ left: constraintRight, right: 0 }}
          dragElastic={0.2} // Rubber-banding physics (elastic overscroll)
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
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
    <div className="w-full bg-[#141414] min-h-screen py-16 overflow-hidden select-none">
      <h2 className="text-3xl text-white font-extrabold px-12 mb-8">Destaques Elite</h2>
      {showcaseData.map((swimlane, idx) => (
        <Swimlane key={idx} category={swimlane.category} items={swimlane.items} />
      ))}
    </div>
  );
};

export default EliteShowcase;
