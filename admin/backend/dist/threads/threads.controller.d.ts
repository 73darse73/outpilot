import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { ThreadDto, ThreadDetailDto } from './dto/thread.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { SummaryDto } from './dto/summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { SlidesService } from '../slides/slides.service';
import { SlideDto } from '../slides/slide.dto';
export declare class ThreadsController {
    private readonly threadsService;
    private readonly slidesService;
    constructor(threadsService: ThreadsService, slidesService: SlidesService);
    create(createThreadDto: CreateThreadDto): Promise<ThreadDto>;
    findAll(): Promise<ThreadDto[]>;
    findOne(id: number): Promise<ThreadDetailDto>;
    update(id: number, createThreadDto: CreateThreadDto): Promise<ThreadDto>;
    remove(id: number): Promise<ThreadDto>;
    createMessage(threadId: number, createMessageDto: CreateMessageDto): Promise<MessageDto>;
    findMessages(threadId: number): Promise<MessageDto[]>;
    findMessage(threadId: number, messageId: number): Promise<MessageDto>;
    createSummary(threadId: number, createSummaryDto: CreateSummaryDto): Promise<SummaryDto>;
    generateAIResponse(threadId: number): Promise<{
        message: string;
    }>;
    generateTitle(body: {
        content: string;
    }): Promise<{
        title: string;
    }>;
    generateSlide(threadId: number): Promise<SlideDto>;
    findSummaries(threadId: number): Promise<SummaryDto[]>;
    updateSummary(threadId: number, summaryId: number, updateSummaryDto: UpdateSummaryDto): Promise<SummaryDto>;
}
