import { useState, Component, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoodOnboarding } from './components/MoodOnboarding'
import { ElitePassDashboard } from './components/ElitePassDashboard'
import { EliteShowcase } from './components/EliteShowcase'
import { ThreeDollhouse } from './components/ThreeDollhouse'
import { WrapperStatus } from './components/WrapperStatus'
import { LandingLogin } from './components/LandingLogin'
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
          <div className="p-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl text-center shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Falha na Renderização 3D</h2>
            <p className="text-gray-400">Este componente encontra-se temporariamente indisponível.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

type Tab = 'mood' | 'elite' | 'showcase' | '3d' | 'wrapper'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('elite')

  const tabVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <LandingLogin onLogin={() => setIsAuthenticated(true)} />
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-[#D4AF37]/30 overflow-hidden">
      {/* Background Noise & Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37] opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 opacity-10 blur-[120px] rounded-full"></div>
      </div>

      {/* Top Nav (Glassmorphism & Motion) */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none"
      >
        <div className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Elite</span>
        </div>

        <div className="flex gap-2 text-white pointer-events-auto bg-[#030303]/40 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {[
            { id: 'mood', icon: Activity, label: 'Mood' },
            { id: 'wrapper', icon: Navigation, label: 'Wrapper' },
            { id: 'showcase', icon: Layout, label: 'Showcase' },
            { id: '3d', icon: Box, label: '3D Lab' },
            { id: 'elite', icon: Crown, label: 'Dashboard' }
          ].map(({ id, icon: Icon, label }) => (
            <motion.button 
              key={id}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(id as Tab)}
              className={`relative p-3 rounded-xl transition-colors duration-300 ${activeTab === id ? 'text-[#D4AF37]' : 'text-gray-400'}`}
              title={label}
            >
              {activeTab === id && (
                <motion.div 
                  layoutId="active-tab" 
                  className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" 
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} className="relative z-10" />
            </motion.button>
          ))}
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <motion.button whileHover={{ rotate: 90 }} className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors backdrop-blur-md"><Settings size={20} /></motion.button>
          <motion.button whileHover={{ scale: 1.05 }} className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors backdrop-blur-md" onClick={() => setIsAuthenticated(false)}><User size={20} /></motion.button>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="min-h-screen relative z-10">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {activeTab === 'mood' && (
              <motion.div key="mood" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-32 px-6">
                <MoodOnboarding />
              </motion.div>
            )}
            {activeTab === 'wrapper' && (
              <motion.div key="wrapper" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-32 px-6 flex justify-center">
                <WrapperStatus />
              </motion.div>
            )}
            {activeTab === 'showcase' && (
              <motion.div key="showcase" variants={tabVariants} initial="initial" animate="animate" exit="exit">
                <EliteShowcase />
              </motion.div>
            )}
            {activeTab === '3d' && (
              <motion.div key="3d" variants={tabVariants} initial="initial" animate="animate" exit="exit">
                <ThreeDollhouse />
              </motion.div>
            )}
            {activeTab === 'elite' && (
              <motion.div key="elite" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-32 px-6">
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