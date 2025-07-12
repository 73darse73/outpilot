'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
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
          <div className="text-gray-500">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* シンプルな2Dグラデーション背景 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-600 opacity-80" />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            プロジェクト・アウトプット
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            技術的な学びと実践の記録
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {[
              { id: 'projects', label: 'プロジェクト', count: projects.length },
              { id: 'articles', label: '記事', count: articles.length },
              { id: 'slides', label: 'スライド', count: slides.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as 'projects' | 'articles' | 'slides')
                }
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* コンテンツ */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {article.excerpt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'slides' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {slide.excerpt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
