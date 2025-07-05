'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ThreadsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* 左サイドバー */}
      <div
        className={`
        fixed left-0 top-0 h-full border-r transition-all duration-300 overflow-hidden
        bg-gray-50 dark:bg-gray-800
        border-gray-200 dark:border-gray-700
        ${isSidebarOpen ? 'w-64' : 'w-0'}
      `}
      >
        <div className="w-64 h-full">
          {/* 固定幅のコンテナ */}
          <div className="p-4">
            <Link
              href="/threads/new"
              className="block w-full py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              新規チャット
            </Link>
          </div>
          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            {/* 仮のスレッド一覧 */}
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((id) => (
              <Link
                key={id}
                href={`/threads/${id}`}
                className="block p-4 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                チャット {id}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* サイドバー開閉ボタン */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`
          fixed top-4 z-10 p-2 rounded transition-all duration-300
          bg-gray-200 dark:bg-gray-700
          hover:bg-gray-300 dark:hover:bg-gray-600
          text-gray-700 dark:text-gray-300
          ${isSidebarOpen ? 'left-64' : 'left-0'}
        `}
      >
        {isSidebarOpen ? '←' : '→'}
      </button>

      {/* メインコンテンツ */}
      <main
        className={`
        flex-1 transition-all duration-300
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        ${isSidebarOpen ? 'ml-64' : 'ml-0'}
        ${isPreviewOpen ? 'mr-96' : 'mr-0'}
      `}
      >
        {children}
      </main>

      {/* 右サイドパネル（スライドプレビュー） */}
      <div
        className={`
        fixed right-0 top-0 h-full border-l transition-all duration-300
        bg-white dark:bg-gray-800
        border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100
        ${isPreviewOpen ? 'w-96' : 'w-0'}
      `}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">スライドプレビュー</h2>
          {/* ここにスライドプレビューの内容 */}
        </div>
      </div>

      {/* プレビュー開閉ボタン */}
      <button
        onClick={() => setIsPreviewOpen(!isPreviewOpen)}
        className={`
          fixed top-4 right-0 z-10 p-2 rounded transition-all duration-300
          bg-gray-200 dark:bg-gray-700
          hover:bg-gray-300 dark:hover:bg-gray-600
          text-gray-700 dark:text-gray-300
          ${isPreviewOpen ? 'right-96' : 'right-0'}
        `}
      >
        {isPreviewOpen ? '→' : '←'}
      </button>
    </div>
  );
}
