import { useState, useEffect } from 'react';
import { articlesApi, slidesApi, Article, Slide } from '../../lib/api/client';

interface PortfolioStats {
  totalProjects: number;
  totalArticles: number;
  totalSlides: number;
  publishedArticles: number;
  recentArticles: Article[];
  recentSlides: Slide[];
  loading: boolean;
  error: string | null;
}

export function usePortfolioData() {
  const [stats, setStats] = useState<PortfolioStats>({
    totalProjects: 0,
    totalArticles: 0,
    totalSlides: 0,
    publishedArticles: 0,
    recentArticles: [],
    recentSlides: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStats((prev) => ({ ...prev, loading: true, error: null }));

        // 記事とスライドを並行取得
        const [articles, slides] = await Promise.all([
          articlesApi.getAll(),
          slidesApi.getAll(),
        ]);

        // 統計情報を計算
        const publishedArticles = articles.filter(
          (article) => article.status === 'published',
        );
        const recentArticles = publishedArticles
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 3);

        const recentSlides = slides
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 3);

        // プロジェクト数（記事とスライドの合計として計算）
        const totalProjects = articles.length + slides.length;

        setStats({
          totalProjects,
          totalArticles: articles.length,
          totalSlides: slides.length,
          publishedArticles: publishedArticles.length,
          recentArticles,
          recentSlides,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('ポートフォリオデータの取得に失敗:', error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'データの取得に失敗しました',
        }));
      }
    };

    fetchData();
  }, []);

  return stats;
}
