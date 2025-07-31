const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0,
    );
  }
}

import { mockArticles, mockSlides } from './mockData';

// 記事関連のAPI
export const articlesApi = {
  // 記事一覧を取得
  getAll: async (): Promise<Article[]> => {
    try {
      return await apiRequest<Article[]>('/articles');
    } catch (error) {
      console.warn('API接続に失敗しました。モックデータを使用します:', error);
      return mockArticles;
    }
  },

  // 記事詳細を取得
  getById: async (id: number): Promise<Article> => {
    try {
      return await apiRequest<Article>(`/articles/${id}`);
    } catch (error) {
      console.warn('API接続に失敗しました。モックデータを使用します:', error);
      const mockArticle = mockArticles.find((article) => article.id === id);
      if (!mockArticle) {
        throw new ApiError('記事が見つかりません', 404);
      }
      return mockArticle;
    }
  },
};

// スライド関連のAPI
export const slidesApi = {
  // スライド一覧を取得
  getAll: async (): Promise<Slide[]> => {
    try {
      return await apiRequest<Slide[]>('/slides');
    } catch (error) {
      console.warn('API接続に失敗しました。モックデータを使用します:', error);
      return mockSlides;
    }
  },

  // スライド詳細を取得
  getById: async (id: number): Promise<Slide> => {
    try {
      return await apiRequest<Slide>(`/slides/${id}`);
    } catch (error) {
      console.warn('API接続に失敗しました。モックデータを使用します:', error);
      const mockSlide = mockSlides.find((slide) => slide.id === id);
      if (!mockSlide) {
        throw new ApiError('スライドが見つかりません', 404);
      }
      return mockSlide;
    }
  },
};

// 型定義
export interface Article {
  id: number;
  title: string;
  content: string;
  status: string;
  qiitaUrl?: string;
  threadId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Slide {
  id: number;
  title: string;
  content: string;
  threadId?: number;
  createdAt: string;
  updatedAt: string;
}

export { ApiError };
