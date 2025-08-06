'use client';

import { useState, useEffect } from 'react';
import { getGitHubStats, GitHubStats } from '../../lib/api/github';

interface UseGitHubDataReturn {
  data: GitHubStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGitHubData(username: string): UseGitHubDataReturn {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!username) {
      setError('GitHubユーザー名が指定されていません');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const stats = await getGitHubStats(username);
      setData(stats);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'GitHubデータの取得に失敗しました';
      setError(errorMessage);
      console.error('GitHubデータ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// GitHub統計データを分析する関数
export function analyzeGitHubStats(stats: GitHubStats) {
  const totalRepos = stats.totalRepositories;
  const totalStars = stats.totalStars;
  const totalCommits = stats.totalCommits;
  const totalFollowers = stats.totalFollowers;

  // アクティビティレベルを計算
  const activityLevel = (() => {
    if (stats.recentActivity >= 20) return 'high';
    if (stats.recentActivity >= 10) return 'medium';
    return 'low';
  })();

  // 人気度を計算
  const popularityScore = (() => {
    const starRatio = totalStars / Math.max(totalRepos, 1);
    const followerRatio = totalFollowers / Math.max(totalRepos, 1);
    return (starRatio + followerRatio) / 2;
  })();

  // 主要技術を抽出
  const topLanguages = stats.languages.slice(0, 5);

  return {
    activityLevel,
    popularityScore,
    topLanguages,
    metrics: {
      totalRepos,
      totalStars,
      totalCommits,
      totalFollowers,
      recentActivity: stats.recentActivity,
    },
  };
}
