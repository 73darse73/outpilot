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

// 記事関連のAPI
export const articlesApi = {
  // 記事一覧を取得
  getAll: (): Promise<Article[]> => {
    return apiRequest<Article[]>('/articles');
  },

  // 記事詳細を取得
  getById: (id: number): Promise<Article> => {
    return apiRequest<Article>(`/articles/${id}`);
  },
};

// スライド関連のAPI
export const slidesApi = {
  // スライド一覧を取得
  getAll: (): Promise<Slide[]> => {
    return apiRequest<Slide[]>('/slides');
  },

  // スライド詳細を取得
  getById: (id: number): Promise<Slide> => {
    return apiRequest<Slide>(`/slides/${id}`);
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
