# やったことログ

実際にやったことを記録していくログファイル。

## 2024-12-19

### NestJSプロジェクト作成
- NestJS CLIをグローバルインストール: `npm install -g @nestjs/cli`
- プロジェクト作成: `nest new outpilot`
- パッケージマネージャーとしてpnpmを選択
  - ディスク容量の節約（シンボリックリンクで同じパッケージを共有）
  - インストール速度がnpm/yarnより高速
  - 厳格な依存関係管理（不要な依存関係を防げる）
  - モノレポ対応（将来的に複数パッケージ管理に便利）
- 開発サーバー起動: `pnpm start:dev`
- ポート3000でHello World APIが動作確認できた

### NestJS CLIによって自動生成された設定ファイル
- **package.json** - 依存関係とスクリプト（pnpm installで自動インストール）
- **tsconfig.json** - TypeScript設定（ES2023、strict mode等）
- **tsconfig.build.json** - ビルド用TypeScript設定
- **nest-cli.json** - NestJS CLI設定（ソースルート、コンパイルオプション等）
- **.prettierrc** - コードフォーマット設定（シングルクォート、トレイリングカンマ）
- **eslint.config.mjs** - ESLint設定（TypeScript対応、Prettier連携）
- **.gitignore** - Git除外設定（node_modules、dist、ログファイル等）
- **src/** - ソースコードディレクトリ
  - `main.ts` - アプリケーションエントリーポイント
  - `app.module.ts` - ルートモジュール
  - `app.controller.ts` - サンプルコントローラー
  - `app.service.ts` - サンプルサービス
- **test/** - テストディレクトリ
  - `jest-e2e.json` - E2Eテスト設定
  - `app.e2e-spec.ts` - サンプルE2Eテスト
  - `app.controller.spec.ts` - サンプルユニットテスト

### 現在の依存関係
- **dependencies** (本番環境でも使用)
  - `@nestjs/common` - NestJS共通機能
  - `@nestjs/core` - NestJSコア機能
  - `@nestjs/platform-express` - Express統合
  - `reflect-metadata` - メタデータリフレクション
  - `rxjs` - リアクティブプログラミング

- **devDependencies** (開発環境のみ)
  - `@nestjs/cli` - NestJS CLIツール
  - `@nestjs/schematics` - コード生成
  - `@nestjs/testing` - テスト用
  - TypeScript関連
  - ESLint/Prettier
  - Jest (テストフレームワーク)

## Prismaの導入
- Prismaの導入
  - CLIは開発環境のみ `pnpm add -D prisma`
    - 開発時のみ使用するツール
    - スキーマの生成、マイグレーション、データベースの管理
    - 例：npx prisma generate、npx prisma db push、npx prisma studio
  - Clientは本番環境でも使用 `pnpm add @prisma/client`
    - アプリケーション実行時に使用するライブラリ
    - データベースへのアクセス、クエリの実行
    - 例：prisma.user.findMany()、prisma.post.create()
- 初期化コマンド**: `npx prisma init --datasource-provider postgresql`
  - `--datasource-provider postgresql` を付けた理由: デフォルトのSQLiteではなく、最初からPostgreSQL用の設定にしたかったため
- これによって起こったこと
  - `prisma/schema.prisma` が生成され、`provider = "postgresql"` になっている
  - `.env` ファイルが生成され、`DATABASE_URL` のテンプレが入っている
  - これでPostgreSQL用のDB設計・マイグレーションがすぐ始められる状態になった

- **次のステップ**: スキーマ設計・マイグレーション

### Prismaスキーマ設計
- **設計方針**: 自分だけが使うことを前提にシンプルな構成
- **モデル構成**:
  - `Thread` - チャットスレッド（id, title, createdAt, updatedAt）
  - `Message` - チャットメッセージ（id, content, role, threadId, createdAt）
  - `Summary` - 要約データ（id, title, content, threadId, status, notionUrl, createdAt, updatedAt）
- **リレーション**: Thread (1) ←→ (多) Message, Thread (1) ←→ (多) Summary
- **Userモデルは削除**: 自分だけが使うため不要
- **理由**: シンプルな構成で開発を進めやすくする

### Gitブランチ戦略
- **mainブランチ**: NestJSプロジェクト作成 + Prisma初期設定まで完了
- **feature/prisma-setupブランチ**: スキーマ設計・マイグレーション作業
- **今後の予定**:
  - feature/user-model - UserモデルとAPI実装
  - feature/chat-function - チャット機能
  - feature/summary-function - 要約機能
- **理由**: 機能ごとにブランチを分けることで、作業履歴を整理し、必要に応じて特定の機能だけをリバートできる

## Docker環境の構築
- **PostgreSQL用のDocker Compose設定**
  - `docker-compose.yml`を作成
  - PostgreSQL 15を使用
  - 環境変数の設定
    - データベース名: outpilot
    - ユーザー名: outpilot
    - パスワード: outpilot
  - ポート: 5432をホストにマッピング
  - データの永続化: `postgres_data`ボリュームを設定

### モジュール構成の追加
- **新規ディレクトリ構成**:
  - `src/threads/` - スレッド関連の機能を管理
    - `threads.module.ts` - ThreadsModuleの定義（PrismaModuleをインポート）
    - `threads.service.ts` - スレッドのCRUD操作を実装
      - スレッドの作成（create）
      - 全スレッドの取得（findAll）- メッセージと要約の数も取得
      - 個別スレッドの取得（findOne）- 関連メッセージと要約も取得
      - スレッドの更新（update）
      - スレッドの削除（remove）
  - `src/prisma/` - Prisma関連の機能を管理
    - `prisma.module.ts` - PrismaModuleの定義
    - `prisma.service.ts` - Prismaクライアントのサービス実装
- **テスト用ファイル追加**:
  - `test-prisma.ts` - Prismaの動作確認用スクリプト
  - `test-prisma.js` - コンパイル後のテストファイル

