import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { SlidesService } from './slides.service';
import { CreateSlideDto } from './create-slide.dto';
import { UpdateSlideDto } from './update-slide.dto';
import { SlideDto, SlideDetailDto } from './slide.dto';

@Controller('slides')
export class SlidesController {
  constructor(private readonly slidesService: SlidesService) {}

  @Post()
  async create(@Body() createSlideDto: CreateSlideDto): Promise<SlideDto> {
    return this.slidesService.create(createSlideDto);
  }

  @Get()
  async findAll(): Promise<SlideDto[]> {
    return this.slidesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SlideDetailDto> {
    return this.slidesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSlideDto: UpdateSlideDto,
  ): Promise<SlideDto> {
    return this.slidesService.update(id, updateSlideDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<SlideDto> {
    return this.slidesService.remove(id);
  }

  @Post('generate-from-thread/:threadId')
  async generateFromThread(
    @Param('threadId', ParseIntPipe) threadId: number,
  ): Promise<SlideDto> {
    return this.slidesService.generateFromThread(threadId);
  }

  @Get('thread/:threadId')
  async findByThread(
    @Param('threadId', ParseIntPipe) threadId: number,
  ): Promise<SlideDto[]> {
    return this.slidesService.findByThread(threadId);
  }
}
