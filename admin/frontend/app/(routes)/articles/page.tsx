'use client';

export default function ArticlesPage() {
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
        {[1, 2, 3].map((id) => (
          <article
            key={id}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-2">
              Next.jsとTypeScriptでポートフォリオサイトを作る
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Next.jsとTypeScriptを使って、モダンなポートフォリオサイトを作る方法を解説します。
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm dark:bg-blue-900 dark:text-blue-200">
                Next.js
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm dark:bg-blue-900 dark:text-blue-200">
                TypeScript
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
