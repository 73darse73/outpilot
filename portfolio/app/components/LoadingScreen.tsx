'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const loadingTexts = [
    'Loading...',
    'Initializing...',
    'Compiling...',
    'Building...',
    'Ready!',
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentCharIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < loadingTexts.length) {
        const currentText = loadingTexts[currentIndex];

        if (currentCharIndex < currentText.length) {
          setCurrentText(currentText.slice(0, currentCharIndex + 1));
          currentCharIndex++;
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
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-green-400 font-mono"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl mb-4"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-gray-400"
            >
              Outpilot Portfolio
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
