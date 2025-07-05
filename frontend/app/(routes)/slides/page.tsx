'use client';

export default function SlidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">スライド一覧</h1>

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
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div
            key={id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
          >
            {/* スライドのサムネイル */}
            <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700" />

            {/* スライド情報 */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                モダンなWebアプリケーション開発入門
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Next.js、TypeScript、Tailwind
                CSSを使った最新のWeb開発手法について解説
              </p>

              {/* タグ */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs dark:bg-blue-900 dark:text-blue-200">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs dark:bg-blue-900 dark:text-blue-200">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
