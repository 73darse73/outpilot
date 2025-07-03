import { MessageRole } from './create-message.dto';
export declare class MessageDto {
    id: number;
    content: string;
    role: MessageRole;
    threadId: number;
    createdAt: Date;
}
