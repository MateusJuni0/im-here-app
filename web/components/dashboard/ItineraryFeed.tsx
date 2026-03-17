"use client";

import { motion } from "framer-motion";
import { ChevronRight, Play, Star, Clock, MapPin } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

const itineraries = [
  { 
    id: 1, 
    title: "Lisbon Noir", 
    desc: "A moody, high-end exploration of the city's best hidden bars.", 
    rating: 4.9, 
    duration: "6h",
    spots: 5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 2, 
    title: "Riviera Speed", 
    desc: "Luxury supercar tour along the Estoril coast.", 
    rating: 5.0, 
    duration: "4h",
    spots: 3,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 3, 
    title: "Vintage Douro", 
    desc: "Private helicopter tour and wine tasting in the valley.", 
    rating: 4.8, 
    duration: "12h",
    spots: 2,
    image: "https://images.unsplash.com/photo-1543059152-4293e561df89?q=80&w=1974&auto=format&fit=crop"
  },
];

export const ItineraryFeed = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tighter uppercase gold-gradient-text">Copyable Itineraries</h2>
        <button className="text-sm text-white/40 hover:text-white flex items-center gap-1 transition-colors uppercase font-bold tracking-widest">
          Browse All <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {itineraries.map((item, idx) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
          >
            <GlassCard className="p-0 overflow-hidden relative h-[450px]">
              {/* Fake Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded-md bg-gold text-black text-[10px] font-black uppercase tracking-tighter">
                      TOP RATED
                    </div>
                    <div className="flex items-center gap-1 text-gold">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{item.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black tracking-tighter leading-none">{item.title}</h3>
                  <p className="text-sm text-white/70 line-clamp-2 font-medium">
                    {item.desc}
                  </p>
                  
                  <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={12} /> {item.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {item.spots} Spots</span>
                  </div>

                  <div className="pt-4 flex gap-2">
                     <button className="flex-1 py-3 bg-white text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-gold transition-colors">
                        <Play size={14} fill="currentColor" /> Preview
                     </button>
                     <button className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-black text-xs uppercase transition-colors">
                        Copy
                     </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
