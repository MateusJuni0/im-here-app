/// <reference types="@react-three/fiber" />
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface DollhouseModelProps {
  position: [number, number, number];
  isHovered: boolean;
  setIsHovered: (state: boolean) => void;
  onClick: () => void;
}

const DollhouseModel = ({ position, onClick, isHovered, setIsHovered }: DollhouseModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Animation loop
  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Gentle idle rotation
      groupRef.current.rotation.y += delta * 0.15;
      
      // Scale on hover (interactive feedback)
      const targetScale = isHovered ? 1.05 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Base Structure (Wireframe) */}
      <mesh 
        onPointerOver={(e: any) => { e.stopPropagation(); setIsHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e: any) => { e.stopPropagation(); setIsHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={[3, 4, 3]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Internal Core (Solid) */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3.5, 2.5]} />
        <meshStandardMaterial 
          color={isHovered ? "#D4AF37" : "#111"} 
          metalness={0.9}
          roughness={0.1}
          emissive={isHovered ? "#D4AF37" : "#000"}
          emissiveIntensity={isHovered ? 0.5 : 0}
        />
      </mesh>

      {/* Detail Cubes (Windows/Architecture) */}
      {[
        [-1.3, 1, 0], [1.3, 1, 0], [0, 1, 1.3], [0, 1, -1.3],
        [-1.3, -1, 0], [1.3, -1, 0], [0, -1, 1.3], [0, -1, -1.3]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1} />
        </mesh>
      ))}
      
      {/* Floating UI Tooltip over 3D model */}
      {isHovered && (
        <Html position={[0, 3, 0]} center className="pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-black/80 backdrop-blur-2xl text-white p-5 rounded-3xl border border-[#D4AF37]/50 w-64 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Property Active</p>
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-1">Villa Estoril Elite</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">Arquitetura soberana com integração total ao ecossistema. 1.200m² de luxo absoluto.</p>
            <div className="mt-4 flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-xs font-bold text-[#D4AF37]">€4.500.000</span>
              <span className="text-[10px] uppercase font-black text-white/40">Ver Detalhes</span>
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

export const ThreeDollhouse = () => {
  const [hoveredPoint, setHoveredPoint] = useState(false);

  return (
    <div className="w-full h-screen bg-[#030303] relative overflow-hidden">
      {/* HUD Layer */}
      <div className="absolute top-32 left-8 md:left-12 z-10 text-white pointer-events-none select-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-px bg-[#D4AF37]"></div>
          <h2 className="text-[#D4AF37] tracking-widest uppercase text-xs font-semibold">Immersive Architecture</h2>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter"
        >
          3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white italic">Dollhouse</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mt-6 max-w-md text-sm md:text-base leading-relaxed"
        >
          Navegue pelas propriedades exclusivas do Portugal Elite Ecosystem através de maquetes interativas de alta precisão.
        </motion.p>

        {/* HUD Data Points */}
        <div className="mt-12 space-y-4">
          {[
            { label: 'Active Renders', val: '039_V2.0' },
            { label: 'Core Integrity', val: '98.4%' },
            { label: 'Latency', val: '0.04ms' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-6"
            >
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black w-32">{stat.label}</p>
              <p className="text-xs text-[#D4AF37] font-mono font-bold tracking-widest">{stat.val}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Control Hint */}
      <div className="absolute bottom-12 right-12 z-10 p-4 border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-3xl flex items-center gap-4 pointer-events-none opacity-40">
        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Orbital Control Active</p>
      </div>

      {/* 3D Canvas Context */}
      <Canvas camera={{ position: [8, 6, 8], fov: 40 }} shadows>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#333" />
        
        <Environment preset="night" />
        
        {/* Interactive 3D Mock Model */}
        <DollhouseModel 
          position={[0, 0, 0]} 
          isHovered={hoveredPoint}
          setIsHovered={setHoveredPoint}
          onClick={() => console.log("Entering deep Dollhouse view for property...")}
        />

        {/* Studio base plane - Refined */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#010101" roughness={0.1} metalness={1} />
        </mesh>

        <ContactShadows position={[0, -1.99, 0]} opacity={0.8} scale={20} blur={2.5} far={4} color="#000000" />
        
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={6}
          maxDistance={20}
          dampingFactor={0.05}
          autoRotate={!hoveredPoint}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDollhouse;
