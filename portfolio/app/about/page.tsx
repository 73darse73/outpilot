'use client';

import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TitleBackground from '../components/TitleBackground';
import PageTransition from '../components/PageTransition';
// import AboutBackground from '../components/AboutBackground';

export default function AboutPage() {
  const experiences = [
    {
      year: '2024 - Present',
      title: 'フリーランスWebエンジニア',
      company: 'Freelance',
      description:
        'フルスタック開発、フロントエンド開発、技術コンサルティングを中心に活動。',
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS'],
      duration: 18,
      type: 'work',
    },
    {
      year: '2022 - 2024',
      title: 'フロントエンドエンジニア',
      company: 'Tech Company',
      description:
        '大規模Webアプリケーションの開発・保守。パフォーマンス最適化とユーザー体験の向上に注力。',
      skills: ['React', 'Vue.js', 'TypeScript', 'Webpack', 'Jest'],
      duration: 24,
      type: 'work',
    },
    {
      year: '2020 - 2022',
      title: 'Webデベロッパー',
      company: 'Startup',
      description:
        'スタートアップでのフルスタック開発。MVP開発から本格サービスまで幅広く担当。',
      skills: ['JavaScript', 'Python', 'Django', 'PostgreSQL', 'Docker'],
      duration: 24,
      type: 'work',
    },
    {
      year: '2016 - 2020',
      title: '情報工学学士',
      company: '○○大学',
      description:
        'コンピュータサイエンスを専攻し、アルゴリズム、データ構造、ソフトウェア工学を学ぶ。',
      skills: ['アルゴリズム', 'データ構造', 'ソフトウェア工学'],
      duration: 48,
      type: 'education',
    },
  ];

  const interests = [
    {
      title: 'AI・機械学習',
      description:
        '最新のAI技術に興味があり、特に自然言語処理と画像認識の応用を研究しています。',
      icon: '🤖',
    },
    {
      title: 'Webパフォーマンス',
      description:
        '高速でレスポンシブなWebアプリケーションの開発に情熱を注いでいます。',
      icon: '⚡',
    },
    {
      title: 'オープンソース',
      description:
        'コミュニティへの貢献を大切にし、オープンソースプロジェクトに積極的に参加しています。',
      icon: '🌟',
    },
    {
      title: '技術ブログ',
      description:
        '学んだことを共有するため、技術ブログを定期的に更新しています。',
      icon: '📝',
    },
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
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                技術力と創造性を活かして、ユーザーに価値のあるプロダクトを作り続けるWebエンジニアです。
              </p>
            </motion.div>
          </div>
        </section>

        {/* 自己紹介セクション */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  自己紹介
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  <p>
                    こんにちは！Kodamaと申します。Webエンジニアとして3年以上の経験を持ち、
                    フロントエンドからバックエンドまで幅広い技術スタックで開発を行っています。
                  </p>
                  <p>
                    最新技術への好奇心が強く、常に新しい技術を学び、実践に活かすことを心がけています。
                    特にReact、TypeScript、Next.jsなどのモダンなフロントエンド技術に精通しており、
                    ユーザー体験を重視した高品質なWebアプリケーションの開発を得意としています。
                  </p>
                  <p>
                    フリーランスとして活動する傍ら、技術ブログの執筆やオープンソースプロジェクトへの貢献も行っており、
                    技術コミュニティへの還元も大切にしています。
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl sm:text-6xl mb-4">👨‍💻</div>
                    <div className="text-lg sm:text-xl font-semibold">
                      Kodama
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">
                      Web Engineer
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 職歴セクション */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                経歴・学歴
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                これまでの経験と学びの記録
              </p>
            </motion.div>

            {/* タイムライン */}
            <div className="relative">
              {/* 中央の縦線 */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-600"
              ></motion.div>

              <div className="space-y-8 sm:space-y-12">
                {experiences.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.2,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    className="relative flex items-start"
                  >
                    {/* タイムラインの丸 */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.2 + 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2 }}
                      className={`absolute left-2 sm:left-6 top-4 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800 z-10 ${
                        item.type === 'work' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}
                    >
                      {/* 内側の丸 */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.2 + 0.5,
                        }}
                        viewport={{ once: true }}
                        className="absolute inset-1 bg-white rounded-full"
                      />
                    </motion.div>

                    {/* カード */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.2 + 0.1,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        x: 5,
                        transition: { duration: 0.2 },
                      }}
                      className="ml-8 sm:ml-16 flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mr-2">
                            {item.year}
                          </span>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded mr-2 ${
                              item.type === 'work'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                            }`}
                          >
                            {item.type === 'work' ? '職歴' : '学歴'}
                          </span>
                          <span className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                          {item.company}
                        </div>
                      </div>
                      <div className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2">
                        {item.description}
                      </div>
                      {item.skills && item.skills.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: idx * 0.2 + 0.4,
                          }}
                          viewport={{ once: true }}
                          className="flex flex-wrap gap-2 mt-2"
                        >
                          {item.skills.map((skill, skillIdx) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: idx * 0.2 + 0.4 + skillIdx * 0.1,
                              }}
                              viewport={{ once: true }}
                              className={`px-2 py-1 text-xs rounded ${
                                item.type === 'work'
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                  : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                              }`}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 興味・関心セクション */}
        <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                興味・関心
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                技術的な興味と今後の目標について
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl sm:text-4xl mb-4">
                    {interest.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {interest.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
