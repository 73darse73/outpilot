# パッケージマネージャー比較

## 📅 学習日: 2024-06-19

## 🎓 学んだこと

### 1. パッケージマネージャーの役割
- **依存関係の管理**: 必要なライブラリを自動でインストール
- **バージョン管理**: 適切なバージョンを管理
- **セキュリティ**: 脆弱性のチェック
- **パフォーマンス**: インストール速度の最適化

### 2. 3つの主要なパッケージマネージャー

#### npm (Node Package Manager)
```bash
npm install <パッケージ名>     # パッケージをインストール
npm install -g <パッケージ名>   # グローバルインストール
npm update                     # パッケージを更新
npm audit                      # セキュリティチェック
```

**特徴:**
- ✅ Node.jsに標準搭載
- ✅ 最も成熟している
- ✅ 情報が豊富
- ❌ 速度が遅い
- ❌ 依存関係の重複

#### yarn
```bash
yarn add <パッケージ名>         # パッケージをインストール
yarn global add <パッケージ名>   # グローバルインストール
yarn upgrade                    # パッケージを更新
yarn audit                      # セキュリティチェック
```

**特徴:**
- ✅ npmより2-3倍高速
- ✅ yarn.lockで厳密なバージョン管理
- ✅ 並列インストール
- ✅ オフライン対応
- ✅ セキュリティが高い

#### pnpm
```bash
pnpm add <パッケージ名>         # パッケージをインストール
pnpm add -g <パッケージ名>      # グローバルインストール
pnpm update                     # パッケージを更新
pnpm audit                      # セキュリティチェック
```

**特徴:**
- ✅ npmより5-10倍高速
- ✅ ディスク容量を大幅に節約
- ✅ 厳格な依存関係管理
- ✅ モノレポ対応
- ❌ 学習コストが高い
- ❌ 情報が少ない

## 🚀 実践したこと

### プロジェクトでの選択
```bash
# 最初はyarnを選択
yarn add @nestjs/cli

# 後でpnpmも試してみた
pnpm add @nestjs/cli
```

### インストール方法の比較
```bash
# グローバルインストール
npm install -g @nestjs/cli
yarn global add @nestjs/cli
pnpm add -g @nestjs/cli

# ローカルインストール
npm install @nestjs/cli
yarn add @nestjs/cli
pnpm add @nestjs/cli

# npxでの一時実行
npx @nestjs/cli new my-project
```

## 💡 気づいたこと

### 1. 学習目的での選択
- **初心者**: yarn（情報が豊富、安定性）
- **上級者**: pnpm（最新技術、効率性）
- **実務**: yarn（安定性、チーム開発）

### 2. 速度の違い
- npm: 基準
- yarn: 2-3倍速
- pnpm: 5-10倍速

### 3. ディスク容量の違い
- npm/yarn: 各プロジェクトで重複インストール
- pnpm: シンボリックリンクで重複を削減

### 4. ロックファイルの違い
- npm: package-lock.json
- yarn: yarn.lock
- pnpm: pnpm-lock.yaml

## 🔧 よく使うコマンド

### 基本的な操作
```bash
# インストール
npm install
yarn install
pnpm install

# パッケージ追加
npm install <パッケージ名>
yarn add <パッケージ名>
pnpm add <パッケージ名>

# 開発用パッケージ追加
npm install --save-dev <パッケージ名>
yarn add --dev <パッケージ名>
pnpm add --save-dev <パッケージ名>
```

### スクリプト実行
```bash
npm run <スクリプト名>
yarn <スクリプト名>
pnpm <スクリプト名>
```

## 📚 参考資料

- [npm公式ドキュメント](https://docs.npmjs.com/)
- [yarn公式ドキュメント](https://yarnpkg.com/getting-started)
- [pnpm公式ドキュメント](https://pnpm.io/)

## 📝 次回の予定

1. **yarnの詳細な使い方**
2. **依存関係の管理方法**
3. **セキュリティの理解**
4. **モノレポでの活用**

## 🎯 学習のポイント

### 重要な概念
- **依存関係**: パッケージ間の関係
- **バージョン管理**: セマンティックバージョニング
- **ロックファイル**: 再現可能なビルド
- **セキュリティ**: 脆弱性の管理

### ベストプラクティス
- プロジェクトに応じた選択
- ロックファイルをコミット
- 定期的なセキュリティチェック
- 不要なパッケージの削除 