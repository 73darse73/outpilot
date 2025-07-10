import { PrismaService } from '../prisma/prisma.service';
import { OpenAIService } from '../openai/openai.service';
import { CreateSlideDto } from './create-slide.dto';
import { UpdateSlideDto } from './update-slide.dto';
import { SlideDto, SlideDetailDto } from './slide.dto';
export declare class SlidesService {
    private prisma;
    private openaiService;
    constructor(prisma: PrismaService, openaiService: OpenAIService);
    create(createSlideDto: CreateSlideDto): Promise<SlideDto>;
    findAll(): Promise<SlideDto[]>;
    findOne(id: number): Promise<SlideDetailDto>;
    update(id: number, updateSlideDto: UpdateSlideDto): Promise<SlideDto>;
    remove(id: number): Promise<SlideDto>;
    generateFromThread(threadId: number): Promise<SlideDto>;
    findByThread(threadId: number): Promise<SlideDto[]>;
}
