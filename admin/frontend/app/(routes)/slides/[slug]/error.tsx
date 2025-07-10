'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
          エラーが発生しました
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          スライドの読み込み中に問題が発生しました。
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          再試行
        </button>
      </div>
    </div>
  );
}
