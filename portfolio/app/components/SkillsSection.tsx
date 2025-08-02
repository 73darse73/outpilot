'use client';

import { motion } from 'motion/react';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface SkillRanking {
  rank: number;
  name: string;
  level: number;
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

// スキル使用頻度を計算する関数
const calculateSkillUsage = (data: any): SkillRanking[] => {
  const skillUsage = new Map<
    string,
    {
      count: number;
      lastUsed: Date;
    }
  >();

  // 記事からスキル使用をカウント
  data.recentArticles.forEach((article: any) => {
    // 記事タイトルと内容からスキルを抽出
    const content = `${article.title} ${article.content}`;
    Object.keys(skillInfo).forEach((skillName) => {
      if (content.toLowerCase().includes(skillName.toLowerCase())) {
        const current = skillUsage.get(skillName) || {
          count: 0,
          lastUsed: new Date(0),
        };
        skillUsage.set(skillName, {
          count: current.count + 3, // 記事は重み3
          lastUsed:
            new Date(article.createdAt) > current.lastUsed
              ? new Date(article.createdAt)
              : current.lastUsed,
        });
      }
    });
  });

  // スライドからスキル使用をカウント
  data.recentSlides.forEach((slide: any) => {
    const content = `${slide.title} ${slide.content}`;
    Object.keys(skillInfo).forEach((skillName) => {
      if (content.toLowerCase().includes(skillName.toLowerCase())) {
        const current = skillUsage.get(skillName) || {
          count: 0,
          lastUsed: new Date(0),
        };
        skillUsage.set(skillName, {
          count: current.count + 2, // スライドは重み2
          lastUsed:
            new Date(slide.createdAt) > current.lastUsed
              ? new Date(slide.createdAt)
              : current.lastUsed,
        });
      }
    });
  });

  // デフォルトスキルを追加（使用頻度が低い場合のフォールバック）
  const defaultSkills = [
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Python',
    'AWS',
  ];
  defaultSkills.forEach((skillName) => {
    if (!skillUsage.has(skillName)) {
      skillUsage.set(skillName, { count: 1, lastUsed: new Date() });
    }
  });

  // ランキングに変換
  return Array.from(skillUsage.entries())
    .map(([name, data]) => ({
      name,
      usageCount: data.count,
      lastUsed: data.lastUsed,
      level: Math.min(100, Math.round((data.count / 10) * 100)), // 最大10回使用で100%
      color: getSkillColor(name),
      icon: getSkillIcon(name),
      category: 'other' as const,
      rank: 0,
    }))
    .sort((a, b) => b.usageCount - a.usageCount)
    .map((skill, index) => ({
      ...skill,
      rank: index + 1,
      category: index < 6 ? ('main' as const) : ('other' as const),
    }));
};

export default function SkillsSection() {
  const { recentArticles, recentSlides, loading } = usePortfolioData();

  // スキルランキングを計算
  const skillRankings = calculateSkillUsage({ recentArticles, recentSlides });
  const mainSkills = skillRankings.filter((skill) => skill.category === 'main');
  const otherSkills = skillRankings.filter(
    (skill) => skill.category === 'other',
  );

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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            実際のアウトプットから算出した技術使用頻度ランキング
          </p>
        </motion.div>

        {/* メインスキル（1-6位） */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {mainSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-4">
                {/* ランキングバッジ */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  {skill.rank}
                </div>

                <div className="w-24 h-24 mx-auto relative">
                  {/* 円グラフの背景 */}
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={skill.color}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                      whileInView={{
                        strokeDasharray: `${2 * Math.PI * 40}`,
                        strokeDashoffset: `${
                          2 * Math.PI * 40 * (1 - skill.level / 100)
                        }`,
                      }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </svg>

                  {/* アイコンとパーセンテージ */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{skill.icon}</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                使用回数: {skill.usageCount}回
              </p>
            </motion.div>
          ))}
        </div>

        {/* その他の技術（7位以降） */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            その他の技術
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {otherSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2">
                  <span>{skill.icon}</span>
                  <span>{skill.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    #{skill.rank}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
