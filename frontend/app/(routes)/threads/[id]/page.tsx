'use client';

import { useState } from 'react';
import { Message as MessageComponent } from '../components/Message';
import { type Message } from '../types';

export default function ThreadPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: メッセージ送信処理
    console.log('送信:', newMessage);
    setNewMessage('');
  };

  // 仮のメッセージデータ
  const messages: Message[] = [
    {
      id: 1,
      role: 'user',
      type: 'text',
      content: 'こんにちは！スライドを作りたいです。',
    },
    {
      id: 2,
      role: 'assistant',
      type: 'text',
      content:
        'はい、お手伝いさせていただきます。\nどんなスライドを作りたいですか？',
    },
    {
      id: 3,
      role: 'user',
      type: 'text',
      content: '会社の新製品のプレゼン資料です。',
    },
    {
      id: 4,
      role: 'assistant',
      type: 'code',
      language: 'typescript',
      content:
        'interface Product {\n  name: string;\n  features: string[];\n  price: number;\n}',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* メッセージ履歴 */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>

      {/* 入力フォーム */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-2 rounded border border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
