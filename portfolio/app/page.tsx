'use client';

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import HighlightsSection from './components/HighlightsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
// import ThreeBackground from './components/ThreeBackground';
import { useSkillCategoryScore } from './hooks/useSkillCategoryScore';
import SkillScoreChart from './components/SkillScoreChart';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const categoryScores = useSkillCategoryScore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
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

        {/* スキルカテゴリスコアリスト */}
        <section className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">カテゴリ別スキルスコア</h2>
          <ul>
            {categoryScores.map((cat) => (
              <li
                key={cat.name}
                className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <span className="font-semibold">{cat.name}</span>
                <span className="text-blue-600 dark:text-blue-300 font-mono">
                  {cat.total.toFixed(2)} 点
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* カテゴリスコアグラフ */}
        <SkillScoreChart />
      </main>
    </PageTransition>
  );
}
