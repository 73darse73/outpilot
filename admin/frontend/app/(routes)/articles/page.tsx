'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  qiitaUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

      {/* フィルター */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="記事を検索..."
          className="px-4 py-2 border rounded-lg flex-1 dark:bg-gray-800 dark:border-gray-700"
        />
        <select className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <option value="">すべてのタグ</option>
          <option value="react">React</option>
          <option value="typescript">TypeScript</option>
          <option value="nextjs">Next.js</option>
        </select>
      </div>

      {/* 記事リスト */}
      <div className="grid gap-6">
        {loading ? (
          <div>読み込み中...</div>
        ) : articles.length === 0 ? (
          <div>記事がありません</div>
        ) : (
          articles.map((article) => (
            <article
              key={article.id}
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/threads/${article.id}`}>{article.title}</Link>
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    article.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {article.status === 'published' ? '投稿済み' : '下書き'}
                </span>
                {article.qiitaUrl && (
                  <a
                    href={article.qiitaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Qiitaで見る
                  </a>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {article.content.slice(0, 100)}...
              </p>
              <div className="text-xs text-gray-400">
                作成日:{' '}
                {new Date(article.createdAt).toLocaleDateString('ja-JP')}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
