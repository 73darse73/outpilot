'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useThreads } from '@/hooks/useThreads';

export default function ThreadsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { threads, loading, error, fetchThreads, createThread, deleteThread } =
    useThreads();

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleCreateThread = async () => {
    try {
      // デフォルトタイトルでスレッドを作成
      const newThread = await createThread({ title: '新規チャット' });
      router.push(`/threads/${newThread.id}`);
    } catch (err) {
      console.error('スレッド作成エラー:', err);
    }
  };

  const handleDeleteThread = async (id: number) => {
    if (confirm('このスレッドを削除しますか？')) {
      try {
        await deleteThread(id);
        // 現在のスレッドが削除された場合、新規作成ページにリダイレクト
        if (window.location.pathname === `/threads/${id}`) {
          router.push('/threads/new');
        }
      } catch (err) {
        console.error('スレッド削除エラー:', err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 pt-0">
      {/* フッターを非表示にするスタイル */}
      <style jsx global>{`
        footer {
          display: none !important;
        }
      `}</style>

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
          {/* 新規スレッド作成 */}
          <div className="p-4">
            <button
              onClick={handleCreateThread}
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              新規チャット
            </button>
          </div>

          {/* スレッド一覧 */}
          <div className="overflow-y-auto h-[calc(100%-8rem)]">
            {loading ? (
              <div className="p-4 text-center text-gray-500">読み込み中...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">
                エラー: {error}
              </div>
            ) : threads.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                スレッドがありません
              </div>
            ) : (
              threads.map((thread) => (
                <div key={thread.id} className="group relative">
                  <Link
                    href={`/threads/${thread.id}`}
                    className="block p-4 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <div className="font-medium truncate">
                      {thread.title || '無題のスレッド'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {thread._count?.messages || 0} メッセージ
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeleteThread(thread.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
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
