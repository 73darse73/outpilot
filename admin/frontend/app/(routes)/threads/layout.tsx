'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useThreads } from '@/hooks/useThreads';
import { PreviewProvider, usePreview } from './PreviewContext';
import { ArticlePreview } from './components/ArticlePreview';
import { SlidePreview } from './components/SlidePreview';
import { getArticle, getSlide } from '@/lib/api/client';
import { useParams } from 'next/navigation';

function ThreadsLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { threads, loading, error, fetchThreads, createThread, deleteThread } =
    useThreads();
  const {
    isPreviewOpen,
    setIsPreviewOpen,
    previewType,
    setPreviewType,
    previewContent,
    previewTitle,
    isGeneratingPreview,
    fetchPreview,
    previewArticle,
  } = usePreview();
  // DB取得用のstate名を削除
  const [previewTypeDb, setPreviewTypeDb] = useState<'article' | 'slide'>(
    'article',
  );
  const [isLoadingPreviewDb, setIsLoadingPreviewDb] = useState(false);
  const [threadId, setThreadId] = useState<number | null>(null);

  const params = useParams();
  console.log('params:', params);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  useEffect(() => {
    if (params && params.id) {
      setThreadId(Number(params.id));
      console.log('setThreadId:', params.id);
    }
  }, [params]);

  useEffect(() => {
    console.log('threadId after set:', threadId);
  }, [threadId]);

  // プレビュー切り替え時にDBから取得
  useEffect(() => {
    console.log('threadId:', threadId);
    if (!threadId) return;
    setIsLoadingPreviewDb(true);
    const fetchPreview = async () => {
      try {
        if (previewTypeDb === 'article') {
          const article = await getArticle(threadId);
          console.log('getArticle result:', article);
          if (article) {
            // setPreviewContentDb(article.content); // Removed
            // setPreviewTitleDb(article.title); // Removed
          } else {
            // setPreviewContentDb('記事がありません'); // Removed
            // setPreviewTitleDb(''); // Removed
          }
        } else {
          const slide = await getSlide(threadId);
          console.log('getSlide result:', slide);
          if (slide) {
            // setPreviewContentDb(slide.content); // Removed
            // setPreviewTitleDb(slide.title); // Removed
          } else {
            // setPreviewContentDb('スライドがありません'); // Removed
            // setPreviewTitleDb(''); // Removed
          }
        }
      } finally {
        setIsLoadingPreviewDb(false);
      }
    };
    fetchPreview();
  }, [previewTypeDb, threadId]);

  useEffect(() => {
    if (threadId && previewTypeDb) {
      fetchPreview(threadId, previewTypeDb);
    }
  }, [threadId, previewTypeDb]);

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
        fixed left-0 top-0 h-full border-r transition-all duration-300 overflow-hidden z-20
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
                    <div className="font-medium break-words pr-8">
                      {thread.title || '無題のスレッド'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
        flex-1 transition-all duration-300 min-w-0
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        ${isSidebarOpen ? 'ml-64' : 'ml-0'}
        ${isPreviewOpen ? 'mr-96' : 'mr-0'}
      `}
      >
        {children}
      </main>

      {/* 右サイドパネル（プレビュー） */}
      <div
        className={`
        fixed right-0 top-0 h-full border-l transition-all duration-300 z-20
        bg-white dark:bg-gray-800
        border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100
        ${isPreviewOpen ? 'w-96' : 'w-0'}
      `}
      >
        <div className="h-full flex flex-col">
          {/* プレビューヘッダー */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {previewTypeDb === 'article'
                  ? '記事プレビュー'
                  : previewTypeDb === 'slide'
                  ? 'スライドプレビュー'
                  : 'プレビュー'}
              </h3>
              {previewTypeDb && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsPreviewOpen(false);
                    }}
                    className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    閉じる
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* プレビューコンテンツ */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* プレビュー切り替えタブ */}
            <div className="flex space-x-2 mb-4">
              <button
                className={`px-4 py-2 rounded-t ${
                  previewTypeDb === 'article'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setPreviewTypeDb('article')}
              >
                記事プレビュー
              </button>
              <button
                className={`px-4 py-2 rounded-t ${
                  previewTypeDb === 'slide'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setPreviewTypeDb('slide')}
              >
                スライドプレビュー
              </button>
            </div>
            {isLoadingPreviewDb ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {previewTypeDb === 'article'
                      ? '記事を読み込み中...'
                      : 'スライドを読み込み中...'}
                  </p>
                </div>
              </div>
            ) : previewTypeDb === 'article' ? (
              previewArticle ? (
                <ArticlePreview article={previewArticle} />
              ) : (
                <ArticlePreview
                  article={{
                    id: 0,
                    title: previewTitle,
                    content: previewContent,
                    status: 'draft',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  }}
                />
              )
            ) : (
              <SlidePreview
                slide={{
                  id: 0,
                  title: previewTitle,
                  content: previewContent,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* プレビュー開閉ボタン */}
      <button
        onClick={() => setIsPreviewOpen(!isPreviewOpen)}
        className={`
          fixed top-4 z-10 p-2 rounded transition-all duration-300
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

export default function ThreadsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PreviewProvider>
      <ThreadsLayoutContent>{children}</ThreadsLayoutContent>
    </PreviewProvider>
  );
}
