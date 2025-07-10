# Outpilot Backend

NestJS + Prisma + PostgreSQL で構築された管理画面用のバックエンドAPIです。

## 🏗️ アーキテクチャ

```
src/
├── app.module.ts              # メインモジュール
├── main.ts                    # アプリケーションエントリーポイント
├── openai/                    # OpenAI API統合
│   ├── openai.module.ts
│   └── openai.service.ts
├── prisma/                    # データベース層
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── slides/                    # スライド管理
│   ├── slides.controller.ts
│   ├── slides.service.ts
│   ├── slides.module.ts
│   └── dto/
├── threads/                   # チャットスレッド管理
│   ├── threads.controller.ts
│   ├── threads.service.ts
│   ├── threads.module.ts
│   └── dto/
└── test/                      # テストファイル
```

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

必要な環境変数：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/outpilot"
OPENAI_API_KEY="your-openai-api-key"
JWT_SECRET="your-jwt-secret"
```

### 3. データベースのセットアップ

```bash
# マイグレーション実行
npx prisma migrate dev

# Prismaクライアント生成
npx prisma generate
```

### 4. 開発サーバー起動

```bash
npm run start:dev
```

## 📊 データベーススキーマ

### 主要テーブル

#### Threads (チャットスレッド)

- `id`: スレッドID
- `title`: スレッドタイトル
- `createdAt`: 作成日時
- `updatedAt`: 更新日時

#### Messages (メッセージ)

- `id`: メッセージID
- `threadId`: スレッドID
- `content`: メッセージ内容
- `role`: 送信者（user/assistant）
- `createdAt`: 作成日時

#### Summaries (要約)

- `id`: 要約ID
- `threadId`: スレッドID
- `content`: 要約内容
- `type`: 要約タイプ（article/slide）
- `createdAt`: 作成日時

#### Slides (スライド)

- `id`: スライドID
- `threadId`: スレッドID
- `title`: スライドタイトル
- `content`: スライド内容（Markdown）
- `createdAt`: 作成日時
- `updatedAt`: 更新日時

## 🔌 API エンドポイント

### スレッド管理

- `GET /threads` - スレッド一覧取得
- `POST /threads` - 新規スレッド作成
- `GET /threads/:id` - スレッド詳細取得
- `DELETE /threads/:id` - スレッド削除

### メッセージ管理

- `GET /threads/:id/messages` - メッセージ一覧取得
- `POST /threads/:id/messages` - メッセージ送信
- `DELETE /messages/:id` - メッセージ削除

### 要約管理

- `GET /threads/:id/summaries` - 要約一覧取得
- `POST /threads/:id/summaries` - 要約作成
- `PUT /summaries/:id` - 要約更新
- `DELETE /summaries/:id` - 要約削除

### スライド管理

- `GET /slides` - スライド一覧取得
- `POST /slides` - 新規スライド作成
- `GET /slides/:id` - スライド詳細取得
- `PUT /slides/:id` - スライド更新
- `DELETE /slides/:id` - スライド削除

## 🤖 OpenAI統合

### 機能

- **チャット応答生成**: ユーザーメッセージに対するAI応答
- **記事生成**: スレッド内容から記事の自動生成
- **スライド生成**: スレッド内容からスライドの自動生成
- **要約生成**: 長いスレッドの要約作成

### 使用例

```typescript
// OpenAIサービスを使用
const response = await this.openaiService.generateResponse(
  messages,
  'article', // または 'slide'
);
```

## 🧪 テスト

### ユニットテスト

```bash
npm run test
```

### E2Eテスト

```bash
npm run test:e2e
```

### テストカバレッジ

```bash
npm run test:cov
```

## 🐳 Docker

### 開発環境

```bash
docker-compose up -d
```

### 本番環境

```bash
docker build -t outpilot-backend .
docker run -p 3001:3001 outpilot-backend
```

## 📝 開発ガイドライン

### コーディング規約

- TypeScript strict mode
- ESLint + Prettier
- NestJS 規約に従う

### コミットメッセージ

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加
chore: その他の変更
```

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発
- `hotfix/*`: 緊急修正

## 🔧 トラブルシューティング

### よくある問題

#### データベース接続エラー

```bash
# PostgreSQLが起動しているか確認
brew services list | grep postgresql

# 接続テスト
npx prisma db push
```

#### OpenAI API エラー

```bash
# APIキーが正しく設定されているか確認
echo $OPENAI_API_KEY

# 環境変数ファイルを再読み込み
source .env
```

#### ポート競合

```bash
# 使用中のポート確認
lsof -i :3001

# プロセス終了
kill -9 <PID>
```

## 📚 参考資料

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Outpilot Backend** - AI学習支援ツールのバックエンドAPI
