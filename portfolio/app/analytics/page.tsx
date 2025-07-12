'use client';

import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TitleBackground from '../components/TitleBackground';
// import AnalyticsBackground from '../components/AnalyticsBackground';

export default function AnalyticsPage() {
  // サンプルデータ（実際のAPIから取得する場合はuseStateとuseEffectを使用）
  const githubStats = {
    totalRepos: 45,
    totalStars: 128,
    totalCommits: 1250,
    totalFollowers: 89,
    languages: [
      { name: 'TypeScript', percentage: 35, color: '#3178C6' },
      { name: 'JavaScript', percentage: 25, color: '#F7DF1E' },
      { name: 'Python', percentage: 20, color: '#3776AB' },
      { name: 'CSS', percentage: 10, color: '#1572B6' },
      { name: 'HTML', percentage: 10, color: '#E34F26' },
    ],
  };

  const monthlyOutput = [
    { month: '1月', articles: 3, slides: 2, projects: 1 },
    { month: '2月', articles: 4, slides: 1, projects: 2 },
    { month: '3月', articles: 2, slides: 3, projects: 1 },
    { month: '4月', articles: 5, slides: 2, projects: 3 },
    { month: '5月', articles: 3, slides: 4, projects: 2 },
    { month: '6月', articles: 6, slides: 1, projects: 1 },
    { month: '7月', articles: 4, slides: 3, projects: 2 },
    { month: '8月', articles: 3, slides: 2, projects: 1 },
    { month: '9月', articles: 5, slides: 1, projects: 3 },
    { month: '10月', articles: 4, slides: 4, projects: 2 },
    { month: '11月', articles: 6, slides: 2, projects: 1 },
    { month: '12月', articles: 3, slides: 3, projects: 2 },
  ];

  const techStackUsage = [
    { name: 'React', usage: 85, trend: 'up' },
    { name: 'TypeScript', usage: 90, trend: 'up' },
    { name: 'Next.js', usage: 75, trend: 'up' },
    { name: 'Node.js', usage: 70, trend: 'stable' },
    { name: 'Python', usage: 60, trend: 'up' },
    { name: 'AWS', usage: 55, trend: 'up' },
    { name: 'Docker', usage: 50, trend: 'stable' },
    { name: 'PostgreSQL', usage: 65, trend: 'up' },
  ];

  const contributionData = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(2024, 0, 1 + i),
    count: Math.floor(Math.random() * 10),
  }));

  return (
    <main className="min-h-screen bg-transparent">
      {/* シンプルな2Dグラデーション背景 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-600 opacity-80" />
      <Navigation />

      {/* ヒーローセクション */}
      <section className="pt-20 pb-16 bg-transparent relative overflow-hidden">
        <TitleBackground />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Analytics
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              開発活動とアウトプットのデータを可視化して、技術力と継続性をお見せします
            </p>
          </motion.div>
        </div>
      </section>

      {/* GitHub統計セクション */}
      <section className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              GitHub統計
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              オープンソースへの貢献と開発活動の記録
            </p>
          </motion.div>

          {/* 統計カード */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: 'リポジトリ',
                value: githubStats.totalRepos,
                icon: '📦',
              },
              { label: 'スター', value: githubStats.totalStars, icon: '⭐' },
              {
                label: 'コミット',
                value: githubStats.totalCommits,
                icon: '💻',
              },
              {
                label: 'フォロワー',
                value: githubStats.totalFollowers,
                icon: '👥',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 言語使用率 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              使用言語の割合
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {githubStats.languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded mr-3"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {lang.name}
                      </span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {lang.percentage}%
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg
                    className="w-48 h-48 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {githubStats.languages.map((lang, index) => {
                      const total = githubStats.languages.reduce(
                        (sum, l) => sum + l.percentage,
                        0,
                      );
                      const startAngle = githubStats.languages
                        .slice(0, index)
                        .reduce(
                          (sum, l) => sum + (l.percentage / total) * 360,
                          0,
                        );
                      const angle = (lang.percentage / total) * 360;

                      return (
                        <motion.path
                          key={lang.name}
                          d={`M 50 50 L ${
                            50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                          } ${
                            50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                          } A 40 40 0 ${angle > 180 ? 1 : 0} 1 ${
                            50 +
                            40 *
                              Math.cos(((startAngle + angle) * Math.PI) / 180)
                          } ${
                            50 +
                            40 *
                              Math.sin(((startAngle + angle) * Math.PI) / 180)
                          } Z`}
                          fill={lang.color}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 月別アウトプットセクション */}
      <section className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              月別アウトプット
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              記事、スライド、プロジェクトの月別活動記録
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8"
          >
            <div className="grid grid-cols-12 gap-2 mb-8">
              {monthlyOutput.map((month, index) => (
                <motion.div
                  key={month.month}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    {month.month}
                  </div>
                  <div className="space-y-1">
                    <div
                      className="bg-blue-500 rounded"
                      style={{ height: `${month.articles * 4}px` }}
                      title={`記事: ${month.articles}件`}
                    />
                    <div
                      className="bg-green-500 rounded"
                      style={{ height: `${month.slides * 4}px` }}
                      title={`スライド: ${month.slides}件`}
                    />
                    <div
                      className="bg-purple-500 rounded"
                      style={{ height: `${month.projects * 4}px` }}
                      title={`プロジェクト: ${month.projects}件`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2" />
                <span className="text-gray-600 dark:text-gray-300">記事</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  スライド
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  プロジェクト
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 技術スタック使用頻度セクション */}
      <section className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              技術スタック使用頻度
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              各技術の使用頻度とトレンド
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStackUsage.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {tech.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                      {tech.usage}%
                    </span>
                    <span
                      className={`text-sm ${
                        tech.trend === 'up'
                          ? 'text-green-500'
                          : tech.trend === 'down'
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {tech.trend === 'up'
                        ? '↗'
                        : tech.trend === 'down'
                        ? '↘'
                        : '→'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.usage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Contribution風カレンダー */}
      <section className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              GitHub Contribution
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              年間の開発活動の可視化
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 overflow-x-auto"
          >
            <div className="grid grid-cols-53 gap-1 min-w-max">
              {contributionData.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.001 }}
                  viewport={{ once: true }}
                  className={`w-3 h-3 rounded-sm ${
                    day.count === 0
                      ? 'bg-gray-100 dark:bg-gray-600'
                      : day.count < 3
                      ? 'bg-green-200 dark:bg-green-800'
                      : day.count < 6
                      ? 'bg-green-400 dark:bg-green-600'
                      : day.count < 9
                      ? 'bg-green-600 dark:bg-green-400'
                      : 'bg-green-800 dark:bg-green-200'
                  }`}
                  title={`${day.date.toLocaleDateString()}: ${
                    day.count
                  } contributions`}
                />
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2 text-xs">
              <span className="text-gray-600 dark:text-gray-300">Less</span>
              <div className="flex space-x-1">
                {[
                  'bg-gray-100 dark:bg-gray-600',
                  'bg-green-200 dark:bg-green-800',
                  'bg-green-400 dark:bg-green-600',
                  'bg-green-600 dark:bg-green-400',
                  'bg-green-800 dark:bg-green-200',
                ].map((color, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-300">More</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
