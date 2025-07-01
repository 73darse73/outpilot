export class SlideDto {
  id: number;
  title: string;
  content: string;
  threadId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export class SlideDetailDto extends SlideDto {
  thread?: {
    id: number;
    title: string | null;
  } | null;
}
