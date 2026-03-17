"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConcierge } from "@/components/ConciergeContext";
import { GlassCard } from "@/components/GlassCard";
import { 
  Car, 
  Utensils, 
  Hotel, 
  Wallet, 
  ChevronRight, 
  Star, 
  Clock, 
  Zap,
  MapPin,
  Shield,
  Briefcase,
  Home,
  Users,
  Globe,
  Dog,
  Heart,
  TrendingUp,
  LayoutGrid
} from "lucide-react";
import { ElitePass } from "@/components/dashboard/ElitePass";
import { DollhouseMap } from "@/components/dashboard/DollhouseMap";
import { ARDishView } from "@/components/dashboard/ARDishView";
import { ItineraryFeed } from "@/components/dashboard/ItineraryFeed";

// --- Data Types & Mocks ---

const SERVICES = {
  transport: [
    { id: "t1", name: "Uber Black", provider: "UBER" as const, price: "€25.00", eta: "4 min", rating: 4.9, image: "🚗" },
    { id: "t2", name: "Bolt Premium", provider: "BOLT" as const, price: "€22.50", eta: "6 min", rating: 4.8, image: "🚙" },
    { id: "t3", name: "Executive Limo", provider: "FREE_NOW" as const, price: "€85.00", eta: "15 min", rating: 5.0, image: "🏎️" },
    { id: "t4", name: "Chauffeur Service", provider: "UBER" as const, price: "€120.00", eta: "20 min", rating: 5.0, image: "👔" },
  ],
  restaurants: [
    { id: "r1", name: "Alma", cuisine: "Portuguese Modern", rating: 4.9, time: "19:30", image: "🍽️" },
    { id: "r2", name: "Belcanto", cuisine: "Contemporary", rating: 5.0, time: "20:00", image: "🍷" },
    { id: "r3", name: "JNcQUOI", cuisine: "Luxury Dining", rating: 4.7, time: "21:00", image: "🍸" },
    { id: "r4", name: "Eleven", cuisine: "Fine Dining", rating: 4.8, time: "19:00", image: "🕯️" },
  ],
  hotels: [
    { id: "h1", name: "Four Seasons", price: "€650/night", rating: 4.9, perks: "Spa & View", image: "🏨" },
    { id: "h2", name: "Ritz-Carlton", price: "€580/night", rating: 4.8, perks: "Rooftop Pool", image: "🏙️" },
    { id: "h3", name: "Bairro Alto Hotel", price: "€420/night", rating: 4.7, perks: "Historic Center", image: "🏛️" },
    { id: "h4", name: "Tivoli Avenida", price: "€390/night", rating: 4.6, perks: "Luxury Suite", image: "🌆" },
  ],
  family: [
    { id: "f1", name: "Elite Nanny", detail: "Bilingual • CPR Cert", rating: 5.0, status: "Available", image: "🍼" },
    { id: "f2", name: "Health Passport", detail: "Global VIP Coverage", rating: 4.9, status: "Active", image: "🏥" },
    { id: "f3", name: "School Advisor", detail: "Top 10 Placement", rating: 5.0, status: "Assigned", image: "🎓" },
  ],
  mobility: [
    { id: "m1", name: "NetJets Charter", detail: "Lisbon - London", rating: 5.0, price: "€ 4.5k/hr", image: "🛩️" },
    { id: "m2", name: "Yacht Rental", detail: "Ocean Independence", rating: 4.9, price: "€ 15k/day", image: "🚤" },
    { id: "m3", name: "Heli-Taxi", detail: "Cascais Transfer", rating: 4.8, price: "€ 850", image: "🚁" },
  ],
  pets: [
    { id: "p1", name: "VIP Pet Spa", detail: "Full Grooming • Chiado", rating: 4.9, status: "Booked", image: "🐩" },
    { id: "p2", name: "Pet Relocation", detail: "Global Door-to-Door", rating: 5.0, status: "Ready", image: "✈️" },
    { id: "p3", name: "Dog Concierge", detail: "Training & Walking", rating: 4.7, status: "Available", image: "🐕" },
  ]
};

// --- Components ---

