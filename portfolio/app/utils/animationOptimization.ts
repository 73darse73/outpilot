import { Variants } from 'motion/react';

// アニメーションのプリセット
export const animationPresets = {
  // フェードイン
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // スライドアップ
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  // スライドダウン
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  // スケール
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // 回転
  rotate: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
    transition: { duration: 0.7, ease: 'easeOut' },
  },

  // バウンス
  bounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    exit: { opacity: 0, scale: 0.3 },
  },

  // スライドイン（左）
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  // スライドイン（右）
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const;

// スタッガーアニメーション用のバリアント
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ホバーアニメーション
export const hoverAnimations = {
  lift: {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  glow: {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  rotate: {
    rotate: 5,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// ページ遷移アニメーション
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// カードアニメーション
export const cardAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// テキストアニメーション
export const textAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// 背景アニメーション
export const backgroundAnimation: Variants = {
  initial: {
    backgroundPosition: '0% 50%',
  },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 20,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// アニメーションの遅延を計算
export function calculateDelay(index: number, baseDelay: number = 0.1): number {
  return index * baseDelay;
}

// アニメーションの持続時間を最適化
export function getOptimizedDuration(baseDuration: number = 0.5): number {
  // ユーザーの設定に基づいて調整
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return prefersReducedMotion ? baseDuration * 0.5 : baseDuration;
}

// アニメーションのイージングを最適化
export const optimizedEasing = {
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeIn: [0.55, 0.055, 0.675, 0.19],
  easeInOut: [0.645, 0.045, 0.355, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
};

// パフォーマンス最適化されたアニメーション設定
export function getPerformanceOptimizedAnimation(
  type: keyof typeof animationPresets = 'fadeIn',
  customDelay?: number,
) {
  const preset = animationPresets[type];
  const duration = getOptimizedDuration(
    'transition' in preset && preset.transition
      ? preset.transition.duration
      : 0.5,
  );

  return {
    ...preset,
    transition: {
      ...('transition' in preset && preset.transition
        ? preset.transition
        : { duration: 0.5, ease: 'easeOut' }),
      duration,
      delay: customDelay || 0,
    },
  };
}

// アニメーションの優先度を設定
export function getAnimationPriority(
  isVisible: boolean,
  priority: 'high' | 'medium' | 'low' = 'medium',
) {
  if (!isVisible) return false;

  switch (priority) {
    case 'high':
      return true;
    case 'medium':
      return (
        typeof window !== 'undefined' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    case 'low':
      return false;
    default:
      return true;
  }
}
