'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Box,
  Text,
  Float,
  Sphere,
  Torus,
  Points,
  PointMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

// 派手なパーティクルシステム
function DynamicParticles() {
  const ref = useRef<THREE.Points>(null);

  const count = 12000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 2;
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

// 浮遊する技術ブロック
function TechBlocks() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);

  const technologies = [
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Python',
    'AWS',
    'Docker',
    'PostgreSQL',
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {technologies.map((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(0.5 + i * 0.5) * 1;

        return (
          <Float
            key={tech}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={[x, y, z]}
            onPointerOver={() => setHoveredBlock(i)}
            onPointerOut={() => setHoveredBlock(null)}
          >
            <Box args={[1, 1, 1]} scale={hoveredBlock === i ? 1.3 : 1}>
              <meshBasicMaterial
                color={`hsl(${200 + i * 30}, 80%, 60%)`}
                transparent
                opacity={0.8}
                wireframe
              />
            </Box>
            <Text
              position={[0, 0, 0.6]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {tech}
            </Text>
          </Float>
        );
      })}
    </group>
  );
}

// エネルギーパルス
function EnergyPulses() {
  const pulsesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pulsesRef.current) {
      pulsesRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      pulsesRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group ref={pulsesRef}>
      {Array.from({ length: 12 }, (_, i) => (
        <Torus
          key={i}
          args={[3 + i * 0.8, 0.15, 16, 100]}
          position={[0, 0, -i * 3]}
        >
          <meshBasicMaterial
            color={`hsl(${120 + i * 20}, 90%, 60%)`}
            transparent
            opacity={0.6 - i * 0.05}
            wireframe
          />
        </Torus>
      ))}
    </group>
  );
}

// 中央のコア
function CentralCore() {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      coreRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      coreRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1,
      );
    }
  });

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* 内側のコア */}
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.9}
          wireframe
        />
      </Sphere>

      {/* 外側のシェル */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial
          color="#EF4444"
          transparent
          opacity={0.6}
          wireframe
        />
      </Sphere>

      {/* 最外側のシェル */}
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.4}
          wireframe
        />
      </Sphere>

      {/* 中央のテキスト */}
      <Text
        position={[0, 0, 1.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        KODAMA
      </Text>
    </group>
  );
}

// 浮遊する小さな球体
function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={orbsRef}>
      {Array.from({ length: 25 }, (_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 3}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
          ]}
        >
          <Sphere args={[0.1 + Math.random() * 0.2, 16, 16]}>
            <meshBasicMaterial
              color={`hsl(${280 + i * 10}, 80%, 60%)`}
              transparent
              opacity={0.7}
              wireframe
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[0, 10, 0]} intensity={1.2} color="#F59E0B" />

        <DynamicParticles />
        <TechBlocks />
        <EnergyPulses />
        <CentralCore />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
