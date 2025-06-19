# Git/GitHub 基本操作

## 📅 学習日: 2024-06-19

## 🎓 学んだこと

### 1. Gitの基本概念
- **リポジトリ**: プロジェクトの履歴を管理する場所
- **コミット**: 変更のスナップショット
- **ブランチ**: 独立した開発ライン
- **ステージング**: コミットするファイルを選択する場所

### 2. 基本的なコマンド

#### リポジトリの初期化
```bash
git init                    # 新しいリポジトリを作成
```

#### ファイルの管理
```bash
git add <ファイル名>         # ファイルをステージングに追加
git add .                   # 全ての変更をステージングに追加
git status                  # 現在の状態を確認
```

#### コミット
```bash
git commit -m "メッセージ"   # 変更をコミット
git log                     # コミット履歴を確認
git log --oneline           # 簡潔な履歴表示
```

#### ブランチ操作
```bash
git branch                  # ブランチ一覧表示
git branch <ブランチ名>      # 新しいブランチを作成
git checkout <ブランチ名>    # ブランチを切り替え
git checkout -b <ブランチ名> # ブランチを作成して切り替え
```

#### リモートリポジトリ
```bash
git remote add origin <URL> # リモートリポジトリを追加
git push origin <ブランチ名> # リモートにプッシュ
git pull origin <ブランチ名> # リモートから取得
```

## 🚀 実践したこと

### プロジェクトの初期化
```bash
git init
git add README.md
git commit -m "Add README with NestJS learning plan"
```

### ブランチでの開発
```bash
git checkout -b feature/hello-world
# 開発作業...
git add .
git commit -m "Add Hello World feature"
```

### GitHubとの連携
```bash
git push origin main
```

## 💡 気づいたこと

### 1. コミットメッセージの重要性
- 何を変更したかが明確にわかるメッセージ
- 過去の自分や他の開発者が理解しやすい
- 例: "Add user authentication" vs "Fix bug"

### 2. ブランチ戦略
- **main**: 本番用（安定版）
- **feature/***: 機能開発用
- **hotfix/***: 緊急修正用

### 3. 小さなコミットの重要性
- 変更の追跡が容易
- 問題の特定が簡単
- ロールバックが安全

## 🔧 よく使うコマンド

### 日常的な操作
```bash
git status                  # 状態確認
git add .                   # 全変更をステージング
git commit -m "メッセージ"   # コミット
git push                    # プッシュ
```

### トラブルシューティング
```bash
git restore <ファイル名>     # 変更を元に戻す
git reset --hard HEAD       # 最後のコミットに戻す
git log --oneline           # 履歴確認
```

## 📚 参考資料

- [Git公式ドキュメント](https://git-scm.com/doc)
- [GitHub公式ガイド](https://guides.github.com/)
- [Pro Git Book](https://git-scm.com/book/ja/v2)

## 📝 次回の予定

1. **ブランチのマージ**
2. **コンフリクトの解決**
3. **GitHub Flowの理解**
4. **プルリクエストの作成**

## 🎯 学習のポイント

### 重要な概念
- **バージョン管理**: 変更の履歴を追跡
- **分散開発**: 複数人での開発を支援
- **履歴管理**: いつ、何を、なぜ変更したかを記録

### ベストプラクティス
- 小さな変更ごとにコミット
- 意味のあるコミットメッセージ
- ブランチを活用した開発
- 定期的なプッシュ 