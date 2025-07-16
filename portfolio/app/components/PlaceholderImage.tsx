'use client';

import { motion } from 'motion/react';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
  animated?: boolean;
}

export default function PlaceholderImage({
  width = 400,
  height = 250,
  text = 'Image',
  className = '',
  animated = true,
}: PlaceholderImageProps) {
  const colors = [
    'from-blue-400 to-purple-600',
    'from-green-400 to-blue-600',
    'from-purple-400 to-pink-600',
    'from-yellow-400 to-orange-600',
    'from-red-400 to-pink-600',
    'from-indigo-400 to-purple-600',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const content = (
    <div
      className={`relative bg-gradient-to-br ${randomColor} rounded-lg overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      {/* メインコンテンツ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-2">🖼️</div>
          <div className="text-sm font-medium opacity-90">{text}</div>
        </div>
      </div>

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="cursor-pointer"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// スケルトンローディング用のコンポーネント
export function SkeletonImage({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
    >
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
    </div>
  );
}

// プロジェクト用のプレースホルダー
export function ProjectPlaceholder({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden ${className}`}
    >
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:30px_30px]" />
      </div>

      {/* プロジェクトアイコン */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">💻</div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm opacity-80 mt-2">Project Preview</div>
        </div>
      </div>

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* 装飾的な要素 */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full" />
    </div>
  );
}
