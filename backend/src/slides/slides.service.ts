import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAIService } from '../openai/openai.service';
import { CreateSlideDto } from './create-slide.dto';
import { UpdateSlideDto } from './update-slide.dto';
import { SlideDto, SlideDetailDto } from './slide.dto';

@Injectable()
export class SlidesService {
  constructor(
    private prisma: PrismaService,
    private openaiService: OpenAIService,
  ) {}

  async create(createSlideDto: CreateSlideDto): Promise<SlideDto> {
    return this.prisma.slide.create({
      data: createSlideDto,
    });
  }

  async findAll(): Promise<SlideDto[]> {
    return this.prisma.slide.findMany({
      include: {
        thread: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<SlideDetailDto> {
    const slide = await this.prisma.slide.findUnique({
      where: { id },
      include: {
        thread: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!slide) {
      throw new NotFoundException(`Slide with ID ${id} not found`);
    }

    return slide;
  }

  async update(id: number, updateSlideDto: UpdateSlideDto): Promise<SlideDto> {
    const slide = await this.prisma.slide.update({
      where: { id },
      data: updateSlideDto,
    });

    if (!slide) {
      throw new NotFoundException(`Slide with ID ${id} not found`);
    }

    return slide;
  }

  async remove(id: number): Promise<SlideDto> {
    try {
      return await this.prisma.slide.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Slide with ID ${id} not found`);
    }
  }

  async generateFromThread(threadId: number): Promise<SlideDto> {
    // スレッドの存在確認
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    // スレッドの全メッセージを結合
    const conversation = thread.messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n\n');

    // OpenAIでスライドを生成
    const slideContent = await this.openaiService.generateSlide(conversation);

    // スライドタイトルを生成（スレッドタイトルをベースに）
    const title = thread.title || `スライド ${new Date().toLocaleDateString()}`;

    // スライドを保存
    return this.prisma.slide.create({
      data: {
        title,
        content: slideContent,
        threadId,
      },
    });
  }

  async findByThread(threadId: number): Promise<SlideDto[]> {
    // スレッドの存在確認
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    return this.prisma.slide.findMany({
      where: { threadId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
