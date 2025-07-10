# Library Utilities

アプリケーション全体で使用されるユーティリティ、API クライアント、型定義を管理するディレクトリです。

## 📁 ディレクトリ構成

### `api/` - API 関連

- `client.ts` - API クライアント設定
- `types.ts` - API 型定義

## 🔌 API クライアント

### `client.ts`

統一された API クライアントの設定

```typescript
// APIクライアントの基本設定
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// 共通のfetch設定
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response;
};

// APIクライアントオブジェクト
export const apiClient = {
  threads: {
    getAll: () => fetchWithAuth('/threads'),
    getById: (id: string) => fetchWithAuth(`/threads/${id}`),
    create: (data: CreateThreadDto) =>
      fetchWithAuth('/threads', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateThreadDto) =>
      fetchWithAuth(`/threads/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchWithAuth(`/threads/${id}`, { method: 'DELETE' }),
  },

  messages: {
    getByThreadId: (threadId: string) =>
      fetchWithAuth(`/threads/${threadId}/messages`),
    create: (threadId: string, data: CreateMessageDto) =>
      fetchWithAuth(`/threads/${threadId}/messages`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchWithAuth(`/messages/${id}`, { method: 'DELETE' }),
  },

  slides: {
    getAll: () => fetchWithAuth('/slides'),
    getById: (id: string) => fetchWithAuth(`/slides/${id}`),
    create: (data: CreateSlideDto) =>
      fetchWithAuth('/slides', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateSlideDto) =>
      fetchWithAuth(`/slides/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchWithAuth(`/slides/${id}`, { method: 'DELETE' }),
  },

  summaries: {
    getByThreadId: (threadId: string) =>
      fetchWithAuth(`/threads/${threadId}/summaries`),
    create: (threadId: string, data: CreateSummaryDto) =>
      fetchWithAuth(`/threads/${threadId}/summaries`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateSummaryDto) =>
      fetchWithAuth(`/summaries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchWithAuth(`/summaries/${id}`, { method: 'DELETE' }),
  },
};
```

## 📝 型定義

### `types.ts`

API レスポンスとリクエストの型定義

```typescript
// 基本型
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// スレッド関連
export interface Thread extends BaseEntity {
  title: string;
  messages?: Message[];
  summaries?: Summary[];
}

export interface CreateThreadDto {
  title: string;
}

export interface UpdateThreadDto {
  title?: string;
}

// メッセージ関連
export interface Message extends BaseEntity {
  threadId: string;
  content: string;
  role: 'user' | 'assistant';
}

export interface CreateMessageDto {
  content: string;
  role: 'user' | 'assistant';
}

// 要約関連
export interface Summary extends BaseEntity {
  threadId: string;
  content: string;
  type: 'article' | 'slide';
}

export interface CreateSummaryDto {
  content: string;
  type: 'article' | 'slide';
}

export interface UpdateSummaryDto {
  content?: string;
  type?: 'article' | 'slide';
}

// スライド関連
export interface Slide extends BaseEntity {
  threadId: string;
  title: string;
  content: string;
}

export interface CreateSlideDto {
  threadId: string;
  title: string;
  content: string;
}

export interface UpdateSlideDto {
  title?: string;
  content?: string;
}

// APIレスポンス型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// エラー型
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
```

## 🔧 ユーティリティ関数

### 日付フォーマット

```typescript
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - d.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return '今';
  if (diffInMinutes < 60) return `${diffInMinutes}分前`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`;
  return `${Math.floor(diffInMinutes / 1440)}日前`;
};
```

### 文字列ユーティリティ

```typescript
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
```

### バリデーション

```typescript
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
```

## 🎨 定数

### アプリケーション設定

```typescript
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Outpilot',
  version: '1.0.0',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  maxMessageLength: 1000,
  maxThreadTitleLength: 100,
} as const;
```

### メッセージタイプ

```typescript
export const MESSAGE_TYPES = {
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;

export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];
```

### 要約タイプ

```typescript
export const SUMMARY_TYPES = {
  ARTICLE: 'article',
  SLIDE: 'slide',
} as const;

export type SummaryType = (typeof SUMMARY_TYPES)[keyof typeof SUMMARY_TYPES];
```

## 🔍 エラーハンドリング

### エラーレスポンス処理

```typescript
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '予期しないエラーが発生しました';
};
```

### リトライ機能

```typescript
export const retryApiCall = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> => {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};
```

## 🧪 テスト

### API クライアントのテスト

```typescript
import { apiClient } from './client';

describe('API Client', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch threads successfully', async () => {
    const mockResponse = { data: [] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await apiClient.threads.getAll();
    expect(response).toBeDefined();
  });
});
```

## 📚 参考資料

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Library Utilities** - アプリケーション共通のユーティリティ
