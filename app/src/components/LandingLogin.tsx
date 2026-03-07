import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Fingerprint, Lock, Mail, Sparkles } from 'lucide-react'

export function LandingLogin({ onLogin }: { onLogin: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const [email, setEmail] = useState('')

  // Spring physics for premium feel
  const springConfig = { type: "spring", stiffness: 300, damping: 30 }

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-white overflow-hidden flex items-center justify-center p-6">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37] blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#CD7F32] blur-[150px] rounded-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[700px]">
          
          {/* Main Brand & Hero (Left Side) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: 0.1 }}
            className="col-span-1 lg:col-span-7 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-10 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-8"
              >
                <Sparkles size={14} />
                <span>Ecosystem V2</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-light tracking-tight mb-6 leading-[1.1]">
                Redefining<br />
                <span className="font-semibold bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#CD7F32] bg-clip-text text-transparent">
                  Sovereignty
                </span>
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl max-w-md font-light leading-relaxed">
                Enter the Portugal Elite Ecosystem. A unified wrapper for mobility, dining, and unparalleled local experiences.
              </p>
            </div>

            <div className="relative z-10 mt-12 lg:mt-0 flex gap-4">
              <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-medium text-white">System Online</span>
                <span className="text-xs text-gray-500">Concierge Buffer Active</span>
              </div>
            </div>
          </motion.div>

          {/* Login Area (Right Side Bento Boxes) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
            
            {/* Passkey / Biometric Login Box */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springConfig, delay: 0.2 }}
              className="flex-1 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-medium mb-1">Access</h2>
                  <p className="text-sm text-gray-400">Secure entry via Passkey</p>
                </div>
                <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
                  <Fingerprint size={24} />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Elite ID or Email"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/5 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLogin}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="w-full relative overflow-hidden rounded-2xl p-[1px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#CD7F32] opacity-80" />
                  <div className="relative bg-[#030303] hover:bg-transparent transition-colors duration-300 rounded-2xl px-6 py-4 flex items-center justify-between group">
                    <span className="font-medium text-white group-hover:text-black transition-colors duration-300">
                      Authenticate
                    </span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      className="text-white group-hover:text-black transition-colors duration-300"
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.3 }}
              className="h-48 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden relative"
            >
              <div className="absolute right-[-20%] top-[-20%] w-32 h-32 bg-[#D4AF37]/20 blur-3xl rounded-full" />
              <div className="flex items-center gap-3 text-gray-400">
                <Lock size={16} className="text-[#D4AF37]" />
                <span className="text-sm font-medium tracking-wide">ZERO HARDCODING</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Strict adherence to Rule 26. Access is granted exclusively via Biometrics or Passkeys. No passwords stored.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}