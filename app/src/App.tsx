import { useState } from 'react'
// import { MoodOnboarding } from './components/MoodOnboarding'
// import { ElitePassDashboard } from './components/ElitePassDashboard'
// import { EliteShowcase } from './components/EliteShowcase'
// import { ThreeDollhouse } from './components/ThreeDollhouse'
// import { WrapperStatus } from './components/WrapperStatus'
import { User, Settings, Crown, Activity, LayoutTemplate as Layout, Box, Compass as Navigation } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('elite')

  return (
    <div className="min-h-screen bg-[#0a0a15] text-white font-sans flex items-center justify-center">
      <div className="fixed top-0 left-0 z-[9999] bg-red-600 text-white p-2 text-[12px] font-bold">
        🏛️ DANTE CORE - EMERGENCY DEBUG v1.0.4
      </div>
      
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gold mb-4">REACT OK</h1>
        <p className="text-gray-400">Se estás a ler isto, o React está vivo. A "Tela Preta" é causada por um componente específico.</p>
        <div className="mt-8 flex gap-4 justify-center">
           <Activity className="text-gold" />
           <Crown className="text-gold" />
           <Box className="text-gold" />
        </div>
      </div>
    </div>
  )
}

export default App
