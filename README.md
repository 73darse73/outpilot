# 🧠 Outpilot

ChatGPTで調べた内容を、**特定のキーワードに反応して自動で要約**し、ユーザーが「OK」と返すと**Notionに保存**できるアプリです。

将来的には、**ブログ化・スライド化などのアウトプット**にも活用できるよう拡張予定です。

---

## 🎯 プロジェクトの目的

### 1. **バックエンド学習** 📚
NestJS、データベース、API設計などのバックエンド開発スキルを習得

### 2. **アウトプットツール作成** 🛠️
学習内容を自動で要約・整理し、知識の蓄積を効率化するツールを開発

### 3. **ポートフォリオ** 💼
実用的なアプリケーションとして、就職・転職活動でのアピールに活用

---

## 📋 開発フェーズ

### ✅ **フェーズ 1：環境構築（ローカル）**
**目的**: NestJS + Prisma + PostgreSQL の開発環境をローカルで立ち上げる

#### 完了条件
- [ ] NestJS プロジェクトが作成されている
- [ ] .env で環境変数の設定ができている
- [ ] Prisma の初期化・接続が完了している
- [ ] Docker or ローカルでPostgreSQLが立ち上がっている
- [ ] npx prisma studio でデータベースの中身を確認できる

### 💬 **フェーズ 2：チャット機能（OpenAI連携）**
**目的**: チャットUIから送ったメッセージが GPT-4 Turbo で返される仕組みを構築

#### 完了条件
- [ ] POST /chat API が存在する
- [ ] OpenAI API にメッセージを送信し、レスポンスが返ってくる
- [ ] レスポンスを整形して返す（要約ではなく通常の応答）
- [ ] API からのレスポンスがフロント（もしくはcurl）で確認できる

### ✂️ **フェーズ 3：要約トリガーと要約生成**
**目的**: 特定のキーワード（例: #まとめ）が含まれていたら、Chat履歴を元に自動要約を生成する

#### 完了条件
- [ ] チャット履歴を保存 or まとめられる形で管理できている
- [ ] 特定のキーワードを検出できる（#まとめなど）
- [ ] 対象の履歴から要約用プロンプトを構築し、OpenAI APIで要約を取得できる
- [ ] 要約候補が別APIや画面で表示される

### 🧾 **フェーズ 4：Notion保存機能**
**目的**: 承認された要約をNotionのDBに自動保存する

#### 完了条件
- [ ] POST /notion API 経由で要約がNotionに保存できる
- [ ] タイトル・本文・タグ・日付などの項目が正しくマッピングされている
- [ ] 保存されたページURLが取得できる（DBに記録 or フロントに返却）

### 📝 **フェーズ 5：履歴＆ステータス管理**
**目的**: 各チャットや要約の状態（保存済／未保存、承認済／未承認）を確認・管理できるようにする

#### 完了条件
- [ ] チャットログがDBに記録されている
- [ ] 各要約に対して「承認済」などのフラグがある
- [ ] 一覧取得API（例：GET /summaries）で状態を確認できる

### 🖥️ **フェーズ 6：Webフロント連携（Next.jsなど）**
**目的**: 自作のフロントエンドUIからチャット送信・要約確認・Notion保存ができる

#### 完了条件
- [ ] チャット送信フォームがあり、Nest API と連携して動作する
- [ ] 要約確認画面で「OK」「修正」などの操作ができる
- [ ] フロントからNotion保存をトリガーできる

### 🧪 **フェーズ 7：テスト＆デプロイ**
**目的**: 本番環境に公開できる状態にする

#### 完了条件
- [ ] 開発と本番用の .env が分かれている
- [ ] バリデーション・エラーハンドリングが整っている
- [ ] RailwayやRender等にバックエンドをデプロイ
- [ ] Notion APIやOpenAI APIのキーが安全に扱われている

### 🧠 **フェーズ 8：追加機能（今後）**
**目的**: より高度な機能を追加してアプリケーションを拡張する

#### 予定機能
- [ ] Qiita用Markdown生成
- [ ] スライド自動生成（Marpなど）
- [ ] タグ・カテゴリ別の検索機能
- [ ] ポートフォリオ／ブログとの自動連携

---

## 🔧 技術スタック

| 分類      | 技術                                                           |
| ------- | ------------------------------------------------------------ |
| フレームワーク | [NestJS](https://nestjs.com/)（TypeScriptファーストのバックエンドフレームワーク） |
| ORM     | [Prisma](https://www.prisma.io/)                             |
| データベース  | PostgreSQL（Docker ローカル開発）                                    |
| AI      | OpenAI API（gpt-4-turbo 使用）                                   |
| 外部API   | Notion API（アウトプット保存）                                         |
| 認証      | JWT（JSON Web Token）                                          |
| バリデーション | class-validator + class-transformer                          |
| API文書   | Swagger/OpenAPI                                              |

---

## 🛠️ 機能

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

## 🚀 セットアップ

### 1. 依存関係のインストール
```bash
pnpm install
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
pnpm run start:dev

# 本番ビルド
pnpm run build
pnpm run start:prod
```

---

## 📝 API エンドポイント

### スレッド関連
* `POST /api/threads` - 新しいスレッドを作成
* `GET /api/threads` - スレッド一覧を取得
* `GET /api/threads/:id` - 特定のスレッドを取得

### メッセージ関連
* `POST /api/messages` - 新しいメッセージを送信（ChatGPT応答付き）
* `GET /api/messages/thread/:threadId` - スレッドのメッセージ一覧を取得

### 要約関連
* `POST /api/summaries` - スレッドの要約を作成
* `POST /api/summaries/:id/save-to-notion` - 要約をNotionに保存

### 認証関連
* `POST /api/auth/login` - ユーザーログイン
* `POST /api/auth/register` - ユーザー登録
* `GET /api/auth/profile` - プロフィール取得

---

## 🔑 必要なAPIキー

### OpenAI API
1. OpenAI Platformにアクセス
2. APIキーを生成
3. 環境変数`OPENAI_API_KEY`に設定

### Notion API
1. Notion Developersにアクセス
2. 新しいインテグレーションを作成
3. APIキーを取得し、環境変数`NOTION_API_KEY`に設定
4. データベースIDを取得し、環境変数`NOTION_DATABASE_ID`に設定
5. データベースにインテグレーションを追加

---

## コミットタイプ（13種類）
- `feat` - 新機能の追加
- `fix` - バグの修正
- `docs` - ドキュメントの修正
- `style` - コードの整形やセミコロン漏れなど、コードの動作に影響しない変更
- `refactor` - リファクタリング（機能変更なしのコード改善）
- `test` - テストコードの追加・修正
- `chore` - パッケージマネージャの設定などその他の雑多な変更（例：.gitignoreの変更）
- `design` - CSSなどのUIデザインの変更
- `comment` - コメントの追加や修正
- `rename` - ファイルまたはフォルダ名の変更や移動のみ
- `remove` - ファイルの削除のみ行った場合
- `!BREAKING CHANGE` - 破壊的なAPIの変更がある場合
- `!HOTFIX` - 緊急の重大なバグ修正が必要な場合

## 🎨 今後の拡張予定

* フロントエンド（React/Vue.js）の実装
* ブログ記事自動生成機能
* スライド資料自動生成機能
* 複数のアウトプット形式対応
* ユーザー認証機能
* チーム機能
* リアルタイム通信（WebSocket）

---

## 📄 ライセンス

MIT License
