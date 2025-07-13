'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import PageTransition from '../components/PageTransition';
import TitleBackground from '../components/TitleBackground';
// import ArticleCard from './components/ArticleCard';
// import SlideCard from './components/SlideCard';
// import ProjectCard from './components/ProjectCard';
// import ProjectsBackground from '../components/ProjectsBackground';
import {
  articlesApi,
  slidesApi,
  Article as ApiArticle,
  Slide as ApiSlide,
} from '../../lib/api/client';

// ポートフォリオ用の拡張型定義
interface Article extends ApiArticle {
  excerpt: string;
  tags: string[];
  readTime: number;
  qiitaStats?: {
    lgtmCount: number;
    commentCount: number;
    viewCount: number;
  };
  hasFullContent: boolean;
}

interface Slide extends ApiSlide {
  excerpt: string;
  tags: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  createdAt: Date;
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<
    'projects' | 'articles' | 'slides'
  >('projects');
  const [articles, setArticles] = useState<Article[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // APIからデータを取得
        const [apiArticles, apiSlides] = await Promise.all([
          articlesApi.getAll(),
          slidesApi.getAll(),
        ]);

        // 記事データを変換
        const convertedArticles: Article[] = apiArticles.map((article) => ({
          ...article,
          excerpt: article.content.substring(0, 150) + '...',
          tags: ['技術', 'プログラミング'], // 仮のタグ
          readTime: Math.ceil(article.content.length / 500), // 仮の読了時間
          qiitaStats: {
            lgtmCount: Math.floor(Math.random() * 100),
            commentCount: Math.floor(Math.random() * 20),
            viewCount: Math.floor(Math.random() * 2000),
          },
          hasFullContent: false,
        }));

        // スライドデータを変換
        const convertedSlides: Slide[] = apiSlides.map((slide) => ({
          ...slide,
          excerpt: slide.content.substring(0, 100) + '...',
          tags: ['プレゼンテーション', '技術'],
        }));

        // プロジェクトデータ（仮）
        const mockProjects: Project[] = [
          {
            id: 1,
            title: 'Outpilot - AI学習支援ツール',
            description:
              'AIとチャット形式で記事やスライドを作成し、Qiita投稿やポートフォリオ表示まで一気通貫で管理できる学習支援ツール',
            technologies: ['Next.js', 'NestJS', 'OpenAI API', 'PostgreSQL'],
            githubUrl: 'https://github.com/example/outpilot',
            demoUrl: 'https://outpilot.example.com',
            createdAt: new Date('2024-01-01'),
          },
          {
            id: 2,
            title: 'ポートフォリオサイト',
            description:
              'モダンなデザインとアニメーションを採用したポートフォリオサイト',
            technologies: [
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'Framer Motion',
            ],
            githubUrl: 'https://github.com/example/portfolio',
            demoUrl: 'https://portfolio.example.com',
            createdAt: new Date('2024-01-05'),
          },
        ];

        setArticles(convertedArticles);
        setSlides(convertedSlides);
        setProjects(mockProjects);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        // エラー時は仮のデータを表示
        setArticles([]);
        setSlides([]);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent">
        {/* シンプルな2Dグラデーション背景 */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-600 opacity-80" />
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400"
          >
            読み込み中...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent">
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
                プロジェクト・アウトプット
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                技術的な学びと実践の記録
              </p>
            </motion.div>
          </div>
        </section>

        <main className="container mx-auto px-4 pb-16">
          {/* タブナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
              {[
                {
                  id: 'projects',
                  label: 'プロジェクト',
                  count: projects.length,
                },
                { id: 'articles', label: '記事', count: articles.length },
                { id: 'slides', label: 'スライド', count: slides.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as 'projects' | 'articles' | 'slides')
                  }
                  className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* コンテンツ */}
          <div className="max-w-6xl mx-auto">
            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {project.createdAt.toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs sm:text-sm rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-center rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                          GitHub
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'articles' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.readTime}分で読了</span>
                      {article.qiitaStats && (
                        <span>❤️ {article.qiitaStats.lgtmCount}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'slides' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {slides.map((slide, index) => (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {slide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                      {slide.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {slide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
