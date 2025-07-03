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
            createdAt: Date;
            content: string;
            role: string;
            threadId: number;
        }[];
        summaries: {
            id: number;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            threadId: number;
            status: string;
            notionUrl: string | null;
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
        createdAt: Date;
        content: string;
        threadId: number;
    }>;
    generateAIResponse(threadId: number): Promise<void>;
    findMessages(threadId: number): Promise<{
        role: MessageRole;
        id: number;
        createdAt: Date;
        content: string;
        threadId: number;
    }[]>;
    findMessage(threadId: number, messageId: number): Promise<{
        role: MessageRole;
        id: number;
        createdAt: Date;
        content: string;
        threadId: number;
    }>;
    createSummary(threadId: number, createSummaryDto: CreateSummaryDto): Promise<{
        status: SummaryStatus;
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        threadId: number;
        notionUrl: string | null;
    }>;
    findSummaries(threadId: number): Promise<{
        status: SummaryStatus;
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        threadId: number;
        notionUrl: string | null;
    }[]>;
    findSummary(threadId: number, summaryId: number): Promise<{
        status: SummaryStatus;
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        threadId: number;
        notionUrl: string | null;
    }>;
    updateSummary(threadId: number, summaryId: number, updateSummaryDto: UpdateSummaryDto): Promise<{
        status: SummaryStatus;
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        threadId: number;
        notionUrl: string | null;
    }>;
}
