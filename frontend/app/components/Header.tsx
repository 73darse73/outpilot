'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: '記事', href: '/articles' },
    { name: 'プロジェクト', href: '/projects' },
    { name: 'スキル', href: '/skills' },
    { name: 'スライド', href: '/slides' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-gray-900/80 dark:border-gray-700">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="text-xl font-bold">
          Outpilot
        </Link>

        {/* メインナビゲーション */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* 右側のアクション */}
        <div className="flex items-center gap-4">
          <Link
            href="/threads/new"
            className="hidden md:inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            チャットを始める
          </Link>

          {/* モバイルメニューボタン */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
