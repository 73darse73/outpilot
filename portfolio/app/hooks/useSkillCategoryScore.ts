import { useMemo } from 'react';

// ダミーデータ型
interface GithubRepo {
  name: string;
  language: string;
  topics: string[];
  commits: number;
  stars: number;
}

interface QiitaArticle {
  title: string;
  tags: string[];
  likes: number;
  views: number;
}

interface CategoryScore {
  name: string;
  github: {
    commits: number;
    stars: number;
  };
  qiita: {
    posts: number;
    lgtms: number;
    views: number;
  };
  total: number;
}

// 仮のダミーデータ
const githubRepos: GithubRepo[] = [
  {
    name: 'outpilot',
    language: 'TypeScript',
    topics: ['Next.js', 'OpenAI'],
    commits: 120,
    stars: 10,
  },
  {
    name: 'portfolio',
    language: 'TypeScript',
    topics: ['Tailwind CSS', 'Framer Motion'],
    commits: 80,
    stars: 5,
  },
  {
    name: 'python-sample',
    language: 'Python',
    topics: ['DataScience'],
    commits: 30,
    stars: 2,
  },
];

const qiitaArticles: QiitaArticle[] = [
  {
    title: 'TypeScriptで型安全なAPI設計',
    tags: ['TypeScript', 'API'],
    likes: 15,
    views: 1200,
  },
  {
    title: 'Next.jsでポートフォリオを作る',
    tags: ['Next.js', 'React', 'TypeScript'],
    likes: 10,
    views: 800,
  },
  {
    title: 'Pythonでデータ分析',
    tags: ['Python', 'DataScience'],
    likes: 8,
    views: 600,
  },
];

export function useSkillCategoryScore() {
  return useMemo(() => {
    // 1. GitHubカテゴリ集計
    const githubCategoryMap: Record<
      string,
      { commits: number; stars: number }
    > = {};
    githubRepos.forEach((repo) => {
      // 主要言語
      if (!githubCategoryMap[repo.language]) {
        githubCategoryMap[repo.language] = { commits: 0, stars: 0 };
      }
      githubCategoryMap[repo.language].commits += repo.commits;
      githubCategoryMap[repo.language].stars += repo.stars;
      // トピック
      repo.topics.forEach((topic) => {
        if (!githubCategoryMap[topic]) {
          githubCategoryMap[topic] = { commits: 0, stars: 0 };
        }
        githubCategoryMap[topic].commits += repo.commits;
        githubCategoryMap[topic].stars += repo.stars;
      });
    });

    // 2. Qiitaカテゴリ集計
    const qiitaCategoryMap: Record<
      string,
      { posts: number; lgtms: number; views: number }
    > = {};
    qiitaArticles.forEach((article) => {
      article.tags.forEach((tag) => {
        if (!qiitaCategoryMap[tag]) {
          qiitaCategoryMap[tag] = { posts: 0, lgtms: 0, views: 0 };
        }
        qiitaCategoryMap[tag].posts += 1;
        qiitaCategoryMap[tag].lgtms += article.likes;
        qiitaCategoryMap[tag].views += article.views;
      });
    });

    // 3. カテゴリ名でマージして合計スコア計算
    const allCategories = new Set([
      ...Object.keys(githubCategoryMap),
      ...Object.keys(qiitaCategoryMap),
    ]);
    const categoryScores: CategoryScore[] = [];
    for (const name of allCategories) {
      const g = githubCategoryMap[name] || { commits: 0, stars: 0 };
      const q = qiitaCategoryMap[name] || { posts: 0, lgtms: 0, views: 0 };
      const total =
        g.commits * 1 +
        g.stars * 2 +
        q.posts * 3 +
        q.lgtms * 2 +
        q.views * 0.01;
      categoryScores.push({ name, github: g, qiita: q, total });
    }
    // スコア降順でソート
    categoryScores.sort((a, b) => b.total - a.total);
    return categoryScores;
  }, []);
}
