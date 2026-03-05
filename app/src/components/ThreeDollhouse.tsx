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

  // Animation loop
  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Gentle idle rotation
      meshRef.current.rotation.y += delta * 0.1;
      
      // Scale on hover (interactive feedback)
      const targetScale = isHovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e: any) => { e.stopPropagation(); setIsHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e: any) => { e.stopPropagation(); setIsHovered(false); document.body.style.cursor = 'auto'; }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={isHovered ? "#d4af37" : "#1a1a1a"} 
          metalness={0.8}
          roughness={0.2}
        />
        
        {/* Floating UI Tooltip over 3D model */}
        {isHovered && (
          <Html position={[0, 1.5, 0]} center className="pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md text-white p-3 rounded-lg border border-yellow-600/50 w-56 shadow-2xl">
              <h3 className="font-bold text-lg text-yellow-500">Hotel Palácio Estoril</h3>
              <p className="text-xs text-gray-300 mt-1">Clique para explorar os quartos em 3D e acessar serviços de concierge.</p>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

export const ThreeDollhouse = () => {
  const [hoveredPoint, setHoveredPoint] = useState(false);

  return (
    <div className="w-full h-screen bg-neutral-900 relative overflow-hidden">
      {/* HUD Layer */}
      <div className="absolute top-8 left-8 z-10 text-white pointer-events-none">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Exploração Dollhouse
        </h1>
        <p className="text-gray-400 mt-2 max-w-md">
          Navegue em 3D pelas propriedades exclusivas do Portugal Elite Ecosystem.
        </p>
      </div>

      {/* 3D Canvas Context */}
      <Canvas camera={{ position: [6, 4, 6], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <Environment preset="city" />
        
        {/* Interactive 3D Mock Model */}
        <DollhouseModel 
          position={[0, 1, 0]} 
          isHovered={hoveredPoint}
          setIsHovered={setHoveredPoint}
          onClick={() => console.log("Entering deep Dollhouse view for property...")}
        />

        {/* Studio base plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>

        <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
        
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={4}
          maxDistance={15}
          dampingFactor={0.05}
          autoRotate={!hoveredPoint}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDollhouse;
