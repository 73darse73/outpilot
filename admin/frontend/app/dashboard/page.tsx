'use client';

import { useThreads, useSlides, useArticles } from '@/hooks/useApi';
import { formatDate, truncateText } from '@/lib/utils';
import Navigation from '../components/Navigation';

export default function DashboardPage() {
  const {
    data: threads,
    loading: threadsLoading,
    error: threadsError,
  } = useThreads();
  const {
    data: slides,
    loading: slidesLoading,
    error: slidesError,
  } = useSlides();
  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useArticles();

  if (threadsLoading || slidesLoading || articlesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">データを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            ダッシュボード
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Threads */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                スレッド
              </h2>
              {threadsError ? (
                <p className="text-red-500">エラー: {threadsError}</p>
              ) : threads && threads.length > 0 ? (
                <div className="space-y-3">
                  {threads.map((thread) => (
                    <div
                      key={thread.id}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <h3 className="font-medium text-gray-900">
                        {thread.title || '無題のスレッド'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(thread.createdAt)}
                        {thread._count && (
                          <span className="ml-2">
                            ({thread._count.messages}件のメッセージ)
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">スレッドがありません</p>
              )}
            </div>

            {/* Slides */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                スライド
              </h2>
              {slidesError ? (
                <p className="text-red-500">エラー: {slidesError}</p>
              ) : slides && slides.length > 0 ? (
                <div className="space-y-3">
                  {slides.map((slide) => (
                    <div
                      key={slide.id}
                      className="border-l-4 border-green-500 pl-4"
                    >
                      <h3 className="font-medium text-gray-900">
                        {slide.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {truncateText(slide.content, 100)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(slide.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">スライドがありません</p>
              )}
            </div>

            {/* Articles */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">記事</h2>
              {articlesError ? (
                <p className="text-red-500">エラー: {articlesError}</p>
              ) : articles && articles.length > 0 ? (
                <div className="space-y-3">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="border-l-4 border-purple-500 pl-4"
                    >
                      <h3 className="font-medium text-gray-900">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {truncateText(article.content, 100)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(article.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">記事がありません</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
