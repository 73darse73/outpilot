# NestJS 基本概念

## 📅 学習日: 2024-06-19

## 🎓 学んだこと

### 1. NestJSとは
- **TypeScriptファースト**のバックエンドフレームワーク
- **依存性注入（DI）**を基盤とした設計
- **モジュラーアーキテクチャ**でスケーラブル
- **Express.js**をベースにしたHTTPサーバー

### 2. 基本的な構造

#### プロジェクト構造
```
src/
├── main.ts              # アプリケーションのエントリーポイント
├── app.module.ts        # ルートモジュール
├── app.controller.ts    # HTTPリクエストの処理
├── app.service.ts       # ビジネスロジック
└── app.controller.spec.ts # テストファイル
```

#### 各ファイルの役割
- **main.ts**: アプリケーションの起動設定
- **app.module.ts**: モジュールの定義と依存関係
- **app.controller.ts**: HTTPエンドポイントの定義
- **app.service.ts**: ビジネスロジックの実装

### 3. デコレータの概念

#### 基本的なデコレータ
```typescript
@Module()           // モジュールの定義
@Controller()       // コントローラーの定義
@Injectable()       // サービスの定義
@Get()              // GETリクエストの処理
@Post()             // POSTリクエストの処理
@Put()              // PUTリクエストの処理
@Delete()           // DELETEリクエストの処理
```

#### 使用例
```typescript
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

### 4. 依存性注入（DI）

#### 基本的な概念
- **コンポーネント間の疎結合**
- **テストしやすい設計**
- **再利用性の向上**

#### 実装例
```typescript
@Injectable()
export class UsersService {
  findAll() {
    return ['user1', 'user2'];
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

## 🚀 実践したこと

### プロジェクトの作成
```bash
# NestJS CLIのインストール
yarn add @nestjs/cli

# プロジェクトの生成
nest new . --package-manager yarn --skip-git
```

### 基本的なファイルの確認
```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

## 💡 気づいたこと

### 1. デコレータの重要性
- TypeScriptの機能を活用
- コードの可読性が向上
- 設定が簡潔になる

### 2. 依存性注入の利点
- コンポーネント間の結合度が低い
- テストが書きやすい
- 再利用性が高い

### 3. モジュラー設計の重要性
- 機能ごとに分離
- 保守性が向上
- スケーラビリティが高い

### 4. CLIツールの便利さ
- ボイラープレートコードの自動生成
- 一貫した構造の維持
- 開発効率の向上

## 🔧 よく使うコマンド

### プロジェクト管理
```bash
nest new <プロジェクト名>     # 新規プロジェクト作成
nest generate <タイプ> <名前>   # コード生成
nest build                    # プロジェクトをビルド
nest start                    # アプリケーションを起動
nest start --watch            # 開発モードで起動
```

### コード生成
```bash
nest g controller users       # コントローラーを生成
nest g service users          # サービスを生成
nest g module users           # モジュールを生成
nest g resource users         # リソース一式を生成
```

### 短縮形
```bash
nest g co users              # controller
nest g s users               # service
nest g mo users              # module
nest g res users             # resource
```

## 📚 参考資料

- [NestJS公式ドキュメント](https://docs.nestjs.com/)
- [NestJS公式サンプル](https://github.com/nestjs/nest/tree/master/sample)
- [TypeScript公式ハンドブック](https://www.typescriptlang.org/docs/)

## 📝 次回の予定

1. **Hello World APIの動作確認**
2. **基本的なAPIエンドポイントの作成**
3. **DTO（Data Transfer Object）の理解**
4. **バリデーションの実装**
5. **エラーハンドリング**

## 🎯 学習のポイント

### 重要な概念
- **デコレータ**: TypeScriptの機能を活用
- **依存性注入**: コンポーネント間の連携
- **モジュラー設計**: 機能の分離と統合
- **TypeScript**: 型安全性の確保

### ベストプラクティス
- 小さなモジュールに分割
- 単一責任の原則
- 依存性注入を活用
- 型安全性を重視 