# Prisma Database

Prisma ORMを使用したデータベーススキーマとマイグレーション管理ディレクトリです。

## 📁 ディレクトリ構成

### スキーマファイル

- `schema.prisma` - データベーススキーマ定義

### マイグレーション

- `migrations/` - データベースマイグレーションファイル
  - `20250623103318_init/` - 初期マイグレーション
  - `20250630112725_add_article_slide_tag_models/` - 記事・スライド・タグモデル追加
  - `20250630115140_remove_article_and_tag_models/` - 記事・タグモデル削除
- `migration_lock.toml` - マイグレーションロックファイル

### 生成ファイル

- `generated/` - Prismaクライアント生成ファイル（自動生成）

## 🗄️ データベーススキーマ

### `schema.prisma`

```prisma
// データベース接続設定
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Prismaクライアント設定
generator client {
  provider = "prisma-client-js"
}

// モデル定義
model Thread {
  id        String   @id @default(cuid())
  title     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // リレーション
  messages  Message[]
  summaries Summary[]
  slides    Slide[]

  @@map("threads")
}

model Message {
  id        String   @id @default(cuid())
  threadId  String
  content   String
  role      String   // 'user' | 'assistant'
  createdAt DateTime @default(now())

  // リレーション
  thread    Thread   @relation(fields: [threadId], references: [id], onDelete: Cascade)

  @@map("messages")
}

model Summary {
  id        String   @id @default(cuid())
  threadId  String
  content   String
  type      String   // 'article' | 'slide'
  createdAt DateTime @default(now())

  // リレーション
  thread    Thread   @relation(fields: [threadId], references: [id], onDelete: Cascade)

  @@map("summaries")
}

model Slide {
  id        String   @id @default(cuid())
  threadId  String
  title     String
  content   String   // Markdown形式
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // リレーション
  thread    Thread   @relation(fields: [threadId], references: [id], onDelete: Cascade)

  @@map("slides")
}
```

## 🔄 マイグレーション管理

### 初期マイグレーション (`20250623103318_init`)

```sql
-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summaries" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "summaries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### 記事・スライド・タグモデル追加 (`20250630112725_add_article_slide_tag_models`)

```sql
-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slides" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slides" ADD CONSTRAINT "slides_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### 記事・タグモデル削除 (`20250630115140_remove_article_and_tag_models`)

```sql
-- DropTable
DROP TABLE "_ArticleToTag";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "articles";
```

## 🚀 セットアップ

### 1. 環境変数の設定

```bash
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/outpilot"
```

### 2. データベースの初期化

```bash
# マイグレーション実行
npx prisma migrate dev

# データベースにスキーマをプッシュ（開発環境のみ）
npx prisma db push
```

### 3. Prismaクライアントの生成

```bash
npx prisma generate
```

## 🔧 開発コマンド

### マイグレーション

```bash
# 新しいマイグレーションを作成
npx prisma migrate dev --name add_new_field

# 本番環境でのマイグレーション実行
npx prisma migrate deploy

# マイグレーションのリセット（開発環境のみ）
npx prisma migrate reset
```

### データベース操作

```bash
# データベースにスキーマをプッシュ
npx prisma db push

# データベースの状態を確認
npx prisma db pull

# データベースのリセット
npx prisma db reset
```

### Prisma Studio

```bash
# データベースのGUIツールを起動
npx prisma studio
```

## 📊 データモデル設計

### エンティティ関係図

```
Thread (1) ←→ (N) Message
Thread (1) ←→ (N) Summary
Thread (1) ←→ (N) Slide
```

### カスケード削除

- スレッドを削除すると、関連するメッセージ、要約、スライドも削除
- データの整合性を保つための設計

### インデックス

```prisma
// パフォーマンス向上のためのインデックス
model Message {
  // ...

  @@index([threadId])
  @@index([createdAt])
}

model Summary {
  // ...

  @@index([threadId])
  @@index([type])
}

model Slide {
  // ...

  @@index([threadId])
  @@index([createdAt])
}
```

## 🔍 クエリ例

### 基本的なクエリ

```typescript
// スレッド一覧取得
const threads = await prisma.thread.findMany({
  include: {
    messages: true,
    summaries: true,
    slides: true,
  },
  orderBy: {
    updatedAt: 'desc',
  },
});

// 特定のスレッドとメッセージ取得
const thread = await prisma.thread.findUnique({
  where: { id: threadId },
  include: {
    messages: {
      orderBy: { createdAt: 'asc' },
    },
  },
});

// 要約作成
const summary = await prisma.summary.create({
  data: {
    threadId,
    content: '要約内容',
    type: 'article',
  },
});
```

### 高度なクエリ

```typescript
// 最新のメッセージを持つスレッド
const threadsWithLatestMessage = await prisma.thread.findMany({
  include: {
    messages: {
      orderBy: { createdAt: 'desc' },
      take: 1,
    },
  },
});

// 統計情報
const stats = await prisma.thread.aggregate({
  _count: {
    id: true,
  },
  _max: {
    updatedAt: true,
  },
});
```

## 🧪 テスト

### テストデータベース

```bash
# テスト用データベースの設定
DATABASE_URL="postgresql://username:password@localhost:5432/outpilot_test"

# テスト用マイグレーション
npx prisma migrate dev --name test_setup
```

### テストデータ作成

```typescript
// テスト用のファクトリー関数
export const createTestThread = async (data?: Partial<Thread>) => {
  return await prisma.thread.create({
    data: {
      title: 'Test Thread',
      ...data,
    },
  });
};

export const createTestMessage = async (
  threadId: string,
  data?: Partial<Message>,
) => {
  return await prisma.message.create({
    data: {
      threadId,
      content: 'Test message',
      role: 'user',
      ...data,
    },
  });
};
```

## 🔧 トラブルシューティング

### よくある問題

#### マイグレーション競合

```bash
# マイグレーションの状態を確認
npx prisma migrate status

# 競合を解決
npx prisma migrate resolve --applied migration_name
```

#### スキーマの同期

```bash
# データベースの状態を確認
npx prisma db pull

# スキーマをデータベースに反映
npx prisma db push
```

#### クライアントの再生成

```bash
# Prismaクライアントを再生成
npx prisma generate
```

## 📚 参考資料

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Studio](https://www.prisma.io/docs/concepts/tools/prisma-studio)

---

**Prisma Database** - データベーススキーマとマイグレーション管理
