import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
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

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly slidesService: SlidesService,
  ) {}

  @Post()
  async create(@Body() createThreadDto: CreateThreadDto): Promise<ThreadDto> {
    return this.threadsService.create(createThreadDto.title);
  }

  @Get()
  async findAll(): Promise<ThreadDto[]> {
    return this.threadsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ThreadDetailDto> {
    const thread = await this.threadsService.findOne(id);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    return thread;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createThreadDto: CreateThreadDto,
  ): Promise<ThreadDto> {
    const thread = await this.threadsService.update(id, createThreadDto.title);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    return thread;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ThreadDto> {
    try {
      return await this.threadsService.remove(id);
    } catch {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
  }

  @Post(':id/messages')
  async createMessage(
    @Param('id', ParseIntPipe) threadId: number,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageDto> {
    return this.threadsService.createMessage(threadId, createMessageDto);
  }

  @Get(':id/messages')
  async findMessages(
    @Param('id', ParseIntPipe) threadId: number,
  ): Promise<MessageDto[]> {
    return this.threadsService.findMessages(threadId);
  }

  @Get(':threadId/messages/:messageId')
  async findMessage(
    @Param('threadId', ParseIntPipe) threadId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ): Promise<MessageDto> {
    return this.threadsService.findMessage(threadId, messageId);
  }

  @Post(':id/summaries')
  async createSummary(
    @Param('id', ParseIntPipe) threadId: number,
    @Body() createSummaryDto: CreateSummaryDto,
  ): Promise<SummaryDto> {
    return this.threadsService.createSummary(threadId, createSummaryDto);
  }

  @Post(':id/ai-response')
  async generateAIResponse(
    @Param('id', ParseIntPipe) threadId: number,
  ): Promise<{ message: string }> {
    await this.threadsService.generateAIResponse(threadId);
    return { message: 'AI応答を生成しました' };
  }

  @Post('generate-title')
  async generateTitle(
    @Body() body: { content: string },
  ): Promise<{ title: string }> {
    const title = await this.threadsService.generateTitle(body.content);
    return { title };
  }

  @Post(':id/generate-slide')
  async generateSlideFromThread(
    @Param('id', ParseIntPipe) threadId: number,
  ): Promise<SlideDto> {
    return this.slidesService.generateFromThread(threadId);
  }

  @Get(':id/summaries')
  async findSummaries(
    @Param('id', ParseIntPipe) threadId: number,
  ): Promise<SummaryDto[]> {
    return this.threadsService.findSummaries(threadId);
  }

  @Patch(':threadId/summaries/:summaryId')
  async updateSummary(
    @Param('threadId', ParseIntPipe) threadId: number,
    @Param('summaryId', ParseIntPipe) summaryId: number,
    @Body() updateSummaryDto: UpdateSummaryDto,
  ): Promise<SummaryDto> {
    return this.threadsService.updateSummary(
      threadId,
      summaryId,
      updateSummaryDto,
    );
  }

  // 記事生成
  @Post(':id/articles')
  async generateArticle(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.generateArticle(id);
  }

  // スライド生成
  @Post(':id/slides')
  async generateSlide(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.generateSlide(id);
  }

  // 記事一覧取得
  @Get('articles')
  async findArticles() {
    return this.threadsService.findArticles();
  }

  // スレッドの記事一覧取得
  @Get(':id/articles')
  async findThreadArticles(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.findArticles(id);
  }

  // スライド一覧取得
  @Get('slides')
  async findSlides() {
    return this.threadsService.findSlides();
  }

  // スレッドのスライド一覧取得
  @Get(':id/slides')
  async findThreadSlides(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.findSlides(id);
  }

  // 記事更新
  @Patch('articles/:articleId')
  async updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() updateData: { title?: string; content?: string; status?: string },
  ) {
    return this.threadsService.updateArticle(articleId, updateData);
  }

  // スライド更新
  @Patch('slides/:slideId')
  async updateSlide(
    @Param('slideId', ParseIntPipe) slideId: number,
    @Body() updateData: { title?: string; content?: string },
  ) {
    return this.threadsService.updateSlide(slideId, updateData);
  }
}
