// GitHub API連携クライアント

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  topics: string[];
  private: boolean;
  fork: boolean;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
  repository: {
    name: string;
    full_name: string;
  };
}

export interface TechUsageData {
  technology: string;
  usageCount: number;
  lastUsed: string;
  repositories: string[];
  commits: number;
}

export interface GitHubStats {
  totalRepositories: number;
  totalStars: number;
  totalCommits: number;
  totalFollowers: number;
  languages: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  recentActivity: number;
  contributionData: Array<{
    date: string;
    count: number;
  }>;
}

class GitHubAPI {
  private baseUrl = 'https://api.github.com';
  private token: string;

  constructor(token?: string) {
    this.token = token || process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';
  }

  private async request<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          'GitHub API rate limit exceeded. Please try again later.',
        );
      }
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  }

  // ユーザー情報を取得
  async getUser(username: string): Promise<GitHubUser> {
    return this.request<GitHubUser>(`/users/${username}`);
  }

  // ユーザーのリポジトリ一覧を取得
  async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    return this.request<GitHubRepository[]>(
      `/users/${username}/repos?sort=updated&per_page=100`,
    );
  }

  // リポジトリのコミット履歴を取得
  async getRepositoryCommits(
    username: string,
    repo: string,
  ): Promise<GitHubCommit[]> {
    return this.request<GitHubCommit[]>(
      `/repos/${username}/${repo}/commits?per_page=100`,
    );
  }

  // ユーザーの全コミット履歴を取得（最近のもの）
  async getUserCommits(username: string): Promise<GitHubCommit[]> {
    const repos = await this.getUserRepositories(username);
    const allCommits: GitHubCommit[] = [];

    // 最近更新されたリポジトリから順に取得
    const recentRepos = repos
      .filter((repo) => !repo.fork && !repo.private)
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .slice(0, 10); // 最近の10リポジトリのみ

    for (const repo of recentRepos) {
      try {
        const commits = await this.getRepositoryCommits(username, repo.name);
        allCommits.push(
          ...commits.map((commit) => ({
            ...commit,
            repository: { name: repo.name, full_name: repo.full_name },
          })),
        );
      } catch (error) {
        console.warn(`Failed to fetch commits for ${repo.name}:`, error);
      }
    }

    return allCommits;
  }

  // GitHub統計データを取得
  async getGitHubStats(username: string): Promise<GitHubStats> {
    try {
      const [user, repos] = await Promise.all([
        this.getUser(username),
        this.getUserRepositories(username),
      ]);

      // 言語使用率を計算
      const languageStats = new Map<string, { count: number; stars: number }>();
      let totalStars = 0;

      repos.forEach((repo) => {
        if (repo.language) {
          const current = languageStats.get(repo.language) || {
            count: 0,
            stars: 0,
          };
          current.count += 1;
          current.stars += repo.stargazers_count;
          languageStats.set(repo.language, current);
        }
        totalStars += repo.stargazers_count;
      });

      // 言語の色を定義
      const languageColors: Record<string, string> = {
        TypeScript: '#3178C6',
        JavaScript: '#F7DF1E',
        Python: '#3776AB',
        Java: '#ED8B00',
        'C++': '#00599C',
        C: '#555555',
        Go: '#00ADD8',
        Rust: '#DEA584',
        PHP: '#777BB4',
        Ruby: '#CC342D',
        Swift: '#FA7343',
        Kotlin: '#F18E33',
        HTML: '#E34F26',
        CSS: '#1572B6',
        Vue: '#4FC08D',
        React: '#61DAFB',
        Angular: '#DD0031',
        Svelte: '#FF3E00',
      };

      const languages = Array.from(languageStats.entries())
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 10)
        .map(([name, stats]) => ({
          name,
          percentage: Math.round((stats.count / repos.length) * 100),
          color: languageColors[name] || '#6B7280',
        }));

      // 最近の活動を計算（過去30日間のコミット数）
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentCommits = await this.getUserCommits(username);
      const recentActivity = recentCommits.filter(
        (commit) => new Date(commit.commit.author.date) > thirtyDaysAgo,
      ).length;

      // コントリビューションカレンダーデータ（簡易版）
      const contributionData = Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        return {
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 10), // 実際のデータに置き換える
        };
      });

      return {
        totalRepositories: repos.length,
        totalStars,
        totalCommits: recentCommits.length,
        totalFollowers: user.followers,
        languages,
        recentActivity,
        contributionData,
      };
    } catch (error) {
      console.error('GitHub統計の取得に失敗:', error);
      throw error;
    }
  }

  // コミットメッセージから技術タグを抽出
  extractTechnologiesFromCommits(commits: GitHubCommit[]): TechUsageData[] {
    const techUsage = new Map<
      string,
      {
        usageCount: number;
        lastUsed: string;
        repositories: Set<string>;
        commits: number;
      }
    >();

    // 技術タグのパターン
    const techPatterns = [
      'react',
      'typescript',
      'javascript',
      'nextjs',
      'tailwindcss',
      'nodejs',
      'python',
      'nestjs',
      'prisma',
      'docker',
      'aws',
      'vue',
      'angular',
      'svelte',
      'express',
      'fastapi',
      'go',
      'rust',
      'java',
      'kotlin',
      'swift',
      'flutter',
      'react-native',
    ];

    commits.forEach((commit) => {
      const message = commit.commit.message.toLowerCase();
      const commitDate = commit.commit.author.date;

      techPatterns.forEach((tech) => {
        if (message.includes(`[${tech}]`)) {
          const current = techUsage.get(tech) || {
            usageCount: 0,
            lastUsed: '',
            repositories: new Set<string>(),
            commits: 0,
          };

          current.usageCount++;
          current.commits++;
          current.repositories.add(commit.repository.name);

          if (!current.lastUsed || commitDate > current.lastUsed) {
            current.lastUsed = commitDate;
          }

          techUsage.set(tech, current);
        }
      });
    });

    return Array.from(techUsage.entries()).map(([technology, data]) => ({
      technology,
      usageCount: data.usageCount,
      lastUsed: data.lastUsed,
      repositories: Array.from(data.repositories),
      commits: data.commits,
    }));
  }

  // リポジトリの技術スタックを分析
  async analyzeRepositoryTechnologies(
    username: string,
    repoName: string,
  ): Promise<string[]> {
    try {
      // package.jsonを取得して技術スタックを分析
      const packageJson = await this.request<any>(
        `/repos/${username}/${repoName}/contents/package.json`,
      );

      if (packageJson.content) {
        const content = Buffer.from(packageJson.content, 'base64').toString();
        const packageData = JSON.parse(content);

        const technologies: string[] = [];

        // 依存関係から技術を推測
        const dependencies = {
          ...packageData.dependencies,
          ...packageData.devDependencies,
        };

        Object.keys(dependencies).forEach((dep) => {
          if (dep.includes('react')) technologies.push('react');
          if (dep.includes('next')) technologies.push('nextjs');
          if (dep.includes('typescript')) technologies.push('typescript');
          if (dep.includes('tailwind')) technologies.push('tailwindcss');
          if (dep.includes('nestjs')) technologies.push('nestjs');
          if (dep.includes('prisma')) technologies.push('prisma');
          if (dep.includes('express')) technologies.push('express');
          if (dep.includes('vue')) technologies.push('vue');
          if (dep.includes('angular')) technologies.push('angular');
        });

        return technologies;
      }
    } catch (error) {
      console.warn(`Failed to analyze technologies for ${repoName}:`, error);
    }

    return [];
  }

  // ユーザーの技術使用状況を総合分析
  async analyzeUserTechnologies(username: string): Promise<{
    commitTechnologies: TechUsageData[];
    repositoryTechnologies: Map<string, string[]>;
    totalRepositories: number;
    totalCommits: number;
    mostUsedTechnologies: string[];
  }> {
    const [user, repos, commits] = await Promise.all([
      this.getUser(username),
      this.getUserRepositories(username),
      this.getUserCommits(username),
    ]);

    // コミットから技術使用を分析
    const commitTechnologies = this.extractTechnologiesFromCommits(commits);

    // リポジトリの技術スタックを分析
    const repositoryTechnologies = new Map<string, string[]>();
    for (const repo of repos.slice(0, 5)) {
      // 最近の5リポジトリのみ
      const techs = await this.analyzeRepositoryTechnologies(
        username,
        repo.name,
      );
      repositoryTechnologies.set(repo.name, techs);
    }

    // 最も使用されている技術を抽出
    const mostUsedTechnologies = commitTechnologies
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 10)
      .map((tech) => tech.technology);

    return {
      commitTechnologies,
      repositoryTechnologies,
      totalRepositories: repos.length,
      totalCommits: commits.length,
      mostUsedTechnologies,
    };
  }
}

