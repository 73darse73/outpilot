'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// 自分を構成するモジュール（ブロック）のアニメーション
function PersonalityBlocks() {
  const groupRef = useRef<THREE.Group>(null);
  const [isForming, setIsForming] = useState(false);
  const [formationProgress, setFormationProgress] = useState(0);

  const personalityTraits = useMemo(
    () => [
      'Engineer',
      'Learner',
      'Hobbyist',
      'Team Player',
      'Curious',
      'Creative',
      'Problem Solver',
      'Innovator',
    ],
    [],
  );

  // 人型の形成位置（抽象的な形）
  const humanFormPositions = [
    [0, 2, 0], // 頭
    [0, 1, 0], // 胴体
    [0, 0, 0], // 腰
    [-0.5, 1.5, 0], // 左腕
    [0.5, 1.5, 0], // 右腕
    [-0.3, -0.5, 0], // 左脚
    [0.3, -0.5, 0], // 右脚
    [0, 0.5, 0], // 中心
  ];

  // ランダムな初期位置
  const randomPositions = useMemo(
    () =>
      personalityTraits.map(() => [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ]),
    [personalityTraits],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsForming((prev) => !prev);
    }, 8000); // 8秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // 全体の回転
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;

      // 形成アニメーションの進行
      if (isForming) {
        setFormationProgress((prev) => Math.min(prev + 0.01, 1));
      } else {
        setFormationProgress((prev) => Math.max(prev - 0.01, 0));
      }
    }
  });

  return (
    <group ref={groupRef}>
      {personalityTraits.map((trait, i) => {
        const startPos = randomPositions[i];
        const endPos = humanFormPositions[i % humanFormPositions.length];

        const currentPos = [
          startPos[0] + (endPos[0] - startPos[0]) * formationProgress,
          startPos[1] + (endPos[1] - startPos[1]) * formationProgress,
          startPos[2] + (endPos[2] - startPos[2]) * formationProgress,
        ];

        return (
          <Float
            key={trait}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={[currentPos[0], currentPos[1], currentPos[2]]}
          >
            <Box args={[1, 1, 1]}>
              <meshBasicMaterial
                color={`hsl(${200 + i * 30}, 80%, 60%)`}
                transparent
                opacity={0.8}
                wireframe
              />
            </Box>
            <Text
              position={[0, 0, 0.6]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {trait}
            </Text>
          </Float>
        );
      })}
    </group>
  );
}

// 浮遊する小さなブロック
function FloatingBlocks() {
  const blocksRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (blocksRef.current) {
      blocksRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      blocksRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <group ref={blocksRef}>
      {Array.from({ length: 30 }, (_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
          ]}
        >
          <Box args={[0.2, 0.2, 0.2]}>
            <meshBasicMaterial
              color={`hsl(${280 + i * 10}, 70%, 60%)`}
              transparent
              opacity={0.4}
              wireframe
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

// 接続線
function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={linesRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <group
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <Box args={[0.02, 3, 0.02]} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial
              color={`hsl(${120 + i * 15}, 80%, 60%)`}
              transparent
              opacity={0.3}
            />
          </Box>
        </group>
      ))}
    </group>
  );
}

export default function AboutBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.8}
          color="#8B5CF6"
        />

        <PersonalityBlocks />
        <FloatingBlocks />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
