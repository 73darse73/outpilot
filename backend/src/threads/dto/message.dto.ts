import { MessageRole } from './create-message.dto';

export class MessageDto {
  id: number;
  content: string;
  role: MessageRole;
  threadId: number;
  createdAt: Date;
}
