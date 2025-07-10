import {
  type Thread,
  type ThreadDetail,
  type Message,
  type CreateMessage,
  type CreateThread,
} from './types';

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

// スレッド関連のAPI
export const threadsApi = {
  // スレッド一覧を取得
  getAll: (): Promise<Thread[]> => {
    return apiRequest<Thread[]>('/threads');
  },

  // スレッド詳細を取得
  getById: (id: number): Promise<ThreadDetail> => {
    return apiRequest<ThreadDetail>(`/threads/${id}`);
  },

  // スレッドを作成
  create: (data: CreateThread): Promise<Thread> => {
    return apiRequest<Thread>('/threads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // スレッドを更新
  update: (id: number, data: CreateThread): Promise<Thread> => {
    return apiRequest<Thread>(`/threads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // スレッドを削除
  delete: (id: number): Promise<Thread> => {
    return apiRequest<Thread>(`/threads/${id}`, {
      method: 'DELETE',
    });
  },

  // メッセージ一覧を取得
  getMessages: (threadId: number): Promise<Message[]> => {
    return apiRequest<Message[]>(`/threads/${threadId}/messages`);
  },

  // メッセージを作成
  createMessage: (threadId: number, data: CreateMessage): Promise<Message> => {
    return apiRequest<Message>(`/threads/${threadId}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // AI応答を生成
  generateAIResponse: (threadId: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/threads/${threadId}/ai-response`, {
      method: 'POST',
    });
  },

  // スライドを生成
  generateSlide: (threadId: number): Promise<any> => {
    return apiRequest<any>(`/threads/${threadId}/generate-slide`, {
      method: 'POST',
    });
  },

  // タイトルを生成
  generateTitle: (content: string): Promise<{ title: string }> => {
    return apiRequest<{ title: string }>('/threads/generate-title', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },
};

export { ApiError };
