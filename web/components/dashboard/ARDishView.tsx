"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls, Stage, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Box, Scan, Info } from "lucide-react";

const DishModel = () => {
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          roughness={0} 
          metalness={1} 
          emissive="#00D4FF" 
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

export const ARDishView = () => {
  return (
    <GlassCard className="h-[400px] p-0 overflow-hidden group">
      <div className="flex h-full flex-col md:flex-row">
        {/* Left Side: 3D Visualization */}
        <div className="flex-1 bg-black/40 relative">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
              <Scan size={12} className="animate-pulse" /> AR ACTIVE
            </div>
          </div>
          
          <Canvas dpr={[1, 2]}>
            <Suspense fallback={null}>
              <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
                <Stage environment="city" intensity={0.6} shadows={false}>
                  <DishModel />
                </Stage>
              </PresentationControls>
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Drag to Rotate Dish</p>
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-64 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-white/5">
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tight uppercase">Blue Lobster <br/> <span className="text-blue-400">Thermidor</span></h3>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border border-black bg-white/10" />
                ))}
              </div>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Pre-ordered</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Experience the texture and presentation in 3D AR before your arrival.
            </p>
          </div>
          
          <div className="space-y-2">
             <button className="w-full py-3 bg-white hover:bg-gold text-black font-black rounded-xl text-xs uppercase transition-all hover:scale-105 active:scale-95">
                Project on Table
             </button>
             <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase transition-all flex items-center justify-center gap-2">
                <Info size={14} /> Full Details
             </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
