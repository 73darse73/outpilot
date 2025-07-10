export class ThreadDto {
  id: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    messages: number;
    summaries: number;
  };
}

export class ThreadDetailDto extends ThreadDto {
  messages: {
    id: number;
    content: string;
    role: string;
    threadId: number;
    createdAt: Date;
  }[];
  summaries: {
    id: number;
    title: string;
    content: string;
    threadId: number;
    status: string;
    notionUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
