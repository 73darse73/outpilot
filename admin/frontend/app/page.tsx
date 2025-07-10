'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AIで学びを
          <span className="text-blue-500">カタチ</span>に
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          ChatGPTでの学びを「残す・整える・発信する」ための
          <br />
          AIアウトプット支援ツール
        </p>
        <Link
          href="/threads/new/"
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          はじめる →
        </Link>
      </section>

      {/* 機能紹介 */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">できること</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'チャット',
                description:
                  'AIとの対話を記録し、あとから記事やスライドに変換できます',
              },
              {
                title: '記事化',
                description:
                  'チャット内容を自動で整理し、Qiitaや自ブログに投稿できます',
              },
              {
                title: 'スライド化',
                description: '学んだ内容を自動でスライド資料に変換します',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg text-center dark:bg-gray-800 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最近の投稿 */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">最近の投稿</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="/articles"
              className="p-6 border rounded-lg bg-white hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-2">
                Next.jsとTypeScriptでポートフォリオサイトを作る
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Next.jsとTypeScriptを使って、モダンなポートフォリオサイトを作る方法を解説します。
              </p>
            </Link>
            <Link
              href="/slides"
              className="p-6 border rounded-lg bg-white hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-2">
                モダンなWebアプリケーション開発入門
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Next.js、TypeScript、Tailwind
                CSSを使った最新のWeb開発手法について解説
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
