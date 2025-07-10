# Outpilot Frontend

Next.js 15 + TypeScript + Tailwind CSS で構築された管理画面のフロントエンドです。

## 🏗️ アーキテクチャ

```
app/
├── (routes)/                  # ルートグループ
│   ├── articles/             # 記事管理
│   ├── projects/             # プロジェクト管理
│   ├── settings/             # 設定画面
│   ├── skills/               # スキル管理
│   ├── slides/               # スライド管理
│   │   ├── [slug]/          # スライド詳細・プレビュー
│   │   └── page.tsx         # スライド一覧
│   └── threads/              # チャットスレッド
│       ├── [id]/            # スレッド詳細
│       │   ├── components/  # スレッド関連コンポーネント
│       │   └── page.tsx     # スレッドページ
│       ├── new/             # 新規スレッド作成
│       └── page.tsx         # スレッド一覧
├── components/               # 共通コンポーネント
│   ├── Footer.tsx
│   └── Header.tsx
├── globals.css              # グローバルスタイル
├── layout.tsx               # ルートレイアウト
└── page.tsx                 # ホームページ

hooks/                       # カスタムフック
├── useThreads.ts           # スレッド管理フック

lib/                        # ユーティリティ
├── api/                    # APIクライアント
│   ├── client.ts          # APIクライアント設定
│   └── types.ts           # API型定義
```

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env.local
```

必要な環境変数：

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Outpilot
```

### 3. 開発サーバー起動

```bash
npm run dev
```

## 🎨 UI/UX 機能

### チャットインターフェース

- **リアルタイムチャット**: メッセージの送受信
- **コードブロック表示**: シンタックスハイライト付き
- **メッセージタイプ**: ユーザー/アシスタントの区別
- **タイピングインジケーター**: AI 応答中の表示

### スライドプレビュー

- **Marp.js 統合**: Markdown からスライド生成
- **リアルタイムプレビュー**: 編集内容の即座反映
- **スライドナビゲーション**: 前後のスライド切り替え
- **フルスクリーンモード**: プレゼンテーション表示

### 記事管理

- **Markdown エディタ**: リッチテキスト編集
- **プレビュー機能**: 記事の確認表示
- **Qiita 投稿ボタン**: 直接投稿機能
- **カテゴリ管理**: タグ・カテゴリの設定

## 🔧 主要コンポーネント

### Message.tsx

チャットメッセージの表示コンポーネント

```typescript
interface MessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}
```

### CodeBlock.tsx

コードブロックの表示コンポーネント

```typescript
interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}
```

### SlidePreview.tsx

スライドプレビューコンポーネント

```typescript
interface SlidePreviewProps {
  content: string;
  theme?: 'default' | 'dark';
  showNavigation?: boolean;
}
```

## 🎯 ページ構成

### ホームページ (`/`)

- プロジェクト概要
- クイックアクセス
- 統計情報

### スレッド一覧 (`/threads`)

- チャットスレッドの一覧表示
- 新規スレッド作成
- スレッド検索・フィルタリング

### スレッド詳細 (`/threads/[id]`)

- チャットインターフェース
- メッセージ送受信
- 記事・スライド生成ボタン

### スライド管理 (`/slides`)

- スライド一覧表示
- スライド作成・編集
- プレビュー機能

### 記事管理 (`/articles`)

- 記事一覧表示
- 記事作成・編集
- Qiita 投稿機能

## 🔌 API 統合

### API クライアント

```typescript
// lib/api/client.ts
const apiClient = {
  threads: {
    getAll: () => fetch('/api/threads'),
    getById: (id: string) => fetch(`/api/threads/${id}`),
    create: (data: CreateThreadDto) =>
      fetch('/api/threads', { method: 'POST', body: JSON.stringify(data) }),
    // ...
  },
  // ...
};
```

### カスタムフック

```typescript
// hooks/useThreads.ts
export const useThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const response = await apiClient.threads.getAll();
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error('Failed to fetch threads:', error);
    } finally {
      setLoading(false);
    }
  };

  return { threads, loading, fetchThreads };
};
```

## 🎨 スタイリング

### Tailwind CSS

- **カスタムカラーパレット**: ブランドカラーの定義
- **レスポンシブデザイン**: モバイルファースト
- **ダークモード**: システム設定に応じた自動切り替え
- **アニメーション**: スムーズなトランジション

### カスタムスタイル

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }

  .chat-message {
    @apply p-4 rounded-lg mb-4 max-w-3xl;
  }

  .chat-message.user {
    @apply bg-blue-100 ml-auto;
  }

  .chat-message.assistant {
    @apply bg-gray-100;
  }
}
```

## 🧪 テスト

### ユニットテスト

```bash
npm run test
```

### E2E テスト

```bash
npm run test:e2e
```

### テストカバレッジ

```bash
npm run test:cov
```

## 🚀 ビルド・デプロイ

### 開発ビルド

```bash
npm run build
npm run start
```

### 本番デプロイ

```bash
# Vercel
vercel --prod

# Docker
docker build -t outpilot-frontend .
docker run -p 3000:3000 outpilot-frontend
```

## 📱 レスポンシブ対応

### ブレークポイント

- **sm**: 640px 以上
- **md**: 768px 以上
- **lg**: 1024px 以上
- **xl**: 1280px 以上
- **2xl**: 1536px 以上

### モバイル最適化

- タッチフレンドリーな UI
- スワイプジェスチャー
- モバイル専用ナビゲーション

## 🔧 開発ツール

### ESLint 設定

```javascript
// eslint.config.mjs
module.exports = {
  extends: ['next/core-web-vitals', '@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-const': 'error',
  },
};
```

### Prettier 設定

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🐛 デバッグ

### 開発者ツール

- React Developer Tools
- Next.js DevTools
- Tailwind CSS IntelliSense

### ログ出力

```typescript
// 開発環境でのみログ出力
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

**Outpilot Frontend** - AI 学習支援ツールの管理画面