const Swimlane = ({ title, items, onAction, actionIcon: ActionIcon, categoryIcon: CategoryIcon }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6 py-8 border-t border-white/5 first:border-t-0">
      <div className="flex items-center justify-between px-4 sm:px-0">
        <div className="flex items-center gap-3">
          {CategoryIcon && <div className="p-2 rounded-xl bg-gold/10 text-gold"><CategoryIcon size={20} /></div>}
          <h2 className="text-xl font-black tracking-tight gold-gradient-text uppercase tracking-[0.2em]">{title}</h2>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-gold/60 hover:text-gold flex items-center gap-1 transition-all group">
          Browse All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-4 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item: any, idx: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="flex-shrink-0"
          >
            <GlassCard className="w-64 h-80 p-0 overflow-hidden relative group border-white/5 hover:border-gold/40">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors" />
              
              {/* Image/Icon Area */}
              <div className="h-40 flex items-center justify-center text-7xl bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors relative">
                <span className="drop-shadow-2xl">{item.image}</span>
                {item.status === "Active" && (
                   <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-[8px] font-black uppercase tracking-tighter border border-green-500/30">
                     <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                     Live
                   </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 relative z-20 flex flex-col justify-between h-40">
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-gold transition-colors">{item.name}</h3>
                  <p className="text-xs text-white/50 mt-2 font-medium">
                    {item.detail || item.cuisine || item.perks || `${item.eta} • ${item.price}`}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-gold fill-gold" />
                    <span className="text-xs font-bold tabular-nums">{item.rating}</span>
                  </div>
                  
                  <button 
                    onClick={() => onAction(item)}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-gold text-white/60 hover:text-black transition-all duration-300 border border-white/10 hover:border-gold"
                  >
                    <ActionIcon size={18} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
        
        {/* View All Card */}
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex-shrink-0 flex items-center justify-center w-20 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-gold group-hover:text-gold transition-all">
            <ChevronRight size={24} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { requestTransport, currentStatus } = useConcierge();
  const [wallet, setWallet] = useState<number | null>(null);
  const [availability, setAvailability] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [treasury, setTreasury] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, wrapperRes, propertyRes, treasuryRes] = await Promise.all([
          fetch('/api/wallet'),
          fetch('/api/wrapper'),
          fetch('/api/property-hunter'),
          fetch('/api/treasury')
        ]);
        
        const walletJson = await walletRes.json();
        const wrapperJson = await wrapperRes.json();
        const propertyJson = await propertyRes.json();
        const treasuryJson = await treasuryRes.json();
        
        setWallet(walletJson.data.balance);
        setAvailability(wrapperJson.data);
        setProperties(propertyJson.data);
        setTreasury(treasuryJson.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTransportRequest = (item: any) => {
    requestTransport("Aeroporto Lisboa (LIS)", item.provider);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-t-2 border-gold animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Zap size={32} className="text-gold animate-pulse" />
          </div>
        </div>
        <div className="text-gold font-black tracking-[0.3em] text-sm animate-pulse uppercase">
          Initializing Elite OS
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-gold/30">
      
      {/* --- Progress Indicator --- */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-gold"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 space-y-12">
        
        {/* --- Top Navigation / Header --- */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-black uppercase tracking-widest border border-gold/20">Sovereign Tier</span>
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">System Online</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              WELCOME, <span className="gold-gradient-text">MATEUS</span>
            </h1>
            <p className="text-white/40 flex items-center gap-2 font-medium text-sm">
              <MapPin size={16} className="text-gold" /> Lisbon, Portugal • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Quick Action: Escudo Jurídico */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all group shadow-lg shadow-red-500/5"
            >
              <Shield size={20} className="group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <span className="block text-[8px] font-black uppercase tracking-widest leading-none">Emergency</span>
                <span className="text-sm font-black uppercase">Escudo Jurídico</span>
              </div>
            </motion.button>

            <GlassCard className="flex-row items-center gap-6 py-4 px-8 border-gold/20 flex-1 lg:flex-none">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gold font-black">Elite Wallet</span>
                <span className="text-2xl font-black tabular-nums">€ {wallet?.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                <Wallet size={24} />
              </div>
            </GlassCard>
          </div>
        </header>

        {/* --- Category Filter / Navigation --- */}
        <nav className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
           {["all", "mobility", "financial", "real-estate", "family", "lifestyle"].map((cat) => (
             <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-gold text-black shadow-lg shadow-gold/20" 
                  : "bg-white/5 text-white/40 hover:bg-white/10"
                }`}
             >
               {cat.replace('-', ' ')}
             </button>
           ))}
        </nav>

        {/* --- Phase 4: Gamification & Immersive UI --- */}
        <ElitePass />

        {/* --- Status Banner (If Concierge is Active) --- */}
        <AnimatePresence>
          {currentStatus && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
            >
              <GlassCard className="border-gold/40 bg-gold/5 flex-row items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold animate-bounce">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gold uppercase text-[10px] tracking-widest">Concierge Active</h4>
                    <p className="text-sm font-bold">Requesting <span className="text-gold">{currentStatus.preferredProvider}</span> to <span className="underline decoration-gold/50 underline-offset-4">{currentStatus.destination}</span></p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Mission Status</span>
                  <span className="text-xs font-black tracking-[0.2em] text-gold">{currentStatus.status}</span>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Hero / Main CTA Section --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GlassCard className="lg:col-span-2 h-[400px] relative overflow-hidden group border-white/5">
            <div className="absolute top-0 right-0 p-8 z-20">
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 rounded-full border border-gold/30 bg-black/60 backdrop-blur-xl text-[10px] font-black text-gold uppercase tracking-[0.1em] shadow-2xl">
                  305 Pillars Integrated
                </div>
              </div>
            </div>
            <div className="relative z-20 h-full flex flex-col justify-end p-2">
              <h2 className="text-5xl md:text-7xl font-black mb-4 leading-[0.9] tracking-tighter">THE WORLD,<br/><span className="gold-gradient-text">AT YOUR FINGERTIPS.</span></h2>
              <p className="text-white/60 max-w-md mb-8 font-medium leading-relaxed">
                Your sovereign AI orchestrates every pilar of your life. Real estate, treasury, and lifestyle, harmonized in one elite interface.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-gold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
                  NEW REQUEST
                </button>
                <button className="px-10 py-5 bg-white/5 hover:bg-white/10 font-black rounded-2xl transition-all border border-white/10 flex items-center gap-2">
                  <LayoutGrid size={18} />
                  ALL MODULES
                </button>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px] group-hover:bg-gold/20 transition-all duration-1000" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          </GlassCard>

          <div className="grid grid-cols-1 gap-8">
             <GlassCard className="border-l-4 border-l-gold bg-gradient-to-br from-gold/5 to-transparent">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 text-gold">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-[10px] font-black text-gold/60 uppercase tracking-widest">Treasury Score</span>
                </div>
                <div>
                  <h3 className="text-xl font-black mt-4">{treasury?.optimization_score}% Optimized</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-white/50 font-medium">Tax Saved: <span className="text-white font-bold">{treasury?.tax_saved_this_year}</span></span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-white/30 uppercase font-bold">Next Milestone</span>
                    <span className="text-[10px] text-gold font-black">{treasury?.next_deadline}</span>
                  </div>
                </div>
             </GlassCard>

             <GlassCard className="border-l-4 border-l-blue-500/50 bg-gradient-to-br from-blue-500/5 to-transparent">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 text-blue-400">
                    <Globe size={24} />
                  </div>
                  <span className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest">Smart City</span>
                </div>
                <div>
                  <h3 className="text-xl font-black mt-4">Lisbon Node</h3>
                  <p className="text-xs text-white/50 mt-2 font-medium">Air Quality: <span className="text-green-400 font-bold">Optimal (A+)</span></p>
                  <p className="text-xs text-white/50 mt-1 font-medium">Power Grid: <span className="text-white font-bold">98% Efficient</span></p>
                </div>
             </GlassCard>
          </div>
        </section>

        {/* --- Phase 4: Immersive 3D & AR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                 <div className="w-1 h-4 bg-gold rounded-full" />
                 <h3 className="text-xs font-black uppercase tracking-widest text-white/60">Digital Twin Visualization</h3>
              </div>
              <DollhouseMap />
           </div>
           <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                 <div className="w-1 h-4 bg-gold rounded-full" />
                 <h3 className="text-xs font-black uppercase tracking-widest text-white/60">Augmented Reality Preview</h3>
              </div>
              <ARDishView />
           </div>
        </div>

        {/* --- Real Estate Section (Property Hunter API) --- */}
        {(activeCategory === "all" || activeCategory === "real-estate") && (
          <Swimlane 
            title="Property Hunter" 
            items={properties.map(p => ({
              ...p,
              name: p.title,
              detail: `${p.type} • ${p.features.join(", ")}`,
              rating: 5.0 // Properties are always top tier
            }))} 
            onAction={() => {}}
            actionIcon={ChevronRight}
            categoryIcon={Home}
          />
        )}

        {/* --- Mobility Section --- */}
        {(activeCategory === "all" || activeCategory === "mobility") && (
          <Swimlane 
            title="Elite Mobility" 
            items={SERVICES.mobility} 
            onAction={() => {}}
            actionIcon={Zap}
            categoryIcon={Car}
          />
        )}

        {/* --- Financial / Treasury Section --- */}
        {(activeCategory === "all" || activeCategory === "financial") && (
          <Swimlane 
            title="Quantum Treasury" 
            items={[
              { id: "t1", name: "Tax Optimization", detail: treasury?.recommendations[0], rating: 5.0, image: "⚖️" },
              { id: "t2", name: "Yield Farming", detail: "Crypto Strategy Alpha", rating: 4.8, image: "🚜" },
              { id: "t3", name: "Offshore Setup", detail: "Cayman/BVI Solutions", rating: 5.0, image: "🏝️" },
            ]} 
            onAction={() => {}}
            actionIcon={TrendingUp}
            categoryIcon={Briefcase}
          />
        )}

        {/* --- Transport Section --- */}
        {(activeCategory === "all" || activeCategory === "mobility") && (
          <Swimlane 
            title="Sovereign Transport" 
            items={SERVICES.transport} 
            onAction={handleTransportRequest}
            actionIcon={Zap}
            categoryIcon={Globe}
          />
        )}

        {/* --- Family Section --- */}
        {(activeCategory === "all" || activeCategory === "family") && (
          <Swimlane 
            title="Family & Legacy" 
            items={SERVICES.family} 
            onAction={() => {}}
            actionIcon={Heart}
            categoryIcon={Users}
          />
        )}

        {/* --- Pets Section --- */}
        {(activeCategory === "all" || activeCategory === "lifestyle") && (
          <Swimlane 
            title="Elite Pets" 
            items={SERVICES.pets} 
            onAction={() => {}}
            actionIcon={Dog}
            categoryIcon={Dog}
          />
        )}
        
        {/* --- Existing Lifestyle Sections --- */}
        {(activeCategory === "all" || activeCategory === "lifestyle") && (
          <>
            <Swimlane 
              title="Elite Dining" 
              items={SERVICES.restaurants} 
              onAction={() => {}}
              actionIcon={Star}
              categoryIcon={Utensils}
            />

            <Swimlane 
              title="Luxurious Stays" 
              items={SERVICES.hotels} 
              onAction={() => {}}
              actionIcon={ChevronRight}
              categoryIcon={Hotel}
            />
          </>
        )}

        {/* --- Phase 4: Social/Itineraries --- */}
        <section className="pt-8">
           <div className="flex items-center justify-between mb-8 px-1">
              <h2 className="text-2xl font-black gold-gradient-text uppercase tracking-[0.2em]">Live Itineraries</h2>
              <button className="text-xs font-black text-white/40 uppercase tracking-widest hover:text-gold transition-colors">Global Feed</button>
           </div>
           <ItineraryFeed />
        </section>

        {/* --- Footer Padding & Info --- */}
        <footer className="pt-20 pb-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
              <div className="text-xl font-black tracking-tighter mb-2">IN-HERE <span className="text-gold">OS</span></div>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">The Sovereign Super-App • v12.0.4</p>
           </div>
           <div className="flex gap-8">
              <div className="flex flex-col items-center md:items-end">
                 <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Security Level</span>
                 <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Encrypted / Military Grade</span>
              </div>
              <div className="flex flex-col items-center md:items-end">
                 <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Network Status</span>
                 <span className="text-[10px] font-black text-gold uppercase tracking-widest">Quantum Link Active</span>
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
}
