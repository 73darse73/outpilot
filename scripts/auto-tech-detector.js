#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// より正確な技術検出パターン
const TECH_PATTERNS = {
  // フロントエンド
  react: [
    // 確実なReact使用パターン
    /import\s+.*\s+from\s+['"]react['"]/,
    /import\s+React\s+from\s+['"]react['"]/,
    /useState|useEffect|useContext|useReducer|useCallback|useMemo/,
    /React\.createElement|React\.Fragment/,
    /<[A-Z][a-zA-Z]*\s+[^>]*>/, // JSX要素
    /\.tsx$/, // TypeScript Reactファイル
  ],
  typescript: [
    /\.tsx?$/, // TypeScriptファイル
    /interface\s+\w+|type\s+\w+|enum\s+\w+/, // 型定義
    /:\s*[A-Z][a-zA-Z]*\s*[<|]/, // 型注釈
    /as\s+[A-Z][a-zA-Z]*/, // 型アサーション
    /<[A-Z][a-zA-Z]*\s*[>|]/, // ジェネリクス
    /extends\s+[A-Z][a-zA-Z]*/, // 継承
    /implements\s+[A-Z][a-zA-Z]*/, // 実装
  ],
  nextjs: [
    /next\.config\.(js|ts|mjs)/, // Next.js設定ファイル
    /pages\//, // pagesディレクトリ
    /app\//, // appディレクトリ
    /from\s+['"]next\//, // Next.jsインポート
    /useRouter|Link|Image|Head/, // Next.jsコンポーネント
    /getStaticProps|getServerSideProps|getStaticPaths/, // Next.js関数
    /middleware\.(ts|js)/, // ミドルウェア
  ],
  tailwindcss: [
    /className=.*['"][^'"]*(bg-|text-|p-|m-|w-|h-|flex|grid|border|rounded|shadow)/, // Tailwindクラス
    /@tailwind/, // Tailwindディレクティブ
    /tailwind\.config\.(js|ts)/, // Tailwind設定
    /@apply\s+/, // @applyディレクティブ
    /theme\(/, // theme関数
  ],
  'framer-motion': [
    /from\s+['"]framer-motion['"]/,
    /import\s+.*\s+from\s+['"]framer-motion['"]/,
    /motion\.|animate|variants|transition/,
  ],
  vue: [
    /\.vue$/, // Vueファイル
    /Vue\.|vue\./, // Vueオブジェクト
    /<template>|<script>|<style>/, // Vue SFC
    /@vue/, // Vue関連パッケージ
    /v-if|v-for|v-model|v-on|v-bind/, // Vueディレクティブ
  ],

  // バックエンド
  nodejs: [
    /package\.json/, // package.json
    /require\(|import\s+.*\s+from/, // モジュールインポート
    /process\.env/, // 環境変数
    /__dirname|__filename/, // Node.jsグローバル
    /\.js$/, // JavaScriptファイル
  ],
  nestjs: [
    /@nestjs/, // NestJSデコレータ
    /@Controller|@Get|@Post|@Put|@Delete|@Patch/, // HTTPデコレータ
    /@Injectable|@Inject/, // DIデコレータ
    /@Module|@Global/, // モジュールデコレータ
    /@UseGuards|@UseInterceptors|@UsePipes/, // ミドルウェアデコレータ
    /nestjs/,
  ],
  python: [
    /\.py$/, // Pythonファイル
    /import\s+|from\s+.*\s+import/, // Pythonインポート
    /def\s+|class\s+/, // 関数・クラス定義
    /requirements\.txt/, // 依存関係ファイル
    /pip|conda/, // パッケージマネージャー
    /if\s+__name__\s*==\s*['"]__main__['"]/, // メイン実行
  ],
  prisma: [
    /prisma/, // Prisma関連
    /@prisma/, // Prismaデコレータ
    /schema\.prisma/, // Prismaスキーマ
    /PrismaClient/, // Prismaクライアント
    /prisma\s+generate|prisma\s+migrate/, // Prismaコマンド
  ],
  express: [
    /express/,
    /app\.(get|post|put|delete|patch)/, // Expressルート
    /express\.Router/, // Expressルーター
    /app\.use/, // Expressミドルウェア
    /res\.(send|json|status)/, // Expressレスポンス
  ],

  // インフラ
  docker: [
    /Dockerfile/, // Dockerfile
    /docker-compose\.(yml|yaml)/, // docker-compose
    /FROM\s+|RUN\s+|COPY\s+|CMD\s+|ENTRYPOINT\s+/, // Docker命令
    /\.dockerignore/, // .dockerignore
  ],
  aws: [
    /aws/, // AWS関連
    /AWS_/, // AWS環境変数
    /s3|ec2|lambda|dynamodb|rds|cloudfront/, // AWSサービス
    /aws-sdk/, // AWS SDK
    /serverless\.yml|serverless\.yaml/, // Serverless Framework
  ],
  postgresql: [
    /postgresql|postgres/, // PostgreSQL
    /pg_/, // PostgreSQL接頭辞
    /psql/, // PostgreSQLコマンド
    /postgresql\.conf/, // PostgreSQL設定
  ],
  mysql: [
    /mysql/,
    /CREATE\s+TABLE|INSERT\s+INTO|SELECT\s+FROM/, // SQL
    /mysql\.conf/, // MySQL設定
  ],

  // ツール
  git: [
    /\.gitignore/, // .gitignore
    /\.git/, // .gitディレクトリ
    /git\s+add|git\s+commit|git\s+push/, // Gitコマンド
  ],
  github: [
    /github/, // GitHub
    /\.github/, // .githubディレクトリ
    /GITHUB_/, // GitHub環境変数
    /github-actions/, // GitHub Actions
  ],
  figma: [
    /figma/, // Figma
  ],
  vercel: [
    /vercel/, // Vercel
    /vercel\.json/, // Vercel設定
  ],
  netlify: [
    /netlify/,
    /netlify\.toml/, // Netlify設定
  ],
};

// 誤検出を防ぐための除外パターン
const EXCLUDE_PATTERNS = [
  /\/\/.*react/, // コメント内の技術名
  /\/\*.*react.*\*\//, // ブロックコメント内
  /['"][^'"]*react[^'"]*['"]/, // 文字列内の技術名
  /console\.log\(.*react.*\)/, // console.log内
  /\/\/.*TODO.*react/, // TODOコメント
  /\/\/.*FIXME.*react/, // FIXMEコメント
];

// ファイル内容から技術を検出（改善版）
function detectTechnologiesFromContent(content, filename) {
  const detected = new Set();

  // 除外パターンをチェック
  const shouldExclude = EXCLUDE_PATTERNS.some((pattern) =>
    pattern.test(content),
  );
  if (shouldExclude) {
    return [];
  }

  Object.entries(TECH_PATTERNS).forEach(([tech, patterns]) => {
    // ファイル名チェック
    if (patterns.some((pattern) => pattern.test(filename))) {
      detected.add(tech);
      return;
    }

    // ファイル内容チェック（より厳密に）
    const matchedPatterns = patterns.filter((pattern) => pattern.test(content));
    if (matchedPatterns.length > 0) {
      // 複数のパターンにマッチした場合のみ確実とみなす
      if (
        matchedPatterns.length >= 2 ||
        tech === 'typescript' ||
        tech === 'react'
      ) {
        detected.add(tech);
      }
    }
  });

  return Array.from(detected);
}

// ステージングされたファイルを取得
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only', {
      encoding: 'utf8',
    });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('ステージングされたファイルの取得に失敗:', error.message);
    return [];
  }
}

// ファイル内容を取得
function getFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`ファイル ${filePath} の読み取りに失敗:`, error.message);
    return '';
  }
}

// 技術タグを生成（改善版）
function generateTechTags() {
  const stagedFiles = getStagedFiles();
  const allTechnologies = new Set();
  const techCount = new Map(); // 技術の使用頻度をカウント

  stagedFiles.forEach((file) => {
    const content = getFileContent(file);
    const technologies = detectTechnologiesFromContent(content, file);

    technologies.forEach((tech) => {
      allTechnologies.add(tech);
      techCount.set(tech, (techCount.get(tech) || 0) + 1);
    });
  });

  // 使用頻度が高い技術のみを返す（誤検出を減らす）
  const frequentTechnologies = Array.from(allTechnologies).filter((tech) => {
    const count = techCount.get(tech);
    return count >= 1; // 最低1回は検出された技術のみ
  });

  return frequentTechnologies;
}

// メイン処理
function main() {
  const technologies = generateTechTags();

  if (technologies.length > 0) {
    const techTags = technologies.map((tech) => `[${tech}]`).join(' ');
    console.log(techTags); // 技術タグのみを出力（Git hookで使用）
  } else {
    console.log(''); // 空文字を出力
  }
}

// スクリプトが直接実行された場合
if (require.main === module) {
  main();
}

module.exports = {
  detectTechnologiesFromContent,
  generateTechTags,
};
