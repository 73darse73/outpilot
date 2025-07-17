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

      // システムプロンプト
      const systemPrompt = `あなたは親切で丁寧な日本語アシスタントです。

ユーザーからの質問に対して、初心者でも理解できるように、構造的でわかりやすく説明してください。
文章は自然で親しみやすいトーンにし、以下のルールに従ってください：

【トーンと口調】
- 優しく丁寧な日本語を使ってください
- 語尾は柔らかく、フレンドリーでありながらプロフェッショナルさも保ってください
- 必要に応じて「〜だよ」「〜してね」「〜しておくといいよ」など自然な会話調も使用可

【内容の構成】
- 導入で全体像やポイントを簡潔に説明してください
- 箇条書き、見出し（#, ##）を活用して、情報を整理してください
- 例やユースケースがあれば積極的に示してください
- 誤解されやすい点や注意点があれば補足してください

【Markdownスタイル】
- 適宜 **太字** を使って強調してください
- ✅、⚠️、💡などの絵文字を使って視認性を高めてください
- コード例は \`\`\` で囲んで、言語指定（例：ts, js, html）もつけてください

【禁止事項】
- 箇条書きが必要な場面で文章の羅列だけにしないでください
- 必要以上に固い表現や専門用語ばかり使わないでください（専門用語には説明をつけてください）

以上をふまえて、ユーザーの要望に的確に応えてください。`;

      // OpenAI API用のメッセージ形式に変換（システムプロンプトを最初に追加）
      const openaiMessages: ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ];

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

  // 記事生成機能
  async generateArticle(threadId: number) {
    try {
      console.log(`記事生成開始: threadId=${threadId}`);

      const thread = await this.findOne(threadId);
      if (!thread) {
        throw new NotFoundException(`Thread with ID ${threadId} not found`);
      }

      console.log(`スレッド取得完了: ${thread.title}`);

      // スレッドのメッセージ内容を取得
      const messages = thread.messages.map((msg) => msg.content);
      console.log(`メッセージ数: ${messages.length}`);

      // OpenAIサービスを使用して記事を生成
      console.log('OpenAI API呼び出し開始');
      const articleContent =
        await this.openaiService.generateArticleFromThread(messages);
      console.log('OpenAI API呼び出し完了');

      // 記事をデータベースに保存
      console.log('データベース保存開始');
      const existing = await this.prisma.article.findFirst({
        where: { threadId: threadId, status: 'draft' },
      });
      let article;
      if (existing) {
        article = await this.prisma.article.update({
          where: { id: existing.id },
          data: {
            title: thread.title || '無題の記事',
            content: articleContent,
            status: 'draft',
          },
        });
      } else {
        article = await this.prisma.article.create({
          data: {
            title: thread.title || '無題の記事',
            content: articleContent,
            status: 'draft',
            threadId: threadId,
          },
        });
      }
      console.log('データベース保存完了');

      return article;
    } catch (error) {
      console.error('記事生成エラー詳細:', error);
      console.error('エラースタック:', error.stack);
      console.error('エラーメッセージ:', error.message);
      throw error;
    }
  }

  // スライド生成機能
  async generateSlide(threadId: number) {
    const thread = await this.findOne(threadId);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }

    // スレッドのメッセージ内容を取得
    const messages = thread.messages.map((msg) => msg.content);

    // OpenAIサービスを使用してスライドを生成
    const slideContent =
      await this.openaiService.generateSlideFromThread(messages);

    // スライドをデータベースに保存
    const slide = await this.prisma.slide.create({
      data: {
        title: thread.title || '無題のスライド',
        content: slideContent,
        threadId: threadId,
      },
    });

    return slide;
  }

  // 記事一覧取得
  async findArticles(threadId?: number) {
    const where = threadId ? { threadId } : {};
    return this.prisma.article.findMany({
      where,
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

  // スライド一覧取得
  async findSlides(threadId?: number) {
    const where = threadId ? { threadId } : {};
    return this.prisma.slide.findMany({
      where,
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

  // 記事更新
  async updateArticle(
    articleId: number,
    updateData: { title?: string; content?: string; status?: string },
  ) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${articleId} not found`);
    }

    return this.prisma.article.update({
      where: { id: articleId },
      data: updateData,
    });
  }

  // スライド更新
  async updateSlide(
    slideId: number,
    updateData: { title?: string; content?: string },
  ) {
    const slide = await this.prisma.slide.findUnique({
      where: { id: slideId },
    });

    if (!slide) {
      throw new NotFoundException(`Slide with ID ${slideId} not found`);
    }

    return this.prisma.slide.update({
      where: { id: slideId },
      data: updateData,
    });
  }
}
