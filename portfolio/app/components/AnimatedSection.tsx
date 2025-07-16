'use client';

import { memo } from 'react';
import OptimizedMotion, {
  StaggerContainer,
  StaggerItem,
  HoverMotion,
} from './OptimizedMotion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'scale'
    | 'slideInLeft'
    | 'slideInRight';
  stagger?: boolean;
  staggerDelay?: number;
}

export default memo(function AnimatedSection({
  children,
  title,
  subtitle,
  className = '',
  animation = 'fadeIn',
  stagger = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        {(title || subtitle) && (
          <OptimizedMotion
            animation="slideUp"
            delay={0.1}
            priority="high"
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </OptimizedMotion>
        )}

        {/* コンテンツ */}
        {stagger ? (
          <StaggerContainer staggerDelay={staggerDelay}>
            {children}
          </StaggerContainer>
        ) : (
          <OptimizedMotion animation={animation} delay={0.2}>
            {children}
          </OptimizedMotion>
        )}
      </div>
    </section>
  );
});

// アニメーション付きカード
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'rotate';
  index?: number;
}

export const AnimatedCard = memo(function AnimatedCard({
  children,
  className = '',
  hoverEffect = 'lift',
  index = 0,
}: AnimatedCardProps) {
  return (
    <StaggerItem>
      <HoverMotion hoverEffect={hoverEffect}>
        <OptimizedMotion
          animation="slideUp"
          delay={index * 0.1}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${className}`}
        >
          {children}
        </OptimizedMotion>
      </HoverMotion>
    </StaggerItem>
  );
});

// アニメーション付きテキスト
interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'scale'
    | 'slideInLeft'
    | 'slideInRight';
  delay?: number;
}

export const AnimatedText = memo(function AnimatedText({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
}: AnimatedTextProps) {
  return (
    <OptimizedMotion
      animation={animation}
      delay={delay}
      as="span"
      className={className}
    >
      {children}
    </OptimizedMotion>
  );
});

// アニメーション付きボタン
interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'scale'
    | 'slideInLeft'
    | 'slideInRight';
  delay?: number;
}

export const AnimatedButton = memo(function AnimatedButton({
  children,
  className = '',
  href,
  onClick,
  animation = 'scale',
  delay = 0,
}: AnimatedButtonProps) {
  const buttonContent = (
    <HoverMotion hoverEffect="lift">
      <OptimizedMotion
        animation={animation}
        delay={delay}
        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${className}`}
      >
        <button onClick={onClick} className="w-full h-full">
          {children}
        </button>
      </OptimizedMotion>
    </HoverMotion>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
});
