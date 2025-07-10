'use client';

import { useState } from 'react';

export default function TestPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          クリックテスト
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          カウント: {count}
        </p>

        <div className="space-y-4">
          <button
            onClick={() => {
              console.log('ボタンクリック！');
              setCount(count + 1);
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            カウントアップ
          </button>

          <button
            onClick={() => {
              console.log('リセットボタンクリック！');
              setCount(0);
            }}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            リセット
          </button>

          <button
            onClick={() => {
              console.log('アラートボタンクリック！');
              alert('クリックイベントが動作しています！');
            }}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            アラート表示
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            このページでボタンが動作しない場合は、JavaScriptに問題があります。
          </p>
        </div>
      </div>
    </div>
  );
}
