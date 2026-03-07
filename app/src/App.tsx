import { useState, Component, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoodOnboarding } from './components/MoodOnboarding'
import { ElitePassDashboard } from './components/ElitePassDashboard'
import { EliteShowcase } from './components/EliteShowcase'
import { ThreeDollhouse } from './components/ThreeDollhouse'
import { WrapperStatus } from './components/WrapperStatus'
import { User, Settings, Crown, Activity, LayoutTemplate as Layout, Box, Compass as Navigation } from 'lucide-react'

// Error Boundary Minimalista para proteger o App de falhas no 3D
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#030303]">
          <div className="p-8 rounded-[32px] border border-white/5 bg-white/5 backdrop-blur-2xl text-center shadow-2xl">
            <h2 className="text-xl font-light tracking-widest text-white mb-2 uppercase">Falha 3D</h2>
            <p className="text-gray-500 text-sm">O módulo imersivo está temporariamente indisponível.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

type Tab = 'mood' | 'elite' | 'showcase' | '3d' | 'wrapper'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('elite')

  // Editorial Entrance - Staggered clip-path reveal
  const navVariants = {
    initial: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 20 },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
  };

  const tabVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98, clipPath: 'inset(20% 0% 0% 0%)', filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.96, clipPath: 'inset(0% 0% 20% 0%)', filter: 'blur(10px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-[#E5C158]/30 overflow-x-hidden">
      {/* Background Noise & Elite Glow - Nocturnal Gold */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37] opacity-[0.08] blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 opacity-[0.08] blur-[120px] rounded-full"></div>
      </div>

      {/* Top Nav (Dual-Modality: Tight Desktop, Fluid Mobile with Editorial Entrance) */}
      <motion.nav 
        variants={navVariants}
        initial="initial"
        animate="animate"
        className="fixed top-0 left-0 w-full pt-4 md:pt-8 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center z-50 pointer-events-none gap-4 md:gap-0"
      >
        <div className="text-lg md:text-xl font-bold tracking-[0.3em] text-white uppercase flex items-center gap-3 md:gap-4 pointer-events-auto self-start md:self-auto w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#E5C158] animate-pulse shadow-[0_0_15px_#E5C158]"></div>
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-2xl">Sovereign</span>
          </div>
          
          {/* Mobile Profile/Settings Controls */}
          <div className="flex md:hidden gap-2 pointer-events-auto">
            <motion.button whileHover={{ rotate: 180 }} whileTap={{ scale: 0.9 }} className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-gray-400 hover:text-white transition-all backdrop-blur-md"><Settings size={18} /></motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-gray-400 hover:text-white transition-all backdrop-blur-md"><User size={18} /></motion.button>
          </div>
        </div>

        {/* Fluid Tab Navigation - Scrollable on mobile, Bento-tight on desktop */}
        <div className="flex gap-1 md:gap-2 text-white pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-3xl p-1.5 md:p-2.5 rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] w-full md:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-start md:justify-center">
          {[
            { id: 'mood', icon: Activity, label: 'Mood' },
            { id: 'wrapper', icon: Navigation, label: 'Concierge' },
            { id: 'showcase', icon: Layout, label: 'Showcase' },
            { id: '3d', icon: Box, label: '3D Lab' },
            { id: 'elite', icon: Crown, label: 'Dashboard' }
          ].map(({ id, icon: Icon, label }) => (
            <motion.button 
              key={id}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,175,55,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(id as Tab)}
              className={`relative flex items-center gap-2 px-4 py-3 md:p-3.5 rounded-[1.5rem] transition-all duration-500 shrink-0 ${activeTab === id ? 'text-[#E5C158] bg-white/[0.03]' : 'text-gray-500 hover:text-gray-200'}`}
              title={label}
            >
              {activeTab === id && (
                <motion.div 
                  layoutId="active-tab" 
                  className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent rounded-[1.5rem] border border-[#D4AF37]/20" 
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="text-xs font-medium tracking-wide relative z-10 md:hidden block">{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Desktop Profile/Settings Controls */}
        <div className="hidden md:flex gap-3 pointer-events-auto">
          <motion.button whileHover={{ rotate: 180, scale: 1.05 }} className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl text-gray-500 hover:text-white transition-all backdrop-blur-xl shadow-2xl hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"><Settings size={20} /></motion.button>
          <motion.button whileHover={{ y: -2, scale: 1.05 }} className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl text-gray-500 hover:text-white transition-all backdrop-blur-xl shadow-2xl hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"><User size={20} /></motion.button>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="min-h-screen relative z-10 pb-20 md:pb-0">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {activeTab === 'mood' && (
              <motion.div key="mood" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-36 md:pt-40 px-4 md:px-8">
                <MoodOnboarding />
              </motion.div>
            )}
            {activeTab === 'wrapper' && (
              <motion.div key="wrapper" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-36 md:pt-20 px-4 md:px-8 flex justify-center items-center min-h-[90vh]">
                <WrapperStatus />
              </motion.div>
            )}
            {activeTab === 'showcase' && (
              <motion.div key="showcase" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-36 md:pt-24">
                <EliteShowcase />
              </motion.div>
            )}
            {activeTab === '3d' && (
              <motion.div key="3d" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-36 md:pt-24">
                <ThreeDollhouse />
              </motion.div>
            )}
            {activeTab === 'elite' && (
              <motion.div key="elite" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-36 md:pt-40 px-4 md:px-8">
                <ElitePassDashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </ErrorBoundary>
      </main>
    </div>
  )
}

export default App