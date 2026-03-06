/// <reference types="@react-three/fiber" />
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Stars, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface DollhouseModelProps {
  isHovered: boolean;
  setIsHovered: (state: boolean) => void;
}

const EliteStructure = ({ isHovered, setIsHovered }: DollhouseModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Outer Sovereign Shell */}
        <mesh 
          ref={meshRef}
          onPointerOver={() => { setIsHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setIsHovered(false); document.body.style.cursor = 'auto'; }}
        >
          <torusKnotGeometry args={[1.5, 0.4, 256, 32]} />
          <MeshDistortMaterial 
            color={isHovered ? "#D4AF37" : "#333"} 
            speed={2} 
            distort={0.4} 
            radius={1}
            metalness={1}
            roughness={0.1}
          />
        </mesh>

        {/* Inner Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshWobbleMaterial 
            color="#D4AF37" 
            factor={0.4} 
            speed={2} 
            metalness={1} 
            roughness={0} 
            emissive="#D4AF37"
            emissiveIntensity={isHovered ? 2 : 0.5}
          />
        </mesh>
      </Float>
    </group>
  );
};

export const ThreeDollhouse = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-screen bg-[#030303] relative overflow-hidden flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 blur-[150px] rounded-full"></div>
      </div>

      {/* HUD Layer - Ultra Elite */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#D4AF37]"></div>
              <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.5em]">System Core V2.5</p>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl text-white font-black tracking-tighter mb-4">
              3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white italic">Elite</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium uppercase tracking-widest opacity-60">
              Arquitetura Imersiva & Gestão de Ativos em Tempo Real.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-white/[0.02] border border-white/10 rounded-[40px] backdrop-blur-3xl text-right"
          >
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-2">Network Status</p>
            <div className="flex items-center justify-end gap-3">
              <span className="text-white font-mono text-xl font-bold italic tracking-tighter">OPERATIONAL</span>
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-12"
          >
            {[
              { label: 'Symmetry', val: '99.9%' },
              { label: 'Complexity', val: 'High' },
              { label: 'Render', val: 'Elite' }
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-white font-bold text-sm tracking-widest">{s.val}</p>
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xs text-right"
          >
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] leading-relaxed">
              Use gestos de toque para orbitar e explorar a geometria soberana.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows dpr={[1, 2]}>
          <color attach="background" args={['#030303']} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#D4AF37" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          <EliteStructure isHovered={isHovered} setIsHovered={setIsHovered} />
          
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} color="#D4AF37" />
          
          <Environment preset="night" />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.5}
            makeDefault
          />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDollhouse;