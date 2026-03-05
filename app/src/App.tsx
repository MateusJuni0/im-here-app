import { User, Settings, Crown, Activity, Box, LayoutTemplate as Layout, Compass as Navigation } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a15] text-white font-sans flex items-center justify-center">
      <div className="fixed top-0 left-0 z-[9999] bg-red-600 text-white p-2 text-[12px] font-bold">
        🏛️ DANTE CORE - EMERGENCY DEBUG v1.0.7
      </div>
      
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gold mb-4">REACT ALIVE</h1>
        <p className="text-gray-400">Se estás a ler isto, o build da Vercel passou e o React está funcional.</p>
        <div className="mt-8 flex gap-4 justify-center">
           <Activity className="text-gold" />
           <Crown className="text-gold" />
           <Box className="text-gold" />
           <User className="text-gold" />
           <Settings className="text-gold" />
           <Layout className="text-gold" />
           <Navigation className="text-gold" />
        </div>
      </div>
    </div>
  )
}

export default App
