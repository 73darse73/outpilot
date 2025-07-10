import { SlidesService } from './slides.service';
import { CreateSlideDto } from './create-slide.dto';
import { UpdateSlideDto } from './update-slide.dto';
import { SlideDto, SlideDetailDto } from './slide.dto';
export declare class SlidesController {
    private readonly slidesService;
    constructor(slidesService: SlidesService);
    create(createSlideDto: CreateSlideDto): Promise<SlideDto>;
    findAll(): Promise<SlideDto[]>;
    findOne(id: number): Promise<SlideDetailDto>;
    update(id: number, updateSlideDto: UpdateSlideDto): Promise<SlideDto>;
    remove(id: number): Promise<SlideDto>;
    generateFromThread(threadId: number): Promise<SlideDto>;
    findByThread(threadId: number): Promise<SlideDto[]>;
}
