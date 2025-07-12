'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
}

const highlights: Project[] = [
  {
    id: '1',
    title: 'Outpilot',
    description:
      'AIを活用したプレゼンテーション作成ツール。自然言語でスライドを生成し、効率的な資料作成を支援します。',
    image: '/api/placeholder/400/250',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Prisma'],
    link: '/projects',
    github: 'https://github.com/yourusername/outpilot',
  },
  {
    id: '2',
    title: 'ポートフォリオサイト',
    description:
      'モダンなデザインとアニメーションを採用した個人ポートフォリオサイト。技術力とアウトプット力をアピール。',
    image: '/api/placeholder/400/250',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: '/',
    github: 'https://github.com/yourusername/portfolio',
  },
  {
    id: '3',
    title: 'ECサイト',
    description:
      'フルスタックECサイト。商品管理、決済、ユーザー管理機能を備えた本格的なオンラインショップ。',
    image: '/api/placeholder/400/250',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    link: '/projects',
    github: 'https://github.com/yourusername/ec-site',
  },
  {
    id: '4',
    title: 'タスク管理アプリ',
    description:
      'チーム協働に特化したタスク管理アプリ。リアルタイム更新、通知機能で効率的なプロジェクト管理を実現。',
    image: '/api/placeholder/400/250',
    tags: ['React', 'Socket.io', 'MongoDB', 'Express'],
    link: '/projects',
    github: 'https://github.com/yourusername/task-manager',
  },
];

export default function HighlightsSection() {
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
          {highlights.map((project, index) => (
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
                      <div className="text-sm opacity-90">{project.title}</div>
                    </div>
                  </div>
                </div>

                {/* プロジェクト情報 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

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