// シングルトンインスタンス
export const githubAPI = new GitHubAPI();

// 使用例
export async function getUserTechProfile(username: string) {
  try {
    const analysis = await githubAPI.analyzeUserTechnologies(username);

    console.log(`📊 ${username} の技術プロファイル:`);
    console.log(`- リポジトリ数: ${analysis.totalRepositories}`);
    console.log(`- コミット数: ${analysis.totalCommits}`);
    console.log(`- 主要技術: ${analysis.mostUsedTechnologies.join(', ')}`);

    return analysis;
  } catch (error) {
    console.error('技術プロファイルの取得に失敗:', error);
    throw error;
  }
}

// GitHub統計を取得する関数
export async function getGitHubStats(username: string): Promise<GitHubStats> {
  try {
    return await githubAPI.getGitHubStats(username);
  } catch (error) {
    console.error('GitHub統計の取得に失敗:', error);
    // フォールバック用のモックデータを返す
    return {
      totalRepositories: 45,
      totalStars: 128,
      totalCommits: 1250,
      totalFollowers: 89,
      languages: [
        { name: 'TypeScript', percentage: 35, color: '#3178C6' },
        { name: 'JavaScript', percentage: 25, color: '#F7DF1E' },
        { name: 'Python', percentage: 20, color: '#3776AB' },
        { name: 'CSS', percentage: 10, color: '#1572B6' },
        { name: 'HTML', percentage: 10, color: '#E34F26' },
      ],
      recentActivity: 15,
      contributionData: Array.from({ length: 365 }, (_, i) => ({
        date: new Date(2024, 0, 1 + i).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10),
      })),
    };
  }
}
