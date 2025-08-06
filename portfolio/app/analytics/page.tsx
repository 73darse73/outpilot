'use client';

import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TitleBackground from '../components/TitleBackground';
import PageTransition from '../components/PageTransition';
import { useSkillCategoryScore } from '../hooks/useSkillCategoryScore';
import { useGitHubData, analyzeGitHubStats } from '../hooks/useGitHubData';
import SkillScoreChart from '../components/SkillScoreChart';

export default function AnalyticsPage() {
  const categoryScores = useSkillCategoryScore();

  // GitHubデータを取得（実際のユーザー名に変更してください）
  const {
    data: githubStats,
    loading: githubLoading,
    error: githubError,
  } = useGitHubData('73darse73');

  // GitHubデータがない場合のフォールバック
  const fallbackStats = {
    totalRepositories: 45,
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
    recentActivity: 15,
    contributionData: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(2024, 0, 1 + i).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10),
    })),
  };

  // 実際のGitHubデータまたはフォールバックデータを使用
  const stats = githubStats || fallbackStats;
  const analysis = githubStats ? analyzeGitHubStats(githubStats) : null;

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

  return (
    <PageTransition>
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Analytics
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                開発活動とアウトプットのデータを可視化して、技術力と継続性をお見せします
              </p>
            </motion.div>
          </div>
        </section>

        {/* GitHub統計セクション */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                GitHub統計
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                オープンソースへの貢献と開発活動の記録
              </p>
              {githubError && (
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
                  ⚠️ {githubError} (モックデータを表示中)
                </div>
              )}
            </motion.div>

            {/* 統計カード */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                {
                  label: 'リポジトリ',
                  value: stats.totalRepositories,
                  icon: '📦',
                },
                { label: 'スター', value: stats.totalStars, icon: '⭐' },
                {
                  label: 'コミット',
                  value: stats.totalCommits,
                  icon: '💻',
                },
                {
                  label: 'フォロワー',
                  value: stats.totalFollowers,
                  icon: '👥',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {githubLoading ? '...' : stat.value.toLocaleString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* アクティビティレベル表示 */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                  アクティビティ分析
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {analysis.activityLevel === 'high'
                        ? '🔥'
                        : analysis.activityLevel === 'medium'
                        ? '⚡'
                        : '📈'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      アクティビティ: {analysis.activityLevel}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analysis.metrics.recentActivity}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      最近30日間のコミット
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {analysis.popularityScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      人気度スコア
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 言語使用率 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                使用言語の割合
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  {stats.languages.map((lang, index) => (
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
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded mr-2 sm:mr-3"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">
                          {lang.name}
                        </span>
                      </div>
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        {lang.percentage}%
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48">
                    <svg
                      className="w-32 h-32 sm:w-48 sm:h-48 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      {stats.languages.map((lang, index) => {
                        const total = stats.languages.reduce(
                          (sum, l) => sum + l.percentage,
                          0,
                        );
                        const startAngle = stats.languages
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
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
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
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-8 overflow-x-auto"
            >
              <div className="grid grid-cols-12 gap-1 sm:gap-2 mb-6 sm:mb-8 min-w-max">
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
                        style={{ height: `${month.articles * 3}px` }}
                        title={`記事: ${month.articles}件`}
                      />
                      <div
                        className="bg-green-500 rounded"
                        style={{ height: `${month.slides * 3}px` }}
                        title={`スライド: ${month.slides}件`}
                      />
                      <div
                        className="bg-purple-500 rounded"
                        style={{ height: `${month.projects * 3}px` }}
                        title={`プロジェクト: ${month.projects}件`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded mr-1 sm:mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">記事</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded mr-1 sm:mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    スライド
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded mr-1 sm:mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    プロジェクト
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 技術スタック使用頻度セクション */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                技術スタック使用頻度
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                各技術の使用頻度とトレンド
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {techStackUsage.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      {tech.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mr-2">
                        {tech.usage}%
                      </span>
                      <span
                        className={`text-xs sm:text-sm ${
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
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
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
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-8 overflow-x-auto"
            >
              <div className="grid grid-cols-53 gap-1 min-w-max">
                {stats.contributionData.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.001 }}
                    viewport={{ once: true }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${
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
                    title={`${day.date}: ${day.count} contributions`}
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
                    <div
                      key={i}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${color}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300">More</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* カテゴリ別スキルスコアセクション */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                カテゴリ別スキルスコア
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                技術スタックとアウトプット実績をカテゴリ別に分析
              </p>
            </motion.div>

            {/* カテゴリ別スキルスコアリスト */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  カテゴリ別スコア
                </h3>
                <div className="grid gap-4">
                  {categoryScores.map((cat, index) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-4 px-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {cat.name}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {cat.github.commits + cat.qiita.posts}{' '}
                          件のアウトプット
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {cat.total.toFixed(1)}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ポイント
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* カテゴリスコアグラフ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  スキルスコア分布
                </h3>
                <SkillScoreChart />
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
