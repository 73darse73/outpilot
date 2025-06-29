import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto, MessageRole } from './dto/create-message.dto';
import { CreateSummaryDto, SummaryStatus } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';

@Injectable()
export class ThreadsService {
  constructor(private prisma: PrismaService) {}

  async create(title: string) {
    return this.prisma.thread.create({
      data: { title },
    });
  }

  async findAll() {
    return this.prisma.thread.findMany({
      include: {
        _count: {
          select: {
            messages: true,
            summaries: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.thread.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        summaries: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async update(id: number, title: string) {
    return this.prisma.thread.update({
      where: { id },
      data: { title },
    });
  }

  async remove(id: number) {
    return this.prisma.thread.delete({
      where: { id },
    });
  }

  async createMessage(threadId: number, createMessageDto: CreateMessageDto) {
    // スレッドの存在確認
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    const message = await this.prisma.message.create({
      data: {
        ...createMessageDto,
        threadId,
      },
    });

    return {
      ...message,
      role: message.role as MessageRole,
    };
  }

  async findMessages(threadId: number) {
    // スレッドの存在確認
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    const messages = await this.prisma.message.findMany({
      where: { threadId },
      orderBy: { createdAt: 'asc' },
    });

    return messages.map((message) => ({
      ...message,
      role: message.role as MessageRole,
    }));
  }

  async findMessage(threadId: number, messageId: number) {
    const message = await this.prisma.message.findFirst({
      where: {
        id: messageId,
        threadId,
      },
    });

    if (!message) {
      throw new NotFoundException(
        `Message with ID ${messageId} not found in thread ${threadId}`,
      );
    }

    return {
      ...message,
      role: message.role as MessageRole,
    };
  }

  // サマリーを作成
  async createSummary(threadId: number, createSummaryDto: CreateSummaryDto) {
    // スレッドの存在確認
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    // サマリーを作成
    const summary = await this.prisma.summary.create({
      data: {
        ...createSummaryDto,
        threadId,
      },
    });

    return {
      ...summary,
      status: summary.status as SummaryStatus,
    };
  }

  // スレッドのサマリー一覧を取得
  async findSummaries(threadId: number) {
    // スレッドの存在確認
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    // サマリー一覧を取得
    const summaries = await this.prisma.summary.findMany({
      where: { threadId },
      orderBy: { createdAt: 'desc' }, // 新しい順
    });

    return summaries.map((summary) => ({
      ...summary,
      status: summary.status as SummaryStatus,
    }));
  }

  // 特定のサマリーを取得
  async findSummary(threadId: number, summaryId: number) {
    const summary = await this.prisma.summary.findFirst({
      where: {
        id: summaryId,
        threadId,
      },
    });

    if (!summary) {
      throw new NotFoundException(
        `Summary with ID ${summaryId} not found in thread ${threadId}`,
      );
    }

    return {
      ...summary,
      status: summary.status as SummaryStatus,
    };
  }

  // サマリーを更新
  async updateSummary(
    threadId: number,
    summaryId: number,
    updateSummaryDto: UpdateSummaryDto,
  ) {
    // スレッドの存在確認
    const thread = await this.prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    // サマリーの存在確認
    const summary = await this.prisma.summary.findFirst({
      where: {
        id: summaryId,
        threadId,
      },
    });

    if (!summary) {
      throw new NotFoundException(
        `Summary with ID ${summaryId} not found in thread ${threadId}`,
      );
    }

    // サマリーを更新
    const updatedSummary = await this.prisma.summary.update({
      where: {
        id: summaryId,
      },
      data: updateSummaryDto,
    });

    return {
      ...updatedSummary,
      status: updatedSummary.status as SummaryStatus,
    };
  }
}
