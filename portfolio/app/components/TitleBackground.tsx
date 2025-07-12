'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedTitleBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 2, 32, 32]} />
      <meshBasicMaterial color="#3B82F6" opacity={0.1} transparent wireframe />
    </mesh>
  );
}

function FloatingIcons() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  const icons = ['⚛️', '🔷', '⚡', '🌟', '💻', '🚀'];

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <mesh
          key={index}
          position={[
            Math.cos((index * Math.PI) / 3) * 3,
            Math.sin((index * Math.PI) / 3) * 1.5,
            0,
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshBasicMaterial
            color="#8B5CF6"
            opacity={0.2}
            transparent
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export default function TitleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <AnimatedTitleBackground />
        <FloatingIcons />
      </Canvas>
    </div>
  );
}
