'use client';

import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TitleBackground from '../components/TitleBackground';
import PageTransition from '../components/PageTransition';
import { useSkillCategoryScore } from '../hooks/useSkillCategoryScore';
import { useGitHubData, analyzeGitHubStats } from '../hooks/useGitHubData';
import SkillScoreChart from '../components/SkillScoreChart';

export default function SkillsPage() {
  const categoryScores = useSkillCategoryScore();

  // GitHubデータを取得
  const {
    data: githubStats,
    loading: githubLoading,
    error: githubError,
  } = useGitHubData('73darse73');
  const analysis = githubStats ? analyzeGitHubStats(githubStats) : null;

  // スキル情報のマッピング
  const skillInfo = {
    React: { color: '#61DAFB', icon: '⚛️', category: 'フロントエンド' },
    TypeScript: { color: '#3178C6', icon: '📘', category: 'フロントエンド' },
    'Next.js': { color: '#000000', icon: '⚡', category: 'フロントエンド' },
    'Node.js': { color: '#339933', icon: '🟢', category: 'バックエンド' },
    Python: { color: '#3776AB', icon: '🐍', category: 'バックエンド' },
    AWS: { color: '#FF9900', icon: '☁️', category: 'インフラ' },
    'Tailwind CSS': {
      color: '#06B6D4',
      icon: '🎨',
      category: 'フロントエンド',
    },
    Prisma: { color: '#2D3748', icon: '🗄️', category: 'バックエンド' },
    PostgreSQL: { color: '#336791', icon: '🐘', category: 'インフラ' },
    Docker: { color: '#2496ED', icon: '🐳', category: 'インフラ' },
    Git: { color: '#F05032', icon: '📝', category: 'ツール' },
    'GitHub Actions': { color: '#2088FF', icon: '🤖', category: 'ツール' },
    Figma: { color: '#F24E1E', icon: '🎨', category: 'ツール' },
    Vercel: { color: '#000000', icon: '🚀', category: 'ツール' },
    JavaScript: { color: '#F7DF1E', icon: '📜', category: 'フロントエンド' },
    HTML: { color: '#E34F26', icon: '🌐', category: 'フロントエンド' },
    CSS: { color: '#1572B6', icon: '🎨', category: 'フロントエンド' },
    NestJS: { color: '#E0234E', icon: '🪺', category: 'バックエンド' },
    OpenAI: { color: '#10A37F', icon: '🤖', category: 'AI・機械学習' },
    Marp: { color: '#1A1A1A', icon: '📊', category: 'ツール' },
    Qiita: { color: '#55C500', icon: '📝', category: 'ツール' },
  };

  const getSkillColor = (name: string): string => {
    return skillInfo[name as keyof typeof skillInfo]?.color || '#6B7280';
  };

  const getSkillIcon = (name: string): string => {
    return skillInfo[name as keyof typeof skillInfo]?.icon || '💻';
  };

  const getSkillCategory = (name: string): string => {
    return skillInfo[name as keyof typeof skillInfo]?.category || 'その他';
  };

  // カテゴリ別にスキルをグループ化
  const skillsByCategory = categoryScores.reduce((acc, skill) => {
    const category = getSkillCategory(skill.name);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      ...skill,
      color: getSkillColor(skill.name),
      icon: getSkillIcon(skill.name),
    });
    return acc;
  }, {} as Record<string, any[]>);

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
                スキル分析
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                技術スタックとアウトプット実績をカテゴリ別に詳細分析
              </p>
            </motion.div>
          </div>
        </section>

        {/* GitHub連携状況 */}
        {githubError && (
          <section className="py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div className="text-yellow-600 dark:text-yellow-400 text-xl mr-3">
                    ⚠️
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                      GitHub連携について
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                      {githubError} - モックデータを使用して表示しています。
                      実際のGitHubデータを表示するには、環境変数にGitHubトークンを設定してください。
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* カテゴリ別スキル表示 */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                カテゴリ別スキル
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                技術領域ごとのスキルレベルと実績
              </p>
            </motion.div>

            {Object.entries(skillsByCategory).map(
              ([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{skill.icon}</span>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {skill.name}
                            </h4>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {skill.total.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ポイント
                            </div>
                          </div>
                        </div>

                        {/* スコア内訳 */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              GitHub
                            </span>
                            <span className="font-medium">
                              {skill.github.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Qiita
                            </span>
                            <span className="font-medium">
                              {skill.qiita.posts.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        {/* レベルバー */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                          <motion.div
                            className="h-2 rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${Math.min(
                                100,
                                (skill.total / 100) * 100,
                              )}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: skillIndex * 0.1,
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          レベル{' '}
                          {Math.min(100, Math.round((skill.total / 100) * 100))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </section>

        {/* GitHub分析セクション */}
        {analysis && (
          <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  GitHub分析
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  開発活動の詳細分析
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm"
                >
                  <div className="text-3xl mb-2">
                    {analysis.activityLevel === 'high'
                      ? '🔥'
                      : analysis.activityLevel === 'medium'
                      ? '⚡'
                      : '📈'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    アクティビティレベル
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">
                    {analysis.activityLevel}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm"
                >
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    最近の活動
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {analysis.metrics.recentActivity}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    30日間のコミット
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm"
                >
                  <div className="text-3xl mb-2">⭐</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    人気度スコア
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {analysis.popularityScore.toFixed(1)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    スター/フォロワー比
                  </p>
                </motion.div>
              </div>

              {/* 主要技術 */}
              {analysis.topLanguages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    主要技術スタック
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {analysis.topLanguages.map((lang, index) => (
                      <motion.span
                        key={lang.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {lang.name} ({lang.percentage}%)
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* スキルスコアグラフ */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                スキルスコア分布
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                技術スタックの詳細なスコア分析
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8"
            >
              <SkillScoreChart />
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
