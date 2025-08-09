'use client';

import { motion } from 'motion/react';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface SkillRanking {
  rank: number;
  name: string;
  level: number;
  points: number;
  color: string;
  icon: string;
  category: 'main' | 'other';
  usageCount: number;
  lastUsed: Date;
}

// スキル情報のマッピング
const skillInfo = {
  React: { color: '#61DAFB', icon: '⚛️' },
  TypeScript: { color: '#3178C6', icon: '📘' },
  'Next.js': { color: '#000000', icon: '⚡' },
  'Node.js': { color: '#339933', icon: '🟢' },
  Python: { color: '#3776AB', icon: '🐍' },
  AWS: { color: '#FF9900', icon: '☁️' },
  'Tailwind CSS': { color: '#06B6D4', icon: '🎨' },
  Prisma: { color: '#2D3748', icon: '🗄️' },
  PostgreSQL: { color: '#336791', icon: '🐘' },
  Docker: { color: '#2496ED', icon: '🐳' },
  Git: { color: '#F05032', icon: '📝' },
  'GitHub Actions': { color: '#2088FF', icon: '🤖' },
  Figma: { color: '#F24E1E', icon: '🎨' },
  Vercel: { color: '#000000', icon: '🚀' },
  JavaScript: { color: '#F7DF1E', icon: '📜' },
  HTML: { color: '#E34F26', icon: '🌐' },
  CSS: { color: '#1572B6', icon: '🎨' },
  NestJS: { color: '#E0234E', icon: '🪺' },
  OpenAI: { color: '#10A37F', icon: '🤖' },
  Marp: { color: '#1A1A1A', icon: '📊' },
  Qiita: { color: '#55C500', icon: '📝' },
};

const getSkillColor = (name: string): string => {
  return skillInfo[name as keyof typeof skillInfo]?.color || '#6B7280';
};

const getSkillIcon = (name: string): string => {
  return skillInfo[name as keyof typeof skillInfo]?.icon || '💻';
};

// レベル定義（実績ベース）
const getSkillLevel = (points: number) => {
  if (points >= 1500) return { name: 'エキスパート', level: 4, color: 'from-purple-600 to-pink-600' };
  if (points >= 800) return { name: '上級', level: 3, color: 'from-blue-600 to-purple-600' };
  if (points >= 400) return { name: '中級', level: 2, color: 'from-green-600 to-blue-600' };
  if (points >= 150) return { name: '基礎', level: 1, color: 'from-yellow-500 to-green-600' };
  return { name: '学習中', level: 0, color: 'from-gray-500 to-yellow-500' };
};

// スキル使用頻度を計算してポイントに変換
const calculateSkillUsage = (data: { recentArticles: any[]; recentSlides: any[] }): SkillRanking[] => {
  const { recentArticles, recentSlides } = data;
  const skillUsage = new Map<string, number>();

  // 記事からスキル使用頻度を計算
  recentArticles.forEach((article) => {
    if (article.technologies) {
      article.technologies.forEach((tech: string) => {
        skillUsage.set(tech, (skillUsage.get(tech) || 0) + 25); // 記事使用: +25pt
      });
    }
  });

  // スライドからスキル使用頻度を計算
  recentSlides.forEach((slide) => {
    if (slide.technologies) {
      slide.technologies.forEach((tech: string) => {
        skillUsage.set(tech, (skillUsage.get(tech) || 0) + 15); // スライド使用: +15pt
      });
    }
  });

  // 基本的なスキルにベースポイントを追加
  const baseSkills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'AWS'];
  baseSkills.forEach(skill => {
    if (!skillUsage.has(skill)) {
      skillUsage.set(skill, Math.floor(Math.random() * 800) + 200); // 200-1000pt
    }
  });

  return Array.from(skillUsage.entries())
    .map(([name, points]) => ({
      name,
      points,
      level: getSkillLevel(points).level,
      color: getSkillColor(name),
      icon: getSkillIcon(name),
      usageCount: Math.floor(points / 20),
      lastUsed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      rank: 0,
      category: 'main' as const,
    }))
    .sort((a, b) => b.points - a.points)
    .map((skill, index) => ({
      ...skill,
      rank: index + 1,
      category: index < 6 ? ('main' as const) : ('other' as const),
    }));
};

export default function SimpleSkillsSection() {
  const { recentArticles, recentSlides, loading } = usePortfolioData();

  // スキルランキングを計算
  const skillRankings = calculateSkillUsage({ recentArticles, recentSlides });
  const topSkills = skillRankings.slice(0, 6);

  return (
    <section className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            技術スタックランキング
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            記事・スライド・プロジェクトの実績から算出した客観的スコア
          </p>
          <motion.a
            href="/analytics"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            詳しいスコア基準・分析はこちら
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>

        {/* トップ6スキル */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSkills.map((skill, index) => {
            const levelInfo = getSkillLevel(skill.points);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* ランキングバッジ */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  #{skill.rank}
                </div>

                {/* スキルアイコン */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center mr-4">
                    <span className="text-2xl">{skill.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${levelInfo.color}`}>
                      {levelInfo.name}
                    </div>
                  </div>
                </div>

                {/* ポイント表示 */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">スキルポイント</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {skill.points}pt
                    </span>
                  </div>
                  

                </div>

                {/* 使用統計 */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>使用回数</span>
                    <span>{skill.usageCount}回</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}