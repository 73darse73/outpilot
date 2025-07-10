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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
          エラーが発生しました
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          予期しないエラーが発生しました。
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          再試行
        </button>
      </div>
    </div>
  );
}
