'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slideshareUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function SlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      const res = await fetch('/api/slides');
      const data = await res.json();
      setSlides(data);
      setLoading(false);
    };
    fetchSlides();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">スライド一覧</h1>
        <Link
          href="/slides/new"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          新規作成
        </Link>
      </div>

      {/* フィルター */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="スライドを検索..."
          className="px-4 py-2 border rounded-lg flex-1 dark:bg-gray-800 dark:border-gray-700"
        />
        <select className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <option value="">すべてのタグ</option>
          <option value="tech">技術</option>
          <option value="design">デザイン</option>
          <option value="business">ビジネス</option>
        </select>
      </div>

      {/* スライドグリッド */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div>読み込み中...</div>
        ) : slides.length === 0 ? (
          <div>スライドがありません</div>
        ) : (
          slides.map((slide) => (
            <div
              key={slide.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              {/* スライドのサムネイル */}
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700" />

              {/* スライド情報 */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{slide.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {slide.content.slice(0, 100)}...
                </p>

                {/* ステータス */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      slide.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {slide.status === 'published' ? '公開済み' : '下書き'}
                  </span>
                  {slide.slideshareUrl && (
                    <a
                      href={slide.slideshareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      SlideShareで見る
                    </a>
                  )}
                </div>

                {/* タグ */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs dark:bg-blue-900 dark:text-blue-200">
                    プレゼンテーション
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
