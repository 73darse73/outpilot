'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// 送信者と受信者（人型シルエット）
function People() {
  const senderRef = useRef<THREE.Group>(null);
  const receiverRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (senderRef.current && receiverRef.current) {
      // ゆっくりとした呼吸のような動き
      const breathing = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      senderRef.current.position.y = breathing;
      receiverRef.current.position.y = breathing;
    }
  });

  const Person = ({
    position,
    color,
  }: {
    position: [number, number, number];
    color: string;
  }) => (
    <group position={position}>
      {/* 頭 */}
      <Sphere args={[0.2, 16, 16]} position={[0, 0.8, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Sphere>

      {/* 胴体 */}
      <Box args={[0.4, 0.8, 0.2]} position={[0, 0.2, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Box>

      {/* 左腕 */}
      <Box args={[0.1, 0.6, 0.1]} position={[-0.25, 0.3, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Box>

      {/* 右腕 */}
      <Box args={[0.1, 0.6, 0.1]} position={[0.25, 0.3, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Box>

      {/* 左脚 */}
      <Box args={[0.1, 0.6, 0.1]} position={[-0.15, -0.2, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Box>

      {/* 右脚 */}
      <Box args={[0.1, 0.6, 0.1]} position={[0.15, -0.2, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Box>
    </group>
  );

  return (
    <>
      <group ref={senderRef}>
        <Person position={[-4, 0, 0]} color="#3B82F6" />
      </group>
      <group ref={receiverRef}>
        <Person position={[4, 0, 0]} color="#10B981" />
      </group>
    </>
  );
}

// 手紙（メールアイコン）
function Letter() {
  const letterRef = useRef<THREE.Group>(null);
  const [isDelivered, setIsDelivered] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  useFrame((state) => {
    if (letterRef.current) {
      const time = state.clock.elapsedTime;

      if (!isDelivered) {
        // アーチ状の飛行軌道
        const progress = (Math.sin(time * 0.3) + 1) / 2; // 0 to 1
        const x = -4 + (4 - -4) * progress;
        const y = Math.sin(progress * Math.PI) * 3; // アーチ状
        const z = Math.sin(time * 2) * 0.5; // 左右の揺れ

        letterRef.current.position.set(x, y, z);
        letterRef.current.rotation.y = time * 2;
        letterRef.current.rotation.z = Math.sin(time * 3) * 0.2;

        // 到着判定
        if (progress > 0.95) {
          setIsDelivered(true);
          setShowEffect(true);
          setTimeout(() => setShowEffect(false), 1000);
        }
      } else {
        // 到着後の安定位置
        letterRef.current.position.set(4, 0.5, 0);
        letterRef.current.rotation.y = time * 0.5;
      }
    }
  });

  return (
    <group ref={letterRef}>
      {/* 手紙本体 */}
      <Box args={[0.3, 0.2, 0.05]}>
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.9} />
      </Box>

      {/* 封筒のフラップ */}
      <Box args={[0.3, 0.05, 0.05]} position={[0, 0.125, 0]}>
        <meshBasicMaterial color="#D97706" transparent opacity={0.9} />
      </Box>

      {/* 到着エフェクト */}
      {showEffect && (
        <group>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 0.5;
            return (
              <Sphere
                key={i}
                args={[0.05, 8, 8]}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  0,
                ]}
              >
                <meshBasicMaterial color="#FCD34D" transparent opacity={0.8} />
              </Sphere>
            );
          })}
        </group>
      )}
    </group>
  );
}

// 浮遊するコミュニケーションアイコン
function CommunicationIcons() {
  const iconsRef = useRef<THREE.Group>(null);

  const icons = [
    { name: 'Email', color: '#3B82F6' },
    { name: 'Phone', color: '#10B981' },
    { name: 'Chat', color: '#F59E0B' },
    { name: 'Video', color: '#8B5CF6' },
    { name: 'Message', color: '#EF4444' },
    { name: 'Connect', color: '#06B6D4' },
  ];

  useFrame((state) => {
    if (iconsRef.current) {
      iconsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={iconsRef}>
      {icons.map((icon, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Float
            key={icon.name}
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.3}
            position={[x, 0, z]}
          >
            <Box args={[0.6, 0.6, 0.6]}>
              <meshBasicMaterial
                color={icon.color}
                transparent
                opacity={0.7}
                wireframe
              />
            </Box>
            <Text
              position={[0, 0, 0.35]}
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {icon.name}
            </Text>
          </Float>
        );
      })}
    </group>
  );
}

// 背景の浮遊する粒子
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 30 }, (_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <Sphere args={[0.05, 8, 8]}>
            <meshBasicMaterial
              color={`hsl(${200 + i * 10}, 70%, 60%)`}
              transparent
              opacity={0.4}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export default function ContactBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.8}
          color="#06B6D4"
        />

        <People />
        <Letter />
        <CommunicationIcons />
        <BackgroundParticles />
      </Canvas>
    </div>
  );
}
