'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3Dギャラリーに展示されるプロジェクトカード
function ProjectGallery() {
  const galleryRef = useRef<THREE.Group>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const projects = [
    { name: 'Outpilot', tech: 'Next.js', color: '#3B82F6' },
    { name: 'Portfolio', tech: 'React', color: '#10B981' },
    { name: 'E-commerce', tech: 'Vue.js', color: '#F59E0B' },
    { name: 'Dashboard', tech: 'TypeScript', color: '#8B5CF6' },
    { name: 'API Service', tech: 'Node.js', color: '#EF4444' },
    { name: 'Mobile App', tech: 'React Native', color: '#06B6D4' },
    { name: 'AI Chat', tech: 'Python', color: '#84CC16' },
    { name: 'Game Engine', tech: 'C++', color: '#F97316' },
  ];

  useFrame((state) => {
    if (galleryRef.current) {
      // ゆっくりとした自動回転
      galleryRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={galleryRef}>
      {projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(0.5 + i * 0.5) * 0.5;

        return (
          <Float
            key={project.name}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={[x, y, z]}
            onPointerOver={() => setHoveredCard(i)}
            onPointerOut={() => setHoveredCard(null)}
          >
            <group>
              {/* プロジェクトカード */}
              <Box args={[2.5, 1.8, 0.1]} scale={hoveredCard === i ? 1.2 : 1}>
                <meshBasicMaterial
                  color={project.color}
                  transparent
                  opacity={0.9}
                  wireframe
                />
              </Box>

              {/* カードの台座 */}
              <Box args={[0.1, 0.1, 1]} position={[0, -0.9, 0]}>
                <meshBasicMaterial
                  color={project.color}
                  transparent
                  opacity={0.6}
                />
              </Box>

              {/* プロジェクト名 */}
              <Text
                position={[0, 0.3, 0.06]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {project.name}
              </Text>

              {/* 技術スタック */}
              <Text
                position={[0, -0.3, 0.06]}
                fontSize={0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {project.tech}
              </Text>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

// 浮遊するコードブロック
function FloatingCodeBlocks() {
  const codeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (codeRef.current) {
      codeRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      codeRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <group ref={codeRef} position={[0, 0, -10]}>
      {Array.from({ length: 20 }, (_, i) => (
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
          <Box args={[0.6, 0.1, 0.6]}>
            <meshBasicMaterial
              color={`hsl(${40 + i * 15}, 80%, 60%)`}
              transparent
              opacity={0.6}
              wireframe
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

// 技術スタックの球体
function TechnologyOrbs() {
  const techRef = useRef<THREE.Group>(null);

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
    if (techRef.current) {
      techRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={techRef} position={[0, 0, -15]}>
      {technologies.map((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Float
            key={tech}
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.3}
            position={[x, 0, z]}
          >
            <Box args={[0.8, 0.8, 0.8]}>
              <meshBasicMaterial
                color={`hsl(${320 + i * 40}, 80%, 60%)`}
                transparent
                opacity={0.7}
                wireframe
              />
            </Box>
            <Text
              position={[0, 0, 0.45]}
              fontSize={0.1}
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

export default function ProjectsBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.8}
          color="#F59E0B"
        />

        <ProjectGallery />
        <FloatingCodeBlocks />
        <TechnologyOrbs />

        {/* カメラコントロール（オプション） */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
