// components/AnalyticsBackground.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Monitor({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1.2, 0.7, 0.08]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function SeatedAnalyst() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      // ゆっくり腕を上下
      const t = Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
      group.current.children[4].rotation.x = t; // 左腕
      group.current.children[5].rotation.x = -t; // 右腕
    }
  });
  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* 椅子 */}
      <Box args={[1, 0.2, 1]} position={[0, -0.6, 0]}>
        <meshStandardMaterial color="#888" />
      </Box>
      {/* 胴体 */}
      <Box args={[0.5, 0.9, 0.3]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#3B82F6" />
      </Box>
      {/* 頭 */}
      <Sphere args={[0.25, 16, 16]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#FBBF24" />
      </Sphere>
      {/* 左腕 */}
      <Box args={[0.12, 0.5, 0.12]} position={[-0.3, 0.7, 0.15]}>
        <meshStandardMaterial color="#FBBF24" />
      </Box>
      {/* 右腕 */}
      <Box args={[0.12, 0.5, 0.12]} position={[0.3, 0.7, 0.15]}>
        <meshStandardMaterial color="#FBBF24" />
      </Box>
      {/* 左脚 */}
      <Box args={[0.12, 0.6, 0.12]} position={[-0.15, -0.2, 0]}>
        <meshStandardMaterial color="#222" />
      </Box>
      {/* 右脚 */}
      <Box args={[0.12, 0.6, 0.12]} position={[0.15, -0.2, 0]}>
        <meshStandardMaterial color="#222" />
      </Box>
    </group>
  );
}

function Desk() {
  return (
    <Box args={[3, 0.2, 1.2]} position={[0, -0.2, 0.6]}>
      <meshStandardMaterial color="#a0522d" />
    </Box>
  );
}

function Monitors() {
  // 6枚を半円状に配置
  const colors = [
    '#60a5fa',
    '#fbbf24',
    '#34d399',
    '#f87171',
    '#a78bfa',
    '#f472b6',
  ];
  return (
    <group>
      {colors.map((color, i) => {
        const angle = (i / 5) * Math.PI;
        const r = 2.1;
        const x = Math.cos(angle - Math.PI / 2) * r;
        const y = 0.9;
        const z = Math.sin(angle - Math.PI / 2) * r + 0.6;
        return <Monitor key={i} position={[x, y, z]} color={color} />;
      })}
    </group>
  );
}

export default function AnalyticsBackground() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShow(window.innerWidth > 700);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 1.5, 6], fov: 60 }} dpr={1}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 8, 5]} intensity={0.7} />
        <Desk />
        <SeatedAnalyst />
        <Monitors />
      </Canvas>
    </div>
  );
}
