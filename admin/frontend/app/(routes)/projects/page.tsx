'use client';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">プロジェクト</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
          >
            {/* プロジェクトカード */}
            <div className="aspect-video bg-gray-100 dark:bg-gray-700" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Outpilot</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ChatGPTでの学びを「残す・整える・発信する」ためのAIアウトプット支援ツール
              </p>

              {/* 技術スタック */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm dark:bg-blue-900 dark:text-blue-200">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm dark:bg-blue-900 dark:text-blue-200">
                  NestJS
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm dark:bg-blue-900 dark:text-blue-200">
                  OpenAI
                </span>
              </div>

              {/* リンク */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  GitHub →
                </a>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  デモ →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
