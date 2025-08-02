'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreateArticleData {
  title: string;
  content: string;
  status: 'draft' | 'published';
  qiitaUrl?: string;
}

export default function NewArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateArticleData>({
    title: '',
    content: '',
    status: 'draft',
    qiitaUrl: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/articles');
      } else {
        console.error('記事の作成に失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">新しい記事を作成</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            内容
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={10}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            ステータス
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as 'draft' | 'published',
              })
            }
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="draft">下書き</option>
            <option value="published">公開</option>
          </select>
        </div>

        <div>
          <label htmlFor="qiitaUrl" className="block text-sm font-medium mb-2">
            Qiita URL（オプション）
          </label>
          <input
            type="url"
            id="qiitaUrl"
            value={formData.qiitaUrl}
            onChange={(e) =>
              setFormData({ ...formData, qiitaUrl: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            placeholder="https://qiita.com/..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '作成中...' : '記事を作成'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
