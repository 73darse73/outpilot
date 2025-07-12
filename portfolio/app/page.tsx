'use client';

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import HighlightsSection from './components/HighlightsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
// import ThreeBackground from './components/ThreeBackground';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-transparent">
      {/* シンプルな2Dグラデーション背景 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-600 opacity-80" />

      {/* ローディング画面 */}
      {isLoading && <LoadingScreen />}
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <HighlightsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
