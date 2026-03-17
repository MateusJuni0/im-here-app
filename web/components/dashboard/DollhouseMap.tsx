"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

const Box = ({ position, color }: any) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
};

const MapPrototype = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0A0E1A" roughness={0.8} />
      </mesh>

      {/* "Rooms" represented by blocks */}
      <Box position={[-2, 0, -2]} color="#00D4FF" />
      <Box position={[2, 0, -2]} color="#FFD700" />
      <Box position={[0, 0, 2]} color="#FF007F" />
      
      <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      <Environment preset="city" />
    </>
  );
};

export const DollhouseMap = () => {
  return (
    <div className="h-[400px] w-full bg-[#0A0E1A] rounded-3xl border border-white/10 overflow-hidden relative">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-xl font-black tracking-tighter uppercase gold-gradient-text">3D Immersive Map</h3>
        <p className="text-xs text-white/40 font-medium">Dollhouse Prototype V1</p>
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Suspense fallback={null}>
          <MapPrototype />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-6 right-6 z-10">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors backdrop-blur-md">
            Reset View
          </button>
          <button className="px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/20 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gold transition-colors backdrop-blur-md">
            Enter Room
          </button>
        </div>
      </div>
    </div>
  );
};
