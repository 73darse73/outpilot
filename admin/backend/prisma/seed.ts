import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 シードデータを追加中...');

  // テスト記事を追加
  const article1 = await prisma.article.create({
    data: {
      title: 'React 18の新機能を徹底解説',
      content: `# React 18の新機能を徹底解説

React 18で追加された新機能について、実際のコード例とともに詳しく解説します。

## Concurrent Features

React 18の最大の新機能はConcurrent Featuresです。これにより、ユーザーエクスペリエンスが大幅に向上します。

### Automatic Batching

React 18では、すべての更新が自動的にバッチ処理されます。

\`\`\`javascript
// React 18以前
setTimeout(() => {
  setCount(c => c + 1); // 再レンダリング
  setFlag(f => !f);     // 再レンダリング
}, 1000);

// React 18以降
setTimeout(() => {
  setCount(c => c + 1); // バッチ処理
  setFlag(f => !f);     // バッチ処理
}, 1000);
\`\`\`

### Suspense on the Server

サーバーサイドレンダリングでもSuspenseが使用できるようになりました。

\`\`\`javascript
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  );
}
\`\`\`

## まとめ

React 18は、パフォーマンスとユーザーエクスペリエンスの両方を向上させる重要なアップデートです。`,
      status: 'published',
      qiitaUrl: 'https://qiita.com/example/items/react18-features',
    },
  });

  const article2 = await prisma.article.create({
    data: {
      title: 'TypeScriptで型安全なAPIクライアントを作る',
      content: `# TypeScriptで型安全なAPIクライアントを作る

TypeScriptを使って型安全なAPIクライアントを構築する方法を紹介します。

## Genericsを活用した型安全なAPIクライアント

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

class ApiClient {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    return response.json();
  }

  async post<T, U>(url: string, data: T): Promise<ApiResponse<U>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
\`\`\`

## Utility Typesの活用

TypeScriptのUtility Typesを使って、より柔軟な型定義を作成できます。

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// 作成時に必要なフィールドのみ
type CreateUser = Pick<User, 'name' | 'email'>;

// 更新時にオプショナルなフィールド
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;
\`\`\`

## まとめ

型安全なAPIクライアントを作成することで、開発時のエラーを減らし、保守性を向上させることができます。`,
      status: 'published',
      qiitaUrl: 'https://qiita.com/example/items/typescript-api-client',
    },
  });

  // テストスライドを追加
  const slide1 = await prisma.slide.create({
    data: {
      title: 'Next.js 15の新機能紹介',
      content: `---
marp: true
theme: default
---

# Next.js 15の新機能紹介

## 2024年最新のアップデート

---

# 目次

- App Routerの改善
- パフォーマンスの向上
- 開発者体験の向上
- 新しい機能

---

# App Routerの改善

- **Partial Prerendering**: 静的と動的の最適な組み合わせ
- **Server Actions**: より簡単なサーバーサイド処理
- **Metadata API**: SEOの改善

---

# パフォーマンスの向上

- **Turbopack**: より高速なビルド
- **React Compiler**: 自動最適化
- **Bundle Analyzer**: バンドルサイズの分析

---

# 開発者体験の向上

- **TypeScript**: より良い型推論
- **ESLint**: 組み込みのルール
- **Debugging**: より良いデバッグ体験

---

# まとめ

Next.js 15は、パフォーマンスと開発者体験の両方を向上させる重要なアップデートです。

今すぐアップグレードして、新しい機能を試してみましょう！`,
    },
  });

  const slide2 = await prisma.slide.create({
    data: {
      title: 'モダンなCSS設計手法',
      content: `---
marp: true
theme: default
---

# モダンなCSS設計手法

## CSS Modules、Styled Components、Tailwind CSSの比較

---

# 目次

- CSS Modules
- Styled Components
- Tailwind CSS
- 比較と選択基準

---

# CSS Modules

## 特徴
- スコープ付きCSS
- クラス名の衝突を回避
- 既存のCSS知識を活用

## 例
\`\`\`css
.button {
  background: blue;
  color: white;
}
\`\`\`

---

# Styled Components

## 特徴
- CSS-in-JS
- 動的なスタイリング
- コンポーネントベース

## 例
\`\`\`javascript
const Button = styled.button\`
  background: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
\`;
\`\`\`

---

# Tailwind CSS

## 特徴
- ユーティリティファースト
- 高速な開発
- 一貫したデザインシステム

## 例
\`\`\`html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
\`\`\`

---

# 比較と選択基準

| 手法 | 学習コスト | 開発速度 | 保守性 |
|------|------------|----------|--------|
| CSS Modules | 低 | 中 | 高 |
| Styled Components | 中 | 高 | 中 |
| Tailwind CSS | 中 | 高 | 高 |

---

# まとめ

プロジェクトの要件に応じて、適切なCSS設計手法を選択することが重要です。

- **小規模プロジェクト**: CSS Modules
- **中規模プロジェクト**: Styled Components
- **大規模プロジェクト**: Tailwind CSS`,
    },
  });

  console.log('✅ シードデータの追加が完了しました！');
  console.log(`📝 記事: ${article1.title}, ${article2.title}`);
  console.log(`📊 スライド: ${slide1.title}, ${slide2.title}`);
}

main()
  .catch((e) => {
    console.error('❌ シードデータの追加に失敗しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
