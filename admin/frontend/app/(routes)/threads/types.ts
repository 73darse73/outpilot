export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageType = 'text' | 'code' | 'markdown';

export interface Message {
  id: number;
  role: MessageRole;
  type: MessageType;
  content: string;
  language?: string; // コードブロックの言語指定（optional）
}
