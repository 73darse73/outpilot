export declare enum MessageRole {
    USER = "user",
    ASSISTANT = "assistant"
}
export declare class CreateMessageDto {
    content: string;
    role: MessageRole;
}
