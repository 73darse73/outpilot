# 🌐 API設計

## 📅 作成日: 2024-06-19

---

## 🎯 HTTPメソッド

### 📋 主要なHTTPメソッド

#### 1. **GET**
- **用途**: リソースの取得
- **冪等性**: 冪等（何度実行しても同じ結果）
- **安全性**: 安全（リソースを変更しない）
- **例**: ユーザー一覧取得、特定ユーザーの詳細取得

```typescript
@Get()
getUsers(): User[] {
  return this.userService.findAll();
}

@Get(':id')
getUser(@Param('id') id: string): User {
  return this.userService.findById(id);
}
```

#### 2. **POST**
- **用途**: 新しいリソースの作成
- **冪等性**: 非冪等（実行するたびに新しいリソースが作成される）
- **安全性**: 非安全（リソースを変更する）
- **例**: 新しいユーザーの作成、メッセージの送信

```typescript
@Post()
createUser(@Body() createUserDto: CreateUserDto): User {
  return this.userService.create(createUserDto);
}
```

#### 3. **PUT**
- **用途**: リソースの完全な置き換え
- **冪等性**: 冪等（何度実行しても同じ結果）
- **安全性**: 非安全（リソースを変更する）
- **例**: ユーザー情報の完全な更新

```typescript
@Put(':id')
updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
  return this.userService.update(id, updateUserDto);
}
```

#### 4. **PATCH**
- **用途**: リソースの部分的な更新
- **冪等性**: 冪等（何度実行しても同じ結果）
- **安全性**: 非安全（リソースを変更する）
- **例**: ユーザーの特定フィールドのみ更新

```typescript
@Patch(':id')
partialUpdateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
  return this.userService.partialUpdate(id, updateUserDto);
}
```

#### 5. **DELETE**
- **用途**: リソースの削除
- **冪等性**: 冪等（何度実行しても同じ結果）
- **安全性**: 非安全（リソースを変更する）
- **例**: ユーザーの削除

```typescript
@Delete(':id')
deleteUser(@Param('id') id: string): void {
  return this.userService.delete(id);
}
```

---

## 🏗️ RESTful API設計

### 🎯 RESTful APIの原則

#### 1. **リソースベースのURL設計**
```
✅ 良い例
GET    /api/users          # ユーザー一覧取得
GET    /api/users/123      # 特定ユーザー取得
POST   /api/users          # ユーザー作成
PUT    /api/users/123      # ユーザー更新
DELETE /api/users/123      # ユーザー削除

❌ 悪い例
GET    /api/getUsers
POST   /api/createUser
PUT    /api/updateUser
DELETE /api/deleteUser
```

#### 2. **HTTPステータスコードの適切な使用**

##### 成功レスポンス
- `200 OK`: リクエスト成功
- `201 Created`: リソース作成成功
- `204 No Content`: 成功だがレスポンスボディなし

##### クライアントエラー
- `400 Bad Request`: リクエストが不正
- `401 Unauthorized`: 認証が必要
- `403 Forbidden`: アクセス権限なし
- `404 Not Found`: リソースが見つからない
- `409 Conflict`: リソースの競合

##### サーバーエラー
- `500 Internal Server Error`: サーバー内部エラー
- `502 Bad Gateway`: ゲートウェイエラー
- `503 Service Unavailable`: サービス利用不可

#### 3. **一貫性のあるレスポンス形式**

```typescript
// 成功レスポンス
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User created successfully"
}

// エラーレスポンス
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

---

## 📝 エンドポイント設計

### 🎯 OutpilotプロジェクトのAPI設計

#### スレッド関連
```
GET    /api/threads              # スレッド一覧取得
GET    /api/threads/:id          # 特定スレッド取得
POST   /api/threads              # スレッド作成
PUT    /api/threads/:id          # スレッド更新
DELETE /api/threads/:id          # スレッド削除
```

#### メッセージ関連
```
GET    /api/threads/:id/messages     # スレッドのメッセージ一覧
POST   /api/threads/:id/messages     # メッセージ送信（ChatGPT応答付き）
GET    /api/messages/:id             # 特定メッセージ取得
PUT    /api/messages/:id             # メッセージ更新
DELETE /api/messages/:id             # メッセージ削除
```

#### 要約関連
```
GET    /api/threads/:id/summary      # スレッドの要約取得
POST   /api/threads/:id/summarize    # 要約生成
POST   /api/summaries/:id/save       # 要約をNotionに保存
```

#### 認証関連
```
POST   /api/auth/register            # ユーザー登録
POST   /api/auth/login               # ユーザーログイン
GET    /api/auth/profile             # プロフィール取得
POST   /api/auth/logout              # ログアウト
```

---

## 🔧 NestJSでの実装例

### 📝 コントローラーの実装

```typescript
@Controller('api/threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Get()
  async findAll(): Promise<Thread[]> {
    return this.threadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Thread> {
    return this.threadService.findById(id);
  }

  @Post()
  async create(@Body() createThreadDto: CreateThreadDto): Promise<Thread> {
    return this.threadService.create(createThreadDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto
  ): Promise<Thread> {
    return this.threadService.update(id, updateThreadDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.threadService.delete(id);
  }
}
```

### 📝 DTO（Data Transfer Object）の定義

```typescript
export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateThreadDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
```

### 📝 パラメータの取得

```typescript
@Controller('api/threads')
export class ThreadController {
  // URLパラメータ
  @Get(':id')
  findOne(@Param('id') id: string) {}

  // クエリパラメータ
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {}

  // リクエストボディ
  @Post()
  create(@Body() createThreadDto: CreateThreadDto) {}

  // ヘッダー
  @Get()
  findAll(@Headers('authorization') auth: string) {}
}
```

---

## 🎯 ベストプラクティス

### 📋 API設計の原則
1. **一貫性**: 命名規則、レスポンス形式を統一
2. **シンプル**: 複雑すぎない設計
3. **直感的**: 理解しやすいURL設計
4. **拡張性**: 将来の機能追加に対応
5. **セキュリティ**: 適切な認証・認可

### 🔧 実装のコツ
1. **バリデーション**: 入力値の検証を徹底
2. **エラーハンドリング**: 統一的なエラー処理
3. **ドキュメント**: API仕様書の整備
4. **テスト**: 各エンドポイントのテスト
5. **バージョニング**: APIバージョンの管理

---

## 📊 学習進捗

### ✅ 完了済み
- [ ] HTTPメソッドの基本理解
- [ ] RESTful APIの設計原則
- [ ] 基本的なエンドポイント設計

### 🔄 進行中
- [ ] NestJSでのAPI実装
- [ ] バリデーションの実装
- [ ] エラーハンドリング

### 📋 次回の学習内容
- データベース連携（Prisma）
- 認証・認可の実装
- 外部API連携（OpenAI、Notion） 