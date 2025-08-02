// スキル評価システム
// 各項目の重み付けとスコア計算ロジック

export interface SkillScore {
  skillName: string;
  totalScore: number;
  breakdown: {
    articles: number;
    projects: number;
    slides: number;
    learning: number;
    community: number;
  };
  rank: number;
  level: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  category: string; // カテゴリ情報を追加
}

export interface ArticleMetrics {
  publishedCount: number;
  totalViews: number;
  totalStars: number;
  totalStocks: number;
  averageViews: number;
  averageStars: number;
  monthlyConsistency: number;
  recentActivity: number;
  categoryBreakdown: Map<string, number>; // カテゴリ別記事数
}

export interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  openSourceContributions: number;
  codeLines: number;
  categoryBreakdown: Map<string, number>; // カテゴリ別プロジェクト数
}

export interface SlideMetrics {
  totalSlides: number;
  presentationCount: number;
  categoryBreakdown: Map<string, number>; // カテゴリ別スライド数
}

export interface LearningMetrics {
  learningStreak: number;
  categoryBreakdown: Map<string, number>; // カテゴリ別学習活動
}

export interface CommunityMetrics {
  followers: number;
  connections: number;
  codeReviews: number;
}

// 重み付け設定（シンプル化）
const WEIGHTS = {
  articles: {
    publishedCount: 10,
    totalViews: 0.01,
    totalStars: 5,
    totalStocks: 3,
    averageViews: 0.1,
    averageStars: 2,
    monthlyConsistency: 5,
    recentActivity: 3,
  },
  projects: {
    totalProjects: 15,
    activeProjects: 20,
    openSourceContributions: 15,
    codeLines: 0.001, // 1000行で1点
  },
  slides: {
    totalSlides: 8,
    presentationCount: 12,
  },
  learning: {
    learningStreak: 0.5,
  },
  community: {
    followers: 0.1,
    connections: 0.2,
    codeReviews: 5,
  },
};

// カテゴリマッピング
export const CATEGORY_MAP = {
  // フロントエンド
  react: 'フロントエンド',
  vue: 'フロントエンド',
  angular: 'フロントエンド',
  typescript: 'フロントエンド',
  javascript: 'フロントエンド',
  nextjs: 'フロントエンド',
  tailwindcss: 'フロントエンド',
  html: 'フロントエンド',
  css: 'フロントエンド',

  // バックエンド
  nodejs: 'バックエンド',
  python: 'バックエンド',
  java: 'バックエンド',
  go: 'バックエンド',
  nestjs: 'バックエンド',
  prisma: 'バックエンド',
  express: 'バックエンド',
  fastapi: 'バックエンド',

  // インフラ
  aws: 'インフラ',
  docker: 'インフラ',
  kubernetes: 'インフラ',
  postgresql: 'インフラ',
  mysql: 'インフラ',
  redis: 'インフラ',
  nginx: 'インフラ',

  // ツール
  git: 'ツール',
  github: 'ツール',
  figma: 'ツール',
  vercel: 'ツール',
  netlify: 'ツール',
  circleci: 'ツール',
  'github-actions': 'ツール',

  // AI・機械学習
  openai: 'AI・機械学習',
  tensorflow: 'AI・機械学習',
  pytorch: 'AI・機械学習',
  'scikit-learn': 'AI・機械学習',
  pandas: 'AI・機械学習',
  numpy: 'AI・機械学習',

  // モバイル
  'react-native': 'モバイル',
  flutter: 'モバイル',
  swift: 'モバイル',
  kotlin: 'モバイル',

  // ゲーム開発
  unity: 'ゲーム開発',
  'unreal-engine': 'ゲーム開発',
  threejs: 'ゲーム開発',
};

// タグからカテゴリへのマッピング
export function mapTagToCategory(tag: string): string {
  return (
    (CATEGORY_MAP as Record<string, string>)[tag.toLowerCase()] || 'その他'
  );
}

// 記事スコア計算
export function calculateArticleScore(metrics: ArticleMetrics): number {
  return (
    metrics.publishedCount * WEIGHTS.articles.publishedCount +
    metrics.totalViews * WEIGHTS.articles.totalViews +
    metrics.totalStars * WEIGHTS.articles.totalStars +
    metrics.totalStocks * WEIGHTS.articles.totalStocks +
    metrics.averageViews * WEIGHTS.articles.averageViews +
    metrics.averageStars * WEIGHTS.articles.averageStars +
    metrics.monthlyConsistency * WEIGHTS.articles.monthlyConsistency +
    metrics.recentActivity * WEIGHTS.articles.recentActivity
  );
}

// プロジェクトスコア計算
export function calculateProjectScore(metrics: ProjectMetrics): number {
  return (
    metrics.totalProjects * WEIGHTS.projects.totalProjects +
    metrics.activeProjects * WEIGHTS.projects.activeProjects +
    metrics.openSourceContributions * WEIGHTS.projects.openSourceContributions +
    metrics.codeLines * WEIGHTS.projects.codeLines
  );
}

// スライドスコア計算
export function calculateSlideScore(metrics: SlideMetrics): number {
  return (
    metrics.totalSlides * WEIGHTS.slides.totalSlides +
    metrics.presentationCount * WEIGHTS.slides.presentationCount
  );
}

// 学習スコア計算
export function calculateLearningScore(metrics: LearningMetrics): number {
  return metrics.learningStreak * WEIGHTS.learning.learningStreak;
}

