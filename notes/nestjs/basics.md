# 📚 NestJS 基礎知識

## 📅 作成日: 2024-06-19

---

## 🎯 NestJSとは

NestJSは、TypeScriptファーストのバックエンドフレームワークです。
Node.jsとExpress.jsの上に構築されており、アーキテクチャパターンや依存性注入などの機能を提供します。

### 🎯 特徴
- **TypeScriptファースト**: 型安全性を重視
- **依存性注入**: 疎結合なコード設計
- **デコレータ**: メタデータベースのプログラミング
- **モジュラー設計**: 再利用可能なコンポーネント
- **豊富なエコシステム**: 多くの公式モジュール

---

## 🏗️ 基本構造

### 📁 プロジェクト構造
```
src/
├── main.ts              # アプリケーションのエントリーポイント
├── app.module.ts        # ルートモジュール
├── app.controller.ts    # ルートコントローラー
└── app.service.ts       # ルートサービス
```

### 🔧 主要コンポーネント

#### 1. **モジュール (Module)**
```typescript
@Module({
  imports: [],      // 他のモジュールをインポート
  controllers: [],  // コントローラーを登録
  providers: [],    // サービスを登録
  exports: []       // 他のモジュールに公開
})
export class AppModule {}
```

#### 2. **コントローラー (Controller)**
```typescript
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

#### 3. **サービス (Service)**
```typescript
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

---

## 🎨 デコレータ (Decorators)

### 📋 クラスデコレータ

#### `@Module()`
モジュールを定義するデコレータ
```typescript
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
```

#### `@Controller()`
コントローラーを定義するデコレータ
```typescript
@Controller('users')
export class UserController {
  // エンドポイントの定義
}
```

#### `@Injectable()`
サービスを定義するデコレータ
```typescript
@Injectable()
export class UserService {
  // ビジネスロジック
}
```

### 📋 メソッドデコレータ

#### HTTPメソッドデコレータ
```typescript
@Get()           // GET リクエスト
@Post()          // POST リクエスト
@Put()           // PUT リクエスト
@Delete()        // DELETE リクエスト
@Patch()         // PATCH リクエスト
```

#### パラメータデコレータ
```typescript
@Param('id')     // URLパラメータ
@Query('page')   // クエリパラメータ
@Body()          // リクエストボディ
@Headers()       // ヘッダー
```

### 📋 プロパティデコレータ

#### バリデーションデコレータ
```typescript
@IsString()
@IsNotEmpty()
@IsEmail()
@MinLength(8)
@MaxLength(100)
```

---

## 🔄 依存性注入 (Dependency Injection)

### 🎯 依存性注入とは
クラスが必要とする依存関係を外部から注入するパターンです。
これにより、疎結合でテストしやすいコードを書けます。

### 📝 基本的な使い方

#### 1. サービスの注入
```typescript
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  getUsers() {
    return this.userService.findAll();
  }
}
```

#### 2. インターフェースの注入
```typescript
// インターフェース定義
export interface IUserService {
  findAll(): User[];
}

// 実装
@Injectable()
export class UserService implements IUserService {
  findAll(): User[] {
    return [];
  }
}

// 使用
@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService
  ) {}
}
```

#### 3. カスタムプロバイダー
```typescript
@Module({
  providers: [
    {
      provide: 'CONFIG',
      useValue: { apiKey: 'your-api-key' }
    }
  ]
})
export class AppModule {}
```

---

## 🚀 アプリケーションの起動

### 📝 main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### 🔧 起動コマンド
```bash
# 開発モード
npm run start:dev

# 本番モード
npm run start:prod

# デバッグモード
npm run start:debug
```

---

## 📚 学習リソース

### 📖 公式ドキュメント
- [NestJS公式ドキュメント](https://docs.nestjs.com/)
- [NestJS GitHub](https://github.com/nestjs/nest)

### 🎥 動画学習
- [NestJS公式コース](https://courses.nestjs.com/)

### 📝 サンプルコード
- [NestJS Examples](https://github.com/nestjs/nest/tree/master/sample)

---

## 💡 ベストプラクティス

### 🎯 コーディング規約
1. **命名規則**: クラス名はPascalCase、メソッド名はcamelCase
2. **ファイル名**: クラス名と一致させる
3. **ディレクトリ構造**: 機能ごとに分ける
4. **エラーハンドリング**: 統一的な例外処理

### 🔧 開発のコツ
1. **小さなモジュール**: 単一責任の原則
2. **依存性注入**: 疎結合な設計
3. **デコレータ**: 宣言的なコード
4. **型安全性**: TypeScriptの恩恵を最大活用

---

## 📊 学習進捗

### ✅ 完了済み
- [x] NestJSプロジェクトの初期化
- [x] Hello World APIの実装
- [x] 基本的なデコレータの理解
- [x] 依存性注入の基本概念

### 🔄 進行中
- [ ] モジュール設計の理解
- [ ] カスタムデコレータの作成
- [ ] ミドルウェアの活用

### 📋 次回の学習内容
- HTTPメソッドとRESTful API
- データベース連携（Prisma）
- バリデーション（class-validator） 