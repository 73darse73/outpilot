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