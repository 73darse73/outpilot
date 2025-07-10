# Backend Source Code

NestJSアプリケーションのソースコードディレクトリです。

## 📁 ディレクトリ構成

### コアファイル

- `main.ts` - アプリケーションのエントリーポイント
- `app.module.ts` - メインモジュール（全モジュールの統合）
- `app.controller.ts` - ルートコントローラー
- `app.service.ts` - アプリケーションサービス

### モジュール別ディレクトリ

#### `openai/` - OpenAI API統合

- `openai.module.ts` - OpenAIモジュール設定
- `openai.service.ts` - OpenAI API呼び出しサービス

#### `prisma/` - データベース層

- `prisma.module.ts` - Prismaモジュール設定
- `prisma.service.ts` - データベース操作サービス

#### `threads/` - チャットスレッド管理

- `threads.controller.ts` - スレッド関連APIエンドポイント
- `threads.service.ts` - スレッドビジネスロジック
- `threads.module.ts` - スレッドモジュール設定
- `dto/` - データ転送オブジェクト
  - `create-thread.dto.ts`
  - `thread.dto.ts`
  - `create-message.dto.ts`
  - `message.dto.ts`
  - `create-summary.dto.ts`
  - `summary.dto.ts`
  - `update-summary.dto.ts`

#### `slides/` - スライド管理

- `slides.controller.ts` - スライド関連APIエンドポイント
- `slides.service.ts` - スライドビジネスロジック
- `slides.module.ts` - スライドモジュール設定
- `create-slide.dto.ts`
- `slide.dto.ts`
- `update-slide.dto.ts`

### テスト

- `test/` - E2Eテストファイル
- `app.controller.spec.ts` - コントローラーユニットテスト

## 🔧 開発ガイドライン

### モジュール作成時のルール

1. モジュールディレクトリを作成
2. `*.module.ts`でモジュールを定義
3. `*.controller.ts`でAPIエンドポイントを定義
4. `*.service.ts`でビジネスロジックを実装
5. `dto/`ディレクトリでDTOを定義

### 命名規則

- ファイル名: kebab-case
- クラス名: PascalCase
- メソッド名: camelCase
- 定数: UPPER_SNAKE_CASE

### エラーハンドリング

```typescript
// 統一されたエラーレスポンス
@HttpException(HttpStatus.BAD_REQUEST, 'Invalid input')
```

### バリデーション

```typescript
// DTOでのバリデーション
export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
```

## 📊 データフロー

```
Client Request → Controller → Service → Prisma Service → Database
                ↓
            Response ← Service ← Prisma Service ← Database
```

## 🔌 API設計原則

### RESTful API

- `GET /threads` - スレッド一覧取得
- `POST /threads` - 新規スレッド作成
- `GET /threads/:id` - スレッド詳細取得
- `PUT /threads/:id` - スレッド更新
- `DELETE /threads/:id` - スレッド削除

### ネストしたリソース

- `GET /threads/:id/messages` - スレッドのメッセージ一覧
- `POST /threads/:id/messages` - スレッドにメッセージ追加

## 🧪 テスト戦略

### ユニットテスト

- サービス層のビジネスロジック
- コントローラー層のリクエスト処理
- DTOのバリデーション

### 統合テスト

- APIエンドポイントの動作確認
- データベース操作の検証

### E2Eテスト

- 完全なユーザーフローの検証

## 🔍 デバッグ

### ログ出力

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class ThreadsService {
  private readonly logger = new Logger(ThreadsService.name);

  async createThread(dto: CreateThreadDto) {
    this.logger.log(`Creating thread: ${dto.title}`);
    // ...
  }
}
```

### 開発者ツール

- NestJS CLI
- Prisma Studio
- Postman/Insomnia

---

**Backend Source** - NestJSアプリケーションのコアロジック
