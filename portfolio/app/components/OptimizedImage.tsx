'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getOptimizationConfig,
  generateAltText,
  getLazyLoadingConfig,
  generatePlaceholderColor,
} from '../utils/imageOptimization';
import { SkeletonImage, ProjectPlaceholder } from './PlaceholderImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  type?: 'profile' | 'project' | 'hero' | 'gallery';
  className?: string;
  priority?: boolean;
  fallback?: boolean;
  placeholder?: 'blur' | 'empty' | 'generated';
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  type = 'project',
  className = '',
  priority = false,
  fallback = true,
  placeholder = 'blur',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const config = getOptimizationConfig(type);
  const lazyConfig = getLazyLoadingConfig(priority);

  const handleLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // エラー時のフォールバック
  if (hasError && fallback) {
    return (
      <div className={`relative ${className}`}>
        <ProjectPlaceholder title={alt} className="w-full h-full" />
      </div>
    );
  }

  // プレースホルダーの設定
  const placeholderConfig =
    placeholder === 'blur'
      ? {
          placeholder: 'blur' as const,
          blurDataURL: lazyConfig.blurDataURL,
        }
      : placeholder === 'generated'
      ? {
          placeholder: 'blur' as const,
          blurDataURL: `data:image/svg+xml;base64,${btoa(`
      <svg width="${width || 400}" height="${
            height || 300
          }" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${
              generatePlaceholderColor(alt).split('-')[1]
            };stop-opacity:1" />
            <stop offset="100%" style="stop-color:${
              generatePlaceholderColor(alt).split('-')[3]
            };stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">${alt}</text>
      </svg>
    `)}`,
        }
      : {};

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* ローディング状態 */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <SkeletonImage className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* メイン画像 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Image
          src={src}
          alt={generateAltText(alt)}
          width={
            width ||
            parseInt(config.sizes.split(',')[2].split(' ')[1].replace('px', ''))
          }
          height={height || (width ? width * 0.75 : 400)}
          sizes={config.sizes}
          quality={
            config.quality === 'high'
              ? 95
              : config.quality === 'medium'
              ? 80
              : 60
          }
          priority={priority || config.priority}
          loading={lazyConfig.loading as 'lazy' | 'eager'}
          className="w-full h-auto object-cover"
          onLoad={handleLoad}
          onError={handleError}
          {...placeholderConfig}
        />
      </motion.div>

      {/* エラー状態 */}
      <AnimatePresence>
        {hasError && !fallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          >
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm">画像を読み込めませんでした</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// アバター用の最適化された画像
export function OptimizedAvatar({
  src,
  alt,
  size = 40,
  className = '',
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={size}
        height={size}
        type="profile"
        className="w-full h-full object-cover"
        priority={true}
      />
    </div>
  );
}

// ヒーロー画像用の最適化された画像
export function OptimizedHeroImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      type="hero"
      className={`w-full h-64 md:h-96 lg:h-[500px] ${className}`}
      priority={true}
      placeholder="generated"
    />
  );
}
