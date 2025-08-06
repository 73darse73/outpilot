# Outpilot Portfolio

モダンなデザインとアニメーションを採用したポートフォリオサイト。技術力とアウトプット力をアピールします。

## 機能

- **レスポンシブデザイン**: モバイルからデスクトップまで完全対応
- **ダークモード**: システム設定に基づく自動切り替え
- **アニメーション**: Framer Motion を使った滑らかなアニメーション
- **GitHub 連携**: 実際の GitHub データを表示
- **スキル分析**: 技術スタックの詳細分析
- **パフォーマンス最適化**: Core Web Vitals 監視

## 技術スタック

- **Next.js 15**: App Router
- **TypeScript**: 型安全性
- **Tailwind CSS**: モダンなスタイリング
- **Framer Motion**: アニメーション
- **Recharts**: データ可視化
- **GitHub API**: 開発活動の可視化

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`env.example`をコピーして`.env.local`を作成し、必要な環境変数を設定してください：

```bash
cp env.example .env.local
```

#### GitHub 連携の設定

1. **GitHub Personal Access Token の作成**

   - GitHub の Settings > Developer settings > Personal access tokens
   - "Generate new token (classic)"を選択
   - 以下の権限を付与：
     - `public_repo` (公開リポジトリの読み取り)
     - `read:user` (ユーザー情報の読み取り)
   - トークンを生成してコピー

2. **環境変数の設定**

   ```bash
   # .env.local
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
   NEXT_PUBLIC_API_URL=http://localhost:3003
   ```

3. **GitHub ユーザー名の設定**
   `portfolio/app/analytics/page.tsx`と`portfolio/app/skills/page.tsx`の以下の行を実際の GitHub ユーザー名に変更：
   ```typescript
   const {
     data: githubStats,
     loading: githubLoading,
     error: githubError,
   } = useGitHubData('your-github-username');
   ```

### 3. 開発サーバーの起動

```bash
pnpm dev
```

## ページ構成

- `/` - ホームページ（自己紹介・導線）
- `/about` - 詳細な自己紹介
- `/projects` - プロジェクト一覧
- `/analytics` - データ可視化（GitHub 統計、アウトプット分析）
- `/skills` - スキル分析ページ
- `/contact` - お問い合わせ

## GitHub 連携機能

### 取得データ

- **リポジトリ情報**: リポジトリ数、スター数、フォーク数
- **コミット履歴**: 最近のコミット数、技術タグ
- **言語使用率**: 各言語の使用割合
- **アクティビティ**: 最近 30 日間の活動レベル
- **コントリビューション**: GitHub 風のカレンダー

### スキル分析

- **カテゴリ別分類**: フロントエンド、バックエンド、インフラ、ツール
- **スコア計算**: GitHub + Qiita の統合スコア
- **レベル表示**: 0-100 のスキルレベル
- **トレンド分析**: 技術使用の傾向

### エラーハンドリング

- API 接続失敗時のフォールバック
- レート制限の適切な処理
- ユーザーフレンドリーなエラーメッセージ

## 開発

### コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番サーバー起動
pnpm start

# リント
pnpm lint
```

### ディレクトリ構成

```
portfolio/
├── app/                    # Next.js App Router
│   ├── components/         # 共通コンポーネント
│   ├── hooks/             # カスタムフック
│   ├── analytics/         # 分析ページ
│   ├── skills/            # スキルページ
│   └── ...
├── lib/                   # ユーティリティ
│   └── api/              # API関連
├── public/               # 静的ファイル
└── ...
```

## デプロイ

### Vercel

1. GitHub リポジトリを Vercel に接続
2. 環境変数を設定
3. デプロイ完了

### その他のプラットフォーム

- Netlify
- Railway
- Render

## ライセンス

MIT License
