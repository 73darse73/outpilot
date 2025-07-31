'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { mockProjects } from '../../lib/api/mockData';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  category?: string;
  status?: string;
  period?: string;
}

export default function HighlightsSection() {
  const { recentArticles, recentSlides, loading } = usePortfolioData();

  // 動的プロジェクトデータを生成
  const dynamicHighlights: Project[] = [
    // 固定プロジェクト（モックデータから取得）
    ...mockProjects,
    // 最新記事（動的）
    ...(recentArticles.length > 0
      ? [
          {
            id: 'latest-article',
            title: '最新記事',
            description: recentArticles[0]?.title || '技術記事',
            image: '/api/placeholder/400/250',
            tags: ['技術記事', 'Qiita'],
            link: recentArticles[0]?.qiitaUrl || '/projects',
            category: '技術記事',
            status: '公開済み',
          },
        ]
      : []),
    // 最新スライド（動的）
    ...(recentSlides.length > 0
      ? [
          {
            id: 'latest-slide',
            title: '最新スライド',
            description: recentSlides[0]?.title || 'プレゼンテーション',
            image: '/api/placeholder/400/250',
            tags: ['プレゼンテーション', 'Marp'],
            link: '/projects',
            category: 'プレゼンテーション',
            status: '公開済み',
          },
        ]
      : []),
  ];

  return (
    <section className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            代表的なプロジェクト
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            技術力と創造性を活かして開発したプロジェクトの一部をご紹介します
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading
            ? // ローディング状態
              Array.from({ length: 4 }, (_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
                      <div className="flex gap-2 mb-6">
                        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                      </div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                </motion.div>
              ))
            : dynamicHighlights.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* プロジェクト画像 */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-600 overflow-hidden">
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-4xl mb-2">🚀</div>
                          <div className="text-sm opacity-90">
                            {project.title}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* プロジェクト情報 */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        {project.category && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* ステータスと期間 */}
                      {(project.status || project.period) && (
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                          {project.status && (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              {project.status}
                            </span>
                          )}
                          {project.period && (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {project.period}
                            </span>
                          )}
                        </div>
                      )}

                      {/* タグ */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* アクションボタン */}
                      <div className="flex gap-3">
                        <Link
                          href={project.link}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          詳細を見る
                        </Link>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* もっと見るボタン */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            すべてのプロジェクトを見る
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
