'use client';

import { useParams } from 'next/navigation';

export default function SlideDetailPage() {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* スライドヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          モダンなWebアプリケーション開発入門
        </h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <time>2024年3月15日</time>
          <span>15枚</span>
        </div>
      </div>

      {/* スライドプレビュー */}
      <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-lg mb-8">
        {/* ここにスライドビューアを実装 */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          スライドビューア
        </div>
      </div>

      {/* スライド情報 */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* 左カラム：説明 */}
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">概要</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Next.js、TypeScript、Tailwind
              CSSを使った最新のWeb開発手法について解説します。
              実践的な例を交えながら、モダンな開発フローを学びましょう。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">目次</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>モダンWeb開発の概要</li>
              <li>Next.jsの基礎</li>
              <li>TypeScriptで型安全なコーディング</li>
              <li>Tailwind CSSでのスタイリング</li>
              <li>実践的なアプリケーション開発</li>
            </ol>
          </section>
        </div>

        {/* 右カラム：メタ情報 */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">タグ</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                Next.js
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                Tailwind CSS
              </span>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">アクション</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                PDFをダウンロード
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors">
                共有
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
