import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto, MessageRole } from './dto/create-message.dto';

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
}
