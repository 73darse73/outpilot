'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingTexts = useMemo(
    () => [
      'Loading...',
      'Initializing...',
      'Compiling...',
      'Building...',
      'Ready!',
    ],
    [],
  );

  useEffect(() => {
    let currentIndex = 0;
    let currentCharIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < loadingTexts.length) {
        const currentText = loadingTexts[currentIndex];

        if (currentCharIndex < currentText.length) {
          setCurrentText(currentText.slice(0, currentCharIndex + 1));
          currentCharIndex++;
          // プログレスバーの更新
          setProgress(
            (currentIndex * 100) / loadingTexts.length +
              (currentCharIndex / currentText.length) *
                (100 / loadingTexts.length),
          );
        } else {
          // 次のテキストに移る前に少し待つ
          setTimeout(() => {
            currentIndex++;
            currentCharIndex = 0;
            if (currentIndex < loadingTexts.length) {
              setCurrentText('');
            }
          }, 500);
        }
      } else {
        // 全てのテキストが表示されたら、少し待ってからフェードアウト
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [loadingTexts]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
          <div className="text-center max-w-md mx-auto px-6">
            {/* ロゴ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Outpilot
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Web Engineer Portfolio
              </p>
            </motion.div>

            {/* ローディングテキスト */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl font-mono text-blue-600 dark:text-blue-400 mb-6"
            >
              <span className="text-green-500">$</span> {currentText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            </motion.div>

            {/* プログレスバー */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>

            {/* プログレスパーセンテージ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {Math.round(progress)}%
            </motion.div>

            {/* アニメーション要素 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex justify-center space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
