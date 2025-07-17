import { PrismaService } from '../prisma/prisma.service';
import { OpenAIService } from '../openai/openai.service';
import { CreateMessageDto, MessageRole } from './dto/create-message.dto';
import { CreateSummaryDto, SummaryStatus } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
export declare class ThreadsService {
    private prisma;
    private openaiService;
    constructor(prisma: PrismaService, openaiService: OpenAIService);
    create(title: string): Promise<{
        id: number;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        _count: {
            messages: number;
            summaries: number;
        };
    } & {
        id: number;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<({
        messages: {
            id: number;
            content: string;
            role: string;
            createdAt: Date;
            threadId: number;
        }[];
        summaries: {
            id: number;
            content: string;
            title: string;
            status: string;
            notionUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            threadId: number;
        }[];
    } & {
        id: number;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: number, title: string): Promise<{
        id: number;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createMessage(threadId: number, createMessageDto: CreateMessageDto): Promise<{
        role: MessageRole;
        id: number;
        content: string;
        createdAt: Date;
        threadId: number;
    }>;
    generateAIResponse(threadId: number): Promise<void>;
    findMessages(threadId: number): Promise<{
        role: MessageRole;
        id: number;
        content: string;
        createdAt: Date;
        threadId: number;
    }[]>;
    findMessage(threadId: number, messageId: number): Promise<{
        role: MessageRole;
        id: number;
        content: string;
        createdAt: Date;
        threadId: number;
    }>;
    createSummary(threadId: number, createSummaryDto: CreateSummaryDto): Promise<{
        status: SummaryStatus;
        id: number;
        content: string;
        title: string;
        notionUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        threadId: number;
    }>;
    findSummaries(threadId: number): Promise<{
        status: SummaryStatus;
        id: number;
        content: string;
        title: string;
        notionUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        threadId: number;
    }[]>;
    findSummary(threadId: number, summaryId: number): Promise<{
        status: SummaryStatus;
        id: number;
        content: string;
        title: string;
        notionUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        threadId: number;
    }>;
    updateSummary(threadId: number, summaryId: number, updateSummaryDto: UpdateSummaryDto): Promise<{
        status: SummaryStatus;
        id: number;
        content: string;
        title: string;
        notionUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        threadId: number;
    }>;
    generateTitle(content: string): Promise<string>;
    generateArticle(threadId: number): Promise<{
        id: number;
        content: string;
        title: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        threadId: number | null;
        qiitaUrl: string | null;
    }>;
    generateSlide(threadId: number): Promise<{
        id: number;
        content: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        threadId: number | null;
    }>;
    findArticles(threadId?: number): Promise<({
        thread: {
            id: number;
            title: string | null;
        } | null;
    } & {
        id: number;
        content: string;
        title: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        threadId: number | null;
        qiitaUrl: string | null;
    })[]>;
    findSlides(threadId?: number): Promise<({
        thread: {
            id: number;
            title: string | null;
        } | null;
    } & {
        id: number;
        content: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        threadId: number | null;
    })[]>;
    updateArticle(articleId: number, updateData: {
        title?: string;
        content?: string;
        status?: string;
    }): Promise<{
        id: number;
        content: string;
        title: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        threadId: number | null;
        qiitaUrl: string | null;
    }>;
    updateSlide(slideId: number, updateData: {
        title?: string;
        content?: string;
    }): Promise<{
        id: number;
        content: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        threadId: number | null;
    }>;
}
