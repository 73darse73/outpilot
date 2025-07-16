'use client';

import { memo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface OptimizedMotionProps {
  children: React.ReactNode;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'scale'
    | 'slideInLeft'
    | 'slideInRight';
  delay?: number;
  duration?: number;
  priority?: 'high' | 'medium' | 'low';
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const OptimizedMotion = memo(function OptimizedMotion({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration,
  priority = 'medium',
  className = '',
  style,
  as = 'div',
  onAnimationStart,
  onAnimationComplete,
}: OptimizedMotionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  // アニメーション設定
  const getAnimationConfig = () => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.1 },
      };
    }

    const configs = {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: duration || 0.5, delay },
      },
      slideUp: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
        transition: { duration: duration || 0.6, delay },
      },
      slideDown: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: duration || 0.6, delay },
      },
      scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: duration || 0.5, delay },
      },
      slideInLeft: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: duration || 0.6, delay },
      },
      slideInRight: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
        transition: { duration: duration || 0.6, delay },
      },
    };

    return configs[animation];
  };

  const config = getAnimationConfig();
  const shouldAnimate =
    priority === 'high' || (priority === 'medium' && isInView);

  if (as === 'div') {
    return (
      <motion.div
        ref={ref}
        initial={config.initial}
        animate={shouldAnimate ? config.animate : config.initial}
        exit={config.exit}
        transition={config.transition}
        className={className}
        style={style}
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </motion.div>
    );
  }

  if (as === 'span') {
    return (
      <motion.span
        ref={ref}
        initial={config.initial}
        animate={shouldAnimate ? config.animate : config.initial}
        exit={config.exit}
        transition={config.transition}
        className={className}
        style={style}
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </motion.span>
    );
  }

  // デフォルトはdiv
  return (
    <motion.div
      ref={ref}
      initial={config.initial}
      animate={shouldAnimate ? config.animate : config.initial}
      exit={config.exit}
      transition={config.transition}
      className={className}
      style={style}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
});

// スタッガーアニメーション用のコンテナ
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const StaggerContainer = memo(function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
  style,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// スタッガーアイテム用のコンポーネント
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const StaggerItem = memo(function StaggerItem({
  children,
  className = '',
  style,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
});

// ホバーアニメーション用のコンポーネント
interface HoverMotionProps {
  children: React.ReactNode;
  hoverEffect?: 'lift' | 'glow' | 'rotate';
  className?: string;
  style?: React.CSSProperties;
}

export const HoverMotion = memo(function HoverMotion({
  children,
  hoverEffect = 'lift',
  className = '',
  style,
}: HoverMotionProps) {
  const prefersReducedMotion = useReducedMotion();

  const hoverVariants = prefersReducedMotion
    ? {
        hover: { opacity: 0.8 },
      }
    : {
        hover:
          hoverEffect === 'lift'
            ? { scale: 1.05, y: -5 }
            : hoverEffect === 'glow'
            ? { boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }
            : { rotate: 5 },
      };

  return (
    <motion.div
      whileHover="hover"
      variants={hoverVariants}
      transition={{ duration: 0.2 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

export default OptimizedMotion;
