'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

interface SkillComparisonProps {
  userSkills: Array<{
    name: string;
    total: number;
    color: string;
    icon: string;
    category: string;
  }>;
}

interface ComparisonData {
  name: string;
  userScore: number;
  averageScore: number;
  percentile: number;
  trend: 'up' | 'down' | 'stable';
}

// サンプルデータ（実際のAPIから取得する想定）
const sampleComparisonData: ComparisonData[] = [
  { name: 'React', userScore: 85, averageScore: 65, percentile: 85, trend: 'up' },
  { name: 'TypeScript', userScore: 90, averageScore: 55, percentile: 92, trend: 'up' },
  { name: 'Next.js', userScore: 75, averageScore: 45, percentile: 88, trend: 'up' },
  { name: 'Node.js', userScore: 70, averageScore: 60, percentile: 75, trend: 'stable' },
  { name: 'Python', userScore: 60, averageScore: 70, percentile: 45, trend: 'down' },
  { name: 'AWS', userScore: 55, averageScore: 40, percentile: 78, trend: 'up' },
  { name: 'Docker', userScore: 50, averageScore: 35, percentile: 82, trend: 'up' },
  { name: 'PostgreSQL', userScore: 65, averageScore: 50, percentile: 80, trend: 'stable' },
];

export default function SkillComparison({ userSkills }: SkillComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'percentile' | 'trend'>('score');

  // ユーザーのスキルデータとサンプルデータをマージ
  const mergedData = sampleComparisonData.map(sample => {
    const userSkill = userSkills.find(us => us.name === sample.name);
    return {
      ...sample,
      userScore: userSkill ? userSkill.total : sample.userScore,
    };
  });

  // カテゴリ別にフィルタリング
  const filteredSkills = selectedCategory === 'all' 
    ? mergedData 
    : mergedData.filter(skill => {
        const userSkill = userSkills.find(us => us.name === skill.name);
        return userSkill?.category === selectedCategory;
      });

  // ソート
  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.userScore - a.userScore;
      case 'percentile':
        return b.percentile - a.percentile;
      case 'trend':
        return a.trend === 'up' ? -1 : b.trend === 'up' ? 1 : 0;
      default:
        return 0;
    }
  });

  const categories = ['all', ...Array.from(new Set(userSkills.map(skill => skill.category)))];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 90) return 'text-green-600 dark:text-green-400';
    if (percentile >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentile >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPercentileLabel = (percentile: number) => {
    if (percentile >= 90) return 'エキスパート';
    if (percentile >= 75) return '上級者';
    if (percentile >= 50) return '中級者';
    return '初級者';
  };

  const averagePercentile = sortedSkills.length > 0 
    ? Math.round(sortedSkills.reduce((acc, skill) => acc + skill.percentile, 0) / sortedSkills.length)
    : 0;

  const topSkill = sortedSkills.length > 0 ? sortedSkills[0] : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          スキル比較分析
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* カテゴリフィルター */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? '全カテゴリ' : category}
              </option>
            ))}
          </select>

          {/* ソート */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'score' | 'percentile' | 'trend')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="score">スコア順</option>
            <option value="percentile">パーセンタイル順</option>
            <option value="trend">トレンド順</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getTrendIcon(skill.trend)}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    平均: {skill.averageScore}点 | {getPercentileLabel(skill.percentile)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* ユーザースコア */}
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {skill.userScore}点
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    あなたのスコア
                  </div>
                </div>

                {/* パーセンタイル */}
                <div className="text-right">
                  <div className={`text-lg font-bold ${getPercentileColor(skill.percentile)}`}>
                    {skill.percentile}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    パーセンタイル
                  </div>
                </div>

                {/* 比較バー */}
                <div className="w-32">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>平均</span>
                    <span>あなた</span>
                  </div>
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div 
                      className="absolute h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                      style={{ width: `${Math.min(100, (skill.averageScore / 100) * 100)}%` }}
                    />
                    <div 
                      className="absolute h-2 bg-blue-500 rounded-full"
                      style={{ width: `${Math.min(100, (skill.userScore / 100) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📊 分析結果
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          あなたのスキルは平均的な開発者と比較して、上位{averagePercentile}%のレベルです。
          {topSkill && `特に${topSkill.name}では${topSkill.percentile}%のスキルレベルで、業界トップクラスの実力を持っています。`}
        </p>
      </div>
    </div>
  );
} 