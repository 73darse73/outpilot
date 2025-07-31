import { Article, Slide } from './client';

// モック記事データ
export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'TypeScriptで型安全なAPI設計',
    content: 'TypeScriptを使ったAPI設計のベストプラクティスについて...',
    status: 'published',
    qiitaUrl: 'https://qiita.com/yourusername/items/example1',
    threadId: 1,
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Next.jsでポートフォリオを作る',
    content: 'Next.jsとTailwind CSSを使ったポートフォリオサイトの構築...',
    status: 'published',
    qiitaUrl: 'https://qiita.com/yourusername/items/example2',
    threadId: 2,
    createdAt: '2024-12-10T14:30:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
  },
  {
    id: 3,
    title: 'Prismaでデータベース設計',
    content: 'Prismaを使った効率的なデータベース設計とマイグレーション...',
    status: 'published',
    qiitaUrl: 'https://qiita.com/yourusername/items/example3',
    threadId: 3,
    createdAt: '2024-12-05T09:15:00Z',
    updatedAt: '2024-12-05T09:15:00Z',
  },
];

// モックスライドデータ
export const mockSlides: Slide[] = [
  {
    id: 1,
    title: 'AIを活用した学習支援ツールの開発',
    content:
      '# AIを活用した学習支援ツール\n\n## 概要\n- ChatGPTでの学びを自動で記事・スライドに変換\n- Qiita投稿まで一気通貫で管理\n\n## 技術スタック\n- Next.js\n- TypeScript\n- OpenAI API\n- Prisma',
    threadId: 1,
    createdAt: '2024-12-20T16:00:00Z',
    updatedAt: '2024-12-20T16:00:00Z',
  },
  {
    id: 2,
    title: 'モダンなポートフォリオサイトの構築',
    content:
      '# モダンなポートフォリオサイト\n\n## 特徴\n- アニメーション重視のデザイン\n- レスポンシブ対応\n- ダークモード対応\n\n## 使用技術\n- Next.js 15\n- Tailwind CSS\n- Framer Motion\n- Three.js',
    threadId: 2,
    createdAt: '2024-12-18T11:30:00Z',
    updatedAt: '2024-12-18T11:30:00Z',
  },
  {
    id: 3,
    title: 'TypeScriptの型システム活用術',
    content:
      '# TypeScriptの型システム活用術\n\n## 型の重要性\n- 開発効率の向上\n- バグの早期発見\n- コードの可読性向上\n\n## 実践的な活用方法\n- ジェネリクス\n- ユニオン型\n- 条件付き型',
    threadId: 3,
    createdAt: '2024-12-12T13:45:00Z',
    updatedAt: '2024-12-12T13:45:00Z',
  },
];

// モックプロジェクトデータ
export const mockProjects = [
  {
    id: 'outpilot',
    title: 'Outpilot',
    description:
      'AIを活用した学習支援ツール。ChatGPTでの学びを自動で記事やスライドに変換し、Qiita投稿やポートフォリオ表示まで一気通貫で管理できます。',
    image: '/api/placeholder/400/250',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Prisma'],
    link: '/projects',
    github: 'https://github.com/yourusername/outpilot',
    category: 'AI・学習支援',
    status: '開発中',
    period: '3ヶ月',
  },
  {
    id: 'portfolio',
    title: 'ポートフォリオサイト',
    description:
      'モダンなデザインとアニメーションを採用した個人ポートフォリオサイト。技術力とアウトプット力をアピール。',
    image: '/api/placeholder/400/250',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: '/',
    github: 'https://github.com/yourusername/portfolio',
    category: 'Webアプリケーション',
    status: '完成',
    period: '2ヶ月',
  },
];
