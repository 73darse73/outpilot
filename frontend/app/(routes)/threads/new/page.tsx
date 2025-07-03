'use client';

export default function NewThreadPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
        新しいチャットを始めましょう！
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form className="flex gap-2">
          <input
            type="text"
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
