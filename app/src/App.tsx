import { useState, Component, ReactNode } from 'react'
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
    if (this.state.hasError) return <div className="p-20 text-center text-gray-500">Componente temporariamente indisponível.</div>;
    return this.props.children;
  }
}

type Tab = 'mood' | 'elite' | 'showcase' | '3d' | 'wrapper'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('elite')

  return (
    <div className="min-h-screen bg-[#0a0a15] text-white font-sans selection:bg-gold/30">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-xl font-bold tracking-widest text-[#D4AF37] uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          Elite
        </div>
        <div className="flex gap-2 text-white pointer-events-auto bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/5 shadow-2xl">
          <button 
            onClick={() => setActiveTab('mood')}
            className={`p-2 transition-all rounded-xl ${activeTab === 'mood' ? 'text-[#D4AF37] bg-white/5' : 'text-gray-400 hover:text-white'}`}
            title="Mood Onboarding"
          >
            <Activity size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('wrapper')}
            className={`p-2 transition-all rounded-xl ${activeTab === 'wrapper' ? 'text-[#D4AF37] bg-white/5' : 'text-gray-400 hover:text-white'}`}
            title="Wrapper Status"
          >
            <Navigation size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('showcase')}
            className={`p-2 transition-all rounded-xl ${activeTab === 'showcase' ? 'text-[#D4AF37] bg-white/5' : 'text-gray-400 hover:text-white'}`}
            title="Netflix UI Showcase"
          >
            <Layout size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('3d')}
            className={`p-2 transition-all rounded-xl ${activeTab === '3d' ? 'text-[#D4AF37] bg-white/5' : 'text-gray-400 hover:text-white'}`}
            title="3D Dollhouse"
          >
            <Box size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('elite')}
            className={`p-2 transition-all rounded-xl ${activeTab === 'elite' ? 'text-[#D4AF37] bg-white/5' : 'text-gray-400 hover:text-white'}`}
            title="Elite Pass"
          >
            <Crown size={18} />
          </button>
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <button className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors"><Settings size={18} /></button>
          <button className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors"><User size={18} /></button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen relative">
        <ErrorBoundary>
          {activeTab === 'mood' && <div className="pt-24"><MoodOnboarding /></div>}
          {activeTab === 'wrapper' && <div className="pt-24 px-6 flex justify-center"><WrapperStatus /></div>}
          {activeTab === 'showcase' && <EliteShowcase />}
          {activeTab === '3d' && <ThreeDollhouse />}
          {activeTab === 'elite' && <div className="pt-24"><ElitePassDashboard /></div>}
        </ErrorBoundary>
      </main>
    </div>
  )
}

export default App
