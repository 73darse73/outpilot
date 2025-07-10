import { SummaryStatus } from './create-summary.dto';

export class SummaryDto {
  id: number;
  title: string;
  content: string;
  threadId: number;
  status: SummaryStatus;
  notionUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
