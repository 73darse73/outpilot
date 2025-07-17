import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
export declare class OpenAIService {
    private openai;
    constructor();
    private getOutputFocusedSystemPrompt;
    generateResponse(messages: ChatCompletionMessageParam[]): Promise<string>;
    private detectOutputRequest;
    generateArticleFromThread(threadMessages: string[]): Promise<string>;
    generateSlideFromThread(threadMessages: string[]): Promise<string>;
    generateSummary(content: string): Promise<string>;
    generateSlide(content: string): Promise<string>;
    generateTags(title: string, body: string): Promise<{
        name: string;
    }[]>;
}