// コミュニティスコア計算
export function calculateCommunityScore(metrics: CommunityMetrics): number {
  return (
    metrics.followers * WEIGHTS.community.followers +
    metrics.connections * WEIGHTS.community.connections +
    metrics.codeReviews * WEIGHTS.community.codeReviews
  );
}

// 総合スコア計算
export function calculateTotalScore(
  articleScore: number,
  projectScore: number,
  slideScore: number,
  learningScore: number,
  communityScore: number,
): number {
  return (
    articleScore + projectScore + slideScore + learningScore + communityScore
  );
}

// スキルレベル計算（0-100）
export function calculateSkillLevel(totalScore: number): number {
  const maxScore = 1000; // 最大スコア（調整可能）
  return Math.min(100, Math.round((totalScore / maxScore) * 100));
}

// トレンド計算
export function calculateTrend(
  currentScore: number,
  previousScore: number,
): 'up' | 'down' | 'stable' {
  const threshold = 0.1; // 10%の変化を閾値とする
  const change = (currentScore - previousScore) / previousScore;

  if (change > threshold) return 'up';
  if (change < -threshold) return 'down';
  return 'stable';
}

// カテゴリ別スキル研鑽の計算
export function calculateCategoryBreakdown(
  articles: any[],
  projects: any[],
  slides: any[],
): Map<string, number> {
  const categoryCount = new Map<string, number>();

  // 記事からカテゴリを抽出
  articles.forEach((article) => {
    article.tags?.forEach((tag: string) => {
      const category = mapTagToCategory(tag);
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });
  });

  // プロジェクトからカテゴリを抽出（package.jsonやREADMEから推測）
  projects.forEach((project) => {
    project.technologies?.forEach((tech: string) => {
      const category = mapTagToCategory(tech);
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });
  });

  // スライドからカテゴリを抽出（タイトルや内容から推測）
  slides.forEach((slide) => {
    const content = `${slide.title} ${slide.content}`;
    Object.keys(CATEGORY_MAP).forEach((keyword) => {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        const category = (CATEGORY_MAP as Record<string, string>)[keyword];
        categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
      }
    });
  });

  return categoryCount;
}

// スキルランキング生成
export function generateSkillRanking(
  skillData: {
    name: string;
    articleMetrics: ArticleMetrics;
    projectMetrics: ProjectMetrics;
    slideMetrics: SlideMetrics;
    learningMetrics: LearningMetrics;
    communityMetrics: CommunityMetrics;
  }[],
): SkillScore[] {
  return skillData
    .map((skill) => {
      const articleScore = calculateArticleScore(skill.articleMetrics);
      const projectScore = calculateProjectScore(skill.projectMetrics);
      const slideScore = calculateSlideScore(skill.slideMetrics);
      const learningScore = calculateLearningScore(skill.learningMetrics);
      const communityScore = calculateCommunityScore(skill.communityMetrics);

      const totalScore = calculateTotalScore(
        articleScore,
        projectScore,
        slideScore,
        learningScore,
        communityScore,
      );

      // カテゴリを決定（最も活動が多いカテゴリ）
      const categoryBreakdown = new Map<string, number>();
      skill.articleMetrics.categoryBreakdown.forEach((count, category) => {
        categoryBreakdown.set(
          category,
          (categoryBreakdown.get(category) || 0) + count,
        );
      });
      skill.projectMetrics.categoryBreakdown.forEach((count, category) => {
        categoryBreakdown.set(
          category,
          (categoryBreakdown.get(category) || 0) + count,
        );
      });

      const primaryCategory =
        Array.from(categoryBreakdown.entries()).sort(
          (a, b) => b[1] - a[1],
        )[0]?.[0] || 'その他';

      return {
        skillName: skill.name,
        totalScore,
        breakdown: {
          articles: articleScore,
          projects: projectScore,
          slides: slideScore,
          learning: learningScore,
          community: communityScore,
        },
        rank: 0, // 後で設定
        level: calculateSkillLevel(totalScore),
        trend: 'stable' as const,
        category: primaryCategory,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((skill, index) => ({
      ...skill,
      rank: index + 1,
    }));
}

// デフォルトメトリクス（テスト用）
export const defaultMetrics = {
  articleMetrics: {
    publishedCount: 5,
    totalViews: 1000,
    totalStars: 50,
    totalStocks: 30,
    averageViews: 200,
    averageStars: 10,
    monthlyConsistency: 2,
    recentActivity: 3,
    categoryBreakdown: new Map([
      ['フロントエンド', 3],
      ['バックエンド', 2],
    ]),
  },
  projectMetrics: {
    totalProjects: 3,
    activeProjects: 1,
    openSourceContributions: 2,
    codeLines: 5000,
    categoryBreakdown: new Map([
      ['フロントエンド', 2],
      ['バックエンド', 1],
    ]),
  },
  slideMetrics: {
    totalSlides: 4,
    presentationCount: 2,
    categoryBreakdown: new Map([
      ['フロントエンド', 2],
      ['ツール', 2],
    ]),
  },
  learningMetrics: {
    learningStreak: 30,
    categoryBreakdown: new Map([
      ['フロントエンド', 10],
      ['バックエンド', 5],
    ]),
  },
  communityMetrics: {
    followers: 100,
    connections: 50,
    codeReviews: 10,
  },
};
