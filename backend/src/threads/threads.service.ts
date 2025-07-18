import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAIService } from '../openai/openai.service';
import { CreateMessageDto, MessageRole } from './dto/create-message.dto';
import { CreateSummaryDto, SummaryStatus } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

@Injectable()
export class ThreadsService {
  constructor(
    private prisma: PrismaService,
    private openaiService: OpenAIService,
  ) {}

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

    // ユーザーメッセージの場合、AI応答を生成
    if (createMessageDto.role === MessageRole.USER) {
      await this.generateAIResponse(threadId);
    }

    return {
      ...message,
      role: message.role as MessageRole,
    };
  }

  // AI応答を生成するメソッド
  async generateAIResponse(threadId: number) {
    try {
      // スレッドの全メッセージを取得
      const messages = await this.prisma.message.findMany({
        where: { threadId },
        orderBy: { createdAt: 'asc' },
      });

      // OpenAI API用のメッセージ形式に変換
      const openaiMessages: ChatCompletionMessageParam[] = messages.map(
        (msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        }),
      );

      // AI応答を生成
      const aiResponse =
        await this.openaiService.generateResponse(openaiMessages);

      // AI応答をデータベースに保存
      await this.prisma.message.create({
        data: {
          content: aiResponse,
          role: 'assistant',
          threadId,
        },
      });
    } catch (error) {
      console.error('AI応答生成エラー:', error);
      // エラーが発生してもユーザーメッセージの保存は成功させる
    }
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

  // タイトルを生成するメソッド
  async generateTitle(content: string): Promise<string> {
    try {
      const prompt = `以下の内容に基づいて、簡潔で分かりやすいタイトルを生成してください。タイトルは20文字以内で、日本語でお願いします。

内容: ${content}

タイトル:`;

      const title = await this.openaiService.generateResponse([
        { role: 'user', content: prompt },
      ]);

      // 余分な改行や空白を削除
      return title.trim().replace(/\n/g, '');
    } catch (error) {
      console.error('タイトル生成エラー:', error);
      return '新規チャット';
    }
  }
}
