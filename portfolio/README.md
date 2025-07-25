# Outpilot Portfolio Site

## 🎯 目的

他のエンジニアや採用担当者、個人顧客に向けて技術力や信頼感、アウトプット力を伝える

## 🎨 デザインコンセプト

**「モダン・テック・フレンドリー」**

- モダンで技術的な雰囲気
- 遊び心や親しみやすさ
- エンジニアらしい細部へのこだわり

## 📄 ページ構成

```
/                    → ホーム（自己紹介 + ハイライト + スキル概要）
/about               → 詳細な自己紹介 + 経歴
/projects            → プロジェクト一覧 + アウトプット（記事・スライド含む）
/analytics           → データ可視化（GitHub統計、アウトプット分析）
/contact             → お問い合わせフォーム
```

## 📝 コンテンツ

### ホームページ (/)

- 自己紹介（キャッチコピー）
- スキル概要（主要技術スタック）
- ハイライト（代表的なプロジェクト 3-4 個）
- 今後の目標・学習ロードマップ

### 詳細プロフィール (/about)

- 詳細な自己紹介
- 経歴・職歴
- 技術的な興味・関心
- 趣味・プライベート

### プロジェクト・アウトプット (/projects)

- プロジェクト一覧（GitHub、デモ含む）
- Qiita 投稿記事一覧
- Outpilot で作ったスライド一覧
- 技術的な学び・気づき

### データ可視化 (/analytics)

- GitHub 統計（コントリビューション数、使用言語割合）
- 月別アウトプット可視化
- タグ別記事数
- 技術スタックの使用頻度

### 連絡・SNS (/contact)

- お問い合わせフォーム
- SNS リンク（GitHub、Twitter、LinkedIn 等）

## 🎬 アニメーション仕様

| カテゴリ                                  | 内容                                               | ツール・技術                |
| ----------------------------------------- | -------------------------------------------------- | --------------------------- |
| 1. ヒーローの入り                         | 名前・キャッチコピーがタイポグラフィ風にアニメ     | Framer Motion + Tailwind    |
| 2. コード風アニメ                         | `<AboutMe />`みたいなタグがタイピングされて出現    | Typewriter 風＋ motion.div  |
| 3. カーソルエフェクト                     | カーソルにトレイルやパーティクル                   | `useEffect`＋ canvas or CSS |
| 4. セクション間トランジション             | スクロール時に波のようにスライド                   | GSAP / Framer Motion        |
| 5. スキル円グラフアニメ                   | スキル率を円グラフでアニメ表示                     | `react-chartjs-2`＋ animate |
| 6. GitHub Contribution 風のカレンダー出現 | 年間活動が一気に浮き出る                           | SVG アニメ or `visx`        |
| 7. アウトプット可視化のグラフ             | 月別投稿数がバーでポーン！                         | `Recharts`＋アニメ          |
| 8. スライド一覧                           | カードをホバーするとくるっと反転 or モーダルで開く | `Framer Motion` or CSS      |
| 9. ページ全体ローディング演出             | `Loading`がコード風に表示されてフェード            | motion.div ＋ delay         |
| 10. ダークモード切替時アニメ              | 日 → 夜みたいな遊び（太陽が月に変わる）            | `react-spring`や Lottie     |

## 🛠 技術スタック

### フロントエンド

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (アニメーション)
- **React Spring** (物理ベースアニメーション)

### データ可視化

- **Recharts** (グラフ・チャート)
- **React Chart.js 2** (円グラフ)
- **Visx** (GitHub 風カレンダー)

### API

- **Next.js API Routes** (お問い合わせフォーム等)

## 🚀 実装フェーズ

### Phase 1: 基本構造 + アニメーション基盤

1. レイアウト・ナビゲーション
2. ヒーローセクション（タイポグラフィアニメ）
3. ローディング演出（コード風）

### Phase 2: インタラクティブ要素

4. カーソルエフェクト
5. ダークモード切替
6. セクション間トランジション

### Phase 3: データ可視化

7. スキル円グラフ
8. GitHub Contribution 風カレンダー
9. アウトプット可視化グラフ

### Phase 4: コンテンツ

10. 各ページの実装
11. スライド一覧のカードアニメ

## 🎯 期待効果

- 技術力の視覚的アピール
- アウトプット力の定量的証明
- 親しみやすさでアプローチしやすさを演出
- 遊び心で記憶に残る印象

## 🏃‍♂️ Getting Started

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# 本番起動
pnpm start
```

## 📍 アクセス

- 開発環境: http://localhost:3001
- 本番環境: (デプロイ後に追加)
