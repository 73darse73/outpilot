'use client';

import { useEffect, useState, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Message as MessageComponent } from '../components/Message';
import { useThread } from '@/hooks/useThreads';
import { MessageRole } from '@/lib/api/types';
import { threadsApi } from '@/lib/api/client';
import { usePreview } from '../PreviewContext';

export default function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const threadId = parseInt(resolvedParams.id);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // プレビュー関連の状態
  const {
    setPreviewType,
    setPreviewContent,
    setPreviewTitle,
    setIsGeneratingPreview,
    setIsPreviewOpen,
    fetchPreview,
  } = usePreview();

  // textareaの高さを動的に調整する関数
  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    const newHeight = Math.min(element.scrollHeight, 120); // 最大120px
    element.style.height = `${newHeight}px`;
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // アウトプット指示を検出する関数
  const detectOutputRequest = (content: string): 'article' | 'slide' | null => {
    const articleKeywords = [
      '記事にして',
      '記事化',
      'Qiita',
      'ブログ',
      '技術記事',
    ];
    const slideKeywords = [
      'スライドにして',
      'スライド化',
      'プレゼン',
      '発表資料',
    ];

    const lowerContent = content.toLowerCase();

    if (
      articleKeywords.some((keyword) =>
        lowerContent.includes(keyword.toLowerCase()),
      )
    ) {
      return 'article';
    }

    if (
      slideKeywords.some((keyword) =>
        lowerContent.includes(keyword.toLowerCase()),
      )
    ) {
      return 'slide';
    }

    return null;
  };

  // プレビューを生成する関数
  const generatePreview = async (type: 'article' | 'slide') => {
    if (!thread || thread.messages.length === 0) return;

    setIsGeneratingPreview(true);
    setIsPreviewOpen(true); // プレビューを自動で開く
    try {
      const messages = thread.messages.map((msg) => msg.content).join('\n\n');

      if (type === 'article') {
        // 記事プレビューを生成
        const response = await threadsApi.generateArticle(threadId);
        setPreviewContent(response.content);
        setPreviewTitle(response.title);
        setPreviewType('article');
      } else {
        // スライドプレビューを生成
        const response = await threadsApi.generateSlide(threadId);
        setPreviewContent(response.content);
        setPreviewTitle(response.title);
        setPreviewType('slide');
      }
    } catch (error) {
      console.error('プレビュー生成エラー:', error);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const {
    thread,
    loading,
    error,
    fetchThread,
    createMessage,
    generateAIResponse,
  } = useThread(threadId);

  useEffect(() => {
    fetchThread();
  }, [fetchThread]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;
    setIsSubmitting(true);

    // アウトプット指示をチェック
    const outputType = detectOutputRequest(newMessage);

    try {
      console.log('メッセージ送信開始:', newMessage);

      // ユーザーメッセージを送信
      await createMessage({
        content: newMessage,
        role: MessageRole.USER,
      });
      console.log('メッセージ送信完了');
      setNewMessage('');

      // AI応答がDBに保存されるまで少し待つ
      await new Promise((res) => setTimeout(res, 1500));
      await fetchThread();

      // 最初のメッセージの場合、タイトルを自動生成
      if (thread && thread.messages.length === 0) {
        try {
          const { title } = await threadsApi.generateTitle(newMessage);
          // タイトルを更新
          await threadsApi.update(threadId, { title });
          console.log('生成されたタイトル:', title);
          // タイトル更新後にスレッド情報を再取得
          await fetchThread();
        } catch (err) {
          console.error('タイトル生成エラー:', err);
        }
      }

      // アウトプット指示があった場合、プレビューを生成
      if (outputType) {
        await generatePreview(outputType);
      }

      // 送信成功の表示
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('メッセージ送信エラー:', err);
    } finally {
      setIsSubmitting(false);
      // チャット送信後にプレビューを即時更新
      await fetchPreview(threadId, 'article');
    }
  };

  if (loading && !thread) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500">エラー: {error}</div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">スレッドが見つかりません</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* チャットエリア */}
      <div className="h-full flex flex-col min-w-0">
        {/* 成功通知 */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            メッセージを送信しました！
          </div>
        )}

        {/* メッセージ履歴 */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto min-w-0">
          {thread.messages.map((message) => (
            <MessageComponent
              key={message.id}
              message={{
                id: message.id,
                role: message.role,
                type: 'text',
                content: message.content,
              }}
            />
          ))}

          {isSubmitting && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 max-w-[80%] rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span>メッセージを送信中...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 入力フォーム */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2"
            noValidate
          >
            <textarea
              value={newMessage}
              onChange={handleMessageChange}
              onKeyDown={(e) => {
                // Command+Enter（Mac）またはCtrl+Enter（Windows）でのみ送信
                if (
                  e.key === 'Enter' &&
                  (e.metaKey || e.ctrlKey) &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="メッセージを入力... (「記事にして」「スライドにして」でプレビュー生成)"
              disabled={isSubmitting}
              rows={1}
              className="flex-1 px-4 py-2 rounded border border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              disabled:opacity-50 disabled:cursor-not-allowed
              resize-none"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!newMessage.trim() || isSubmitting}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '送信中...' : '送信'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
