'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { threadsApi } from '@/lib/api/client';
import { MessageRole } from '@/lib/api/types';

export default function NewThreadPage() {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 新規スレッドを作成
      const newThread = await threadsApi.create({ title: '新規チャット' });

      // メッセージを送信
      await threadsApi.createMessage(newThread.id, {
        content: newMessage,
        role: MessageRole.USER,
      });

      // AI応答を生成
      await threadsApi.generateAIResponse(newThread.id);

      // スレッドページに移動
      router.push(`/threads/${newThread.id}`);
    } catch (err) {
      console.error('エラー:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
        新しいチャットを始めましょう！
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="メッセージを入力..."
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 rounded border border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSubmitting}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? '送信中...' : '送信'}
          </button>
        </form>
      </div>
    </div>
  );
}
