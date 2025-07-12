'use client';

import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface Slide {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
}

interface SlideCardProps {
  slide: Slide;
}

export default function SlideCard({ slide }: SlideCardProps) {
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ja });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* スライドヘッダー */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {slide.title}
        </h3>

        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-3">
          {slide.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* スライドの説明 */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {slide.excerpt}
        </p>

        {/* 作成日 */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDate(slide.createdAt)}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="px-6 pb-6">
        <a
          href={`/slides/${slide.id}`}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          スライドを見る
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
