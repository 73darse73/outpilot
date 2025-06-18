# 🧠 Outpilot - NestJS バックエンド学習プロジェクト

## 🎯 プロジェクト概要

ChatGPTで調べた内容を、**特定のキーワードに反応して自動で要約**し、
ユーザーが「OK」と返すと**Notionに保存**できるアプリです。

**このプロジェクトはバックエンド学習が主目的です。**

将来的には、**ブログ化・スライド化などのアウトプット**にも活用できるよう拡張予定です。

---

## 🎓 学習目標

### バックエンド開発の基本概念
- [ ] HTTP通信の仕組み
- [ ] RESTful APIの設計
- [ ] データベース操作（Prisma）
- [ ] 認証・認可の実装
- [ ] 外部APIとの連携
- [ ] エラーハンドリング
- [ ] テストの書き方

### NestJSフレームワーク
- [ ] モジュール・コントローラー・サービス
- [ ] 依存性注入（DI）
- [ ] デコレータの使い方
- [ ] ミドルウェア・ガード・インターセプター
- [ ] バリデーション（class-validator）
- [ ] Swagger API文書

---

## 🔧 使用技術スタック

| 分類      | 技術                                                         |
| ------- | ---------------------------------------------------------- |
| フレームワーク | [NestJS](https://nestjs.com/)（TypeScriptファーストのバックエンドフレームワーク） |
| ORM     | [Prisma](https://www.prisma.io/)                           |
| データベース  | PostgreSQL（Docker ローカル開発）                                  |
| AI      | OpenAI API（`gpt-4-turbo` 使用）                               |
| 外部API   | Notion API（アウトプット保存）                                       |
| 認証     | JWT（JSON Web Token）                                           |
| バリデーション | class-validator + class-transformer                           |
| API文書  | Swagger/OpenAPI                                              |

---

## 🛠 機能一覧

### 🔸 Chat機能
* ChatGPTに対して質問を投げる
* レスポンスをログとしてDBに保存

### 🔸 要約トリガー機能
* チャットに`#まとめて`などの特定キーワードが含まれると、スレッド全体をGPTで要約
* 要約結果を表示（保存前）

### 🔸 承認 → 保存機能
* ユーザーが「OK」と返すと、要約結果をNotionに保存

### 🔸 Notion保存機能
* タイトル・本文・タグなどを含む構造で、自分のNotionデータベースにページ保存

---

## 🧱 データ構造（Prisma スキーマ）

```prisma
model Thread {
  id        String    @id @default(cuid())
  title     String?
  createdAt DateTime  @default(now())
  messages  Message[]
  summary   Summary?
}

model Message {
  id        String   @id @default(cuid())
  thread    Thread   @relation(fields: [threadId], references: [id])
  threadId  String
  role      String   // 'user' or 'assistant'
  content   String
  createdAt DateTime @default(now())
}

model Summary {
  id            String   @id @default(cuid())
  thread        Thread   @relation(fields: [threadId], references: [id])
  threadId      String   @unique
  content       String
  savedToNotion Boolean  @default(false)
  createdAt     DateTime @default(now())
}
```

---

## 🚀 セットアップ手順

### 1. 依存関係のインストール

```bash
yarn install
```

### 2. 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Notion API
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/outpilot"

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

### 3. データベースのセットアップ

```bash
# Prismaクライアントの生成
npx prisma generate

# データベースのマイグレーション
npx prisma db push
```

### 4. 開発サーバーの起動

```bash
# 開発モードで起動
yarn start:dev

# 本番ビルド
yarn build
yarn start:prod
```

---

## 📝 API エンドポイント

### スレッド関連
- `POST /api/threads` - 新しいスレッドを作成
- `GET /api/threads` - スレッド一覧を取得
- `GET /api/threads/:id` - 特定のスレッドを取得

### メッセージ関連
- `POST /api/messages` - 新しいメッセージを送信（ChatGPT応答付き）
- `GET /api/messages/thread/:threadId` - スレッドのメッセージ一覧を取得

### 要約関連
- `POST /api/summaries` - スレッドの要約を作成
- `POST /api/summaries/:id/save-to-notion` - 要約をNotionに保存

### 認証関連
- `POST /api/auth/login` - ユーザーログイン
- `POST /api/auth/register` - ユーザー登録
- `GET /api/auth/profile` - プロフィール取得

---

## 🔑 必要なAPIキー

### OpenAI API
1. [OpenAI Platform](https://platform.openai.com/)にアクセス
2. APIキーを生成
3. 環境変数`OPENAI_API_KEY`に設定

### Notion API
1. [Notion Developers](https://developers.notion.com/)にアクセス
2. 新しいインテグレーションを作成
3. APIキーを取得し、環境変数`NOTION_API_KEY`に設定
4. データベースIDを取得し、環境変数`NOTION_DATABASE_ID`に設定
5. データベースにインテグレーションを追加

---

## 🎨 今後の拡張予定

- [ ] フロントエンド（React/Vue.js）の実装
- [ ] ブログ記事自動生成機能
- [ ] スライド資料自動生成機能
- [ ] 複数のアウトプット形式対応
- [ ] ユーザー認証機能
- [ ] チーム機能
- [ ] リアルタイム通信（WebSocket）

---

## 📄 ライセンス

MIT License

---

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成 