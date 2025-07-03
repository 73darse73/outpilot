import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
export declare class OpenAIService {
    private openai;
    constructor();
    generateResponse(messages: ChatCompletionMessageParam[]): Promise<string>;
    generateSummary(content: string): Promise<string>;
    generateSlide(content: string): Promise<string>;
}
