// 画像サイズのプリセット
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
} as const;

// レスポンシブ画像サイズの設定
export const responsiveSizes = {
  mobile: '(max-width: 640px)',
  tablet: '(max-width: 1024px)',
  desktop: '(min-width: 1025px)',
} as const;

// 画像フォーマットの優先順位
export const imageFormats = ['webp', 'avif', 'jpeg', 'png'] as const;

// 画像の品質設定
export const imageQuality = {
  low: 60,
  medium: 80,
  high: 95,
} as const;

// 画像の最適化設定を取得
export function getImageConfig(
  size: keyof typeof imageSizes = 'medium',
  quality: keyof typeof imageQuality = 'medium',
) {
  return {
    ...imageSizes[size],
    quality: imageQuality[quality],
    formats: imageFormats,
  };
}

// レスポンシブ画像サイズ文字列を生成
export function getResponsiveSizes(
  mobile: keyof typeof imageSizes = 'small',
  tablet: keyof typeof imageSizes = 'medium',
  desktop: keyof typeof imageSizes = 'large',
) {
  return `(max-width: 640px) ${imageSizes[mobile].width}px, (max-width: 1024px) ${imageSizes[tablet].width}px, ${imageSizes[desktop].width}px`;
}

// 画像の遅延読み込み設定
export function getLazyLoadingConfig(priority: boolean = false) {
  return {
    loading: priority ? 'eager' : ('lazy' as const),
    placeholder: 'blur' as const,
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  };
}

// 画像のalt属性を生成
export function generateAltText(title: string, context?: string): string {
  if (context) {
    return `${title} - ${context}`;
  }
  return title;
}

// 画像のファイルサイズを最適化するための設定
export function getOptimizationConfig(
  type: 'profile' | 'project' | 'hero' | 'gallery' = 'project',
) {
  const configs = {
    profile: {
      sizes: getResponsiveSizes('thumbnail', 'small', 'medium'),
      quality: 'high' as const,
      priority: true,
    },
    project: {
      sizes: getResponsiveSizes('small', 'medium', 'large'),
      quality: 'medium' as const,
      priority: false,
    },
    hero: {
      sizes: getResponsiveSizes('medium', 'large', 'hero'),
      quality: 'high' as const,
      priority: true,
    },
    gallery: {
      sizes: getResponsiveSizes('small', 'medium', 'large'),
      quality: 'medium' as const,
      priority: false,
    },
  };

  return configs[type];
}

// 画像のアスペクト比を計算
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

// 画像のアスペクト比クラスを取得
export function getAspectRatioClass(aspectRatio: number): string {
  if (aspectRatio >= 2) return 'aspect-[2/1]';
  if (aspectRatio >= 1.5) return 'aspect-[3/2]';
  if (aspectRatio >= 1.2) return 'aspect-[4/3]';
  if (aspectRatio >= 0.8) return 'aspect-square';
  if (aspectRatio >= 0.6) return 'aspect-[3/4]';
  return 'aspect-[2/3]';
}

// 画像のプレースホルダー色を生成
export function generatePlaceholderColor(text: string): string {
  const colors = [
    'from-blue-400 to-purple-600',
    'from-green-400 to-blue-600',
    'from-purple-400 to-pink-600',
    'from-yellow-400 to-orange-600',
    'from-red-400 to-pink-600',
    'from-indigo-400 to-purple-600',
  ];

  // テキストのハッシュ値を計算して色を決定
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}
