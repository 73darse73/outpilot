// バックエンドのDTOと一致する型定義
export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface Thread {
  id: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    messages: number;
    summaries: number;
  };
}

export interface ThreadDetail extends Thread {
  messages: Message[];
  summaries: Summary[];
}

export interface Message {
  id: number;
  content: string;
  role: MessageRole;
  threadId: number;
  createdAt: Date;
}

export interface CreateMessage {
  content: string;
  role: MessageRole;
}

export interface CreateThread {
  title: string;
}

export interface Summary {
  id: number;
  title: string;
  content: string;
  threadId: number;
  status: string;
  notionUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// APIレスポンスの型
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
