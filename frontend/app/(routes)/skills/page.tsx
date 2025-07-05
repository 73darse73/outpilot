'use client';

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">スキル</h1>

      {/* 統計サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="text-4xl font-bold mb-2">42</div>
          <div className="text-gray-600 dark:text-gray-400">記事投稿数</div>
        </div>
        <div className="p-6 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="text-4xl font-bold mb-2">15</div>
          <div className="text-gray-600 dark:text-gray-400">スライド数</div>
        </div>
        <div className="p-6 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="text-4xl font-bold mb-2">24</div>
          <div className="text-gray-600 dark:text-gray-400">技術タグ数</div>
        </div>
      </div>

      {/* タグ別グラフ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">タグ別投稿数</h2>
        <div className="h-64 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
          {/* ここにグラフを表示 */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            グラフ表示エリア
          </div>
        </div>
      </section>

      {/* 月別グラフ */}
      <section>
        <h2 className="text-2xl font-bold mb-6">月別投稿推移</h2>
        <div className="h-64 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
          {/* ここにグラフを表示 */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            グラフ表示エリア
          </div>
        </div>
      </section>
    </div>
  );
}
