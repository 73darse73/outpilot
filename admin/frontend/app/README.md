# Frontend App Directory

Next.js 15 App Router を使用したフロントエンドアプリケーションのメインディレクトリです。

## 📁 ディレクトリ構成

### ルートファイル

- `layout.tsx` - ルートレイアウト（全ページ共通）
- `page.tsx` - ホームページ
- `globals.css` - グローバルスタイル
- `favicon.ico` - ファビコン

### ルートグループ `(routes)/`

App Router のルートグループを使用して、URL パスに影響しないディレクトリ構造を実現

#### `articles/` - 記事管理

- `page.tsx` - 記事一覧・管理画面

#### `projects/` - プロジェクト管理

- `page.tsx` - プロジェクト一覧・管理画面

#### `settings/` - 設定画面

- 設定関連のページ（未実装）

#### `skills/` - スキル管理

- `page.tsx` - スキル一覧・管理画面

#### `slides/` - スライド管理

- `page.tsx` - スライド一覧
- `[slug]/` - 動的ルート（スライド詳細）
  - `page.tsx` - スライド詳細・プレビュー
  - `loading.tsx` - ローディング状態
  - `error.tsx` - エラー状態

#### `threads/` - チャットスレッド

- `layout.tsx` - スレッド関連ページのレイアウト
- `page.tsx` - スレッド一覧
- `types.ts` - スレッド関連の型定義
- `new/` - 新規スレッド作成
  - `page.tsx` - 新規スレッド作成画面
- `[id]/` - 動的ルート（スレッド詳細）
  - `page.tsx` - スレッド詳細・チャット画面
  - `loading.tsx` - ローディング状態
  - `error.tsx` - エラー状態
  - `components/` - スレッド関連コンポーネント
    - `Message.tsx` - チャットメッセージ表示
    - `CodeBlock.tsx` - コードブロック表示

### 共通コンポーネント `components/`

- `Header.tsx` - ヘッダーコンポーネント
- `Footer.tsx` - フッターコンポーネント

## 🎨 レイアウトシステム

### ルートレイアウト (`layout.tsx`)

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### スレッドレイアウト (`threads/layout.tsx`)

スレッド関連ページ専用のレイアウト

## 🔄 データフェッチング

### Server Components

```typescript
// サーバーサイドでのデータ取得
async function ThreadsPage() {
  const threads = await fetchThreads();
  return <ThreadsList threads={threads} />;
}
```

### Client Components

```typescript
'use client';

// クライアントサイドでの状態管理
function ChatInterface() {
  const [messages, setMessages] = useState([]);
  // ...
}
```

## 🎯 ページ構成

### ホームページ (`/`)

- プロジェクト概要
- クイックアクセスリンク
- 統計情報表示

### スレッド一覧 (`/threads`)

- チャットスレッドの一覧表示
- 新規スレッド作成ボタン
- スレッド検索・フィルタリング

### スレッド詳細 (`/threads/[id]`)

- チャットインターフェース
- メッセージ送受信機能
- 記事・スライド生成ボタン

### スライド管理 (`/slides`)

- スライド一覧表示
- スライド作成・編集機能
- プレビュー機能

## 🔧 コンポーネント設計

### Message.tsx

チャットメッセージの表示コンポーネント

```typescript
interface MessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}
```

### CodeBlock.tsx

コードブロックの表示コンポーネント

```typescript
interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
}
```

## 🎨 スタイリング

### Tailwind CSS

- ユーティリティファーストのアプローチ
- レスポンシブデザイン
- ダークモード対応

### カスタムスタイル

```css
/* globals.css */
@layer components {
  .chat-container {
    @apply max-w-4xl mx-auto p-4;
  }

  .message-bubble {
    @apply p-4 rounded-lg mb-4 max-w-3xl;
  }
}
```

## 🔄 状態管理

### React Hooks

- `useState` - ローカル状態
- `useEffect` - 副作用処理
- `useCallback` - メモ化された関数
- `useMemo` - メモ化された値

### カスタムフック

- `useThreads` - スレッド管理
- `useMessages` - メッセージ管理
- `useSlides` - スライド管理

## 🚀 パフォーマンス最適化

### 画像最適化

```typescript
import Image from 'next/image';

<Image src="/avatar.png" alt="User Avatar" width={40} height={40} priority />;
```

### 動的インポート

```typescript
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

## 🔍 エラーハンドリング

### Error Boundaries

```typescript
// error.tsx
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <button onClick={reset}>再試行</button>
    </div>
  );
}
```

### Loading States

```typescript
// loading.tsx
export default function Loading() {
  return <LoadingSpinner />;
}
```

## 📱 レスポンシブ対応

### ブレークポイント

- モバイルファースト設計
- Tailwind CSS のブレークポイント活用
- タッチフレンドリーな UI

### モバイル最適化

- スワイプジェスチャー
- モバイル専用ナビゲーション
- タッチターゲットの最適化

## 🔧 開発ツール

### Next.js DevTools

- 開発サーバー
- ホットリロード
- エラー表示

### TypeScript

- 型安全性
- IntelliSense
- リファクタリング支援

---

**Frontend App** - Next.js App Router ベースの UI
