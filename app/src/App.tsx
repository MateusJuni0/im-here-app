import { useState } from 'react'
import { MoodOnboarding } from './components/MoodOnboarding'
import { ElitePassDashboard } from './components/ElitePassDashboard'
import { User, Settings, Crown, Activity } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'mood' | 'elite'>('elite')

  return (
    <div className="min-h-screen bg-nocturnal-900 text-white font-sans selection:bg-gold/30">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-xl font-bold tracking-widest text-gold uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          Elite
        </div>
        <div className="flex gap-4 text-white pointer-events-auto">
          <button 
            onClick={() => setActiveTab('mood')}
            className={`p-2 transition-colors ${activeTab === 'mood' ? 'text-gold' : 'hover:text-gold'}`}
          >
            <Activity size={20} />
          </button>
          <button 
            onClick={() => setActiveTab('elite')}
            className={`p-2 transition-colors ${activeTab === 'elite' ? 'text-gold' : 'hover:text-gold'}`}
          >
            <Crown size={20} />
          </button>
          <button className="p-2 hover:text-gold transition-colors"><Settings size={20} /></button>
          <button className="p-2 hover:text-gold transition-colors"><User size={20} /></button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen relative pt-24 pb-10">
        {activeTab === 'mood' ? <MoodOnboarding /> : <ElitePassDashboard />}
      </main>
    </div>
  )
}

export default App
