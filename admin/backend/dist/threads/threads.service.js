"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const openai_service_1 = require("../openai/openai.service");
const create_message_dto_1 = require("./dto/create-message.dto");
let ThreadsService = class ThreadsService {
    prisma;
    openaiService;
    constructor(prisma, openaiService) {
        this.prisma = prisma;
        this.openaiService = openaiService;
    }
    async create(title) {
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
    async findOne(id) {
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
    async update(id, title) {
        return this.prisma.thread.update({
            where: { id },
            data: { title },
        });
    }
    async remove(id) {
        return this.prisma.thread.delete({
            where: { id },
        });
    }
    async createMessage(threadId, createMessageDto) {
        const thread = await this.prisma.thread.findUnique({
            where: { id: threadId },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const message = await this.prisma.message.create({
            data: {
                ...createMessageDto,
                threadId,
            },
        });
        if (createMessageDto.role === create_message_dto_1.MessageRole.USER) {
            await this.generateAIResponse(threadId);
        }
        return {
            ...message,
            role: message.role,
        };
    }
    async generateAIResponse(threadId) {
        try {
            const messages = await this.prisma.message.findMany({
                where: { threadId },
                orderBy: { createdAt: 'asc' },
            });
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
            const openaiMessages = [
                { role: 'system', content: systemPrompt },
                ...messages.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            ];
            const aiResponse = await this.openaiService.generateResponse(openaiMessages);
            await this.prisma.message.create({
                data: {
                    content: aiResponse,
                    role: 'assistant',
                    threadId,
                },
            });
        }
        catch (error) {
            console.error('AI応答生成エラー:', error);
        }
    }
    async findMessages(threadId) {
        const thread = await this.prisma.thread.findUnique({
            where: { id: threadId },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const messages = await this.prisma.message.findMany({
            where: { threadId },
            orderBy: { createdAt: 'asc' },
        });
        return messages.map((message) => ({
            ...message,
            role: message.role,
        }));
    }
    async findMessage(threadId, messageId) {
        const message = await this.prisma.message.findFirst({
            where: {
                id: messageId,
                threadId,
            },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${messageId} not found in thread ${threadId}`);
        }
        return {
            ...message,
            role: message.role,
        };
    }
    async createSummary(threadId, createSummaryDto) {
        const thread = await this.prisma.thread.findUnique({
            where: { id: threadId },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const summary = await this.prisma.summary.create({
            data: {
                ...createSummaryDto,
                threadId,
            },
        });
        return {
            ...summary,
            status: summary.status,
        };
    }
    async findSummaries(threadId) {
        const thread = await this.prisma.thread.findUnique({
            where: { id: threadId },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const summaries = await this.prisma.summary.findMany({
            where: { threadId },
            orderBy: { createdAt: 'desc' },
        });
        return summaries.map((summary) => ({
            ...summary,
            status: summary.status,
        }));
    }
    async findSummary(threadId, summaryId) {
        const summary = await this.prisma.summary.findFirst({
            where: {
                id: summaryId,
                threadId,
            },
        });
        if (!summary) {
            throw new common_1.NotFoundException(`Summary with ID ${summaryId} not found in thread ${threadId}`);
        }
        return {
            ...summary,
            status: summary.status,
        };
    }
    async updateSummary(threadId, summaryId, updateSummaryDto) {
        const thread = await this.prisma.thread.findUnique({
            where: { id: threadId },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const summary = await this.prisma.summary.findFirst({
            where: {
                id: summaryId,
                threadId,
            },
        });
        if (!summary) {
            throw new common_1.NotFoundException(`Summary with ID ${summaryId} not found in thread ${threadId}`);
        }
        const updatedSummary = await this.prisma.summary.update({
            where: {
                id: summaryId,
            },
            data: updateSummaryDto,
        });
        return {
            ...updatedSummary,
            status: updatedSummary.status,
        };
    }
    async generateTitle(content) {
        try {
            const prompt = `以下の内容に基づいて、簡潔で分かりやすいタイトルを生成してください。タイトルは20文字以内で、日本語でお願いします。

内容: ${content}

タイトル:`;
            const title = await this.openaiService.generateResponse([
                { role: 'user', content: prompt },
            ]);
            return title.trim().replace(/\n/g, '');
        }
        catch (error) {
            console.error('タイトル生成エラー:', error);
            return '新規チャット';
        }
    }
    async generateArticle(threadId) {
        try {
            console.log(`記事生成開始: threadId=${threadId}`);
            const thread = await this.findOne(threadId);
            if (!thread) {
                throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
            }
            console.log(`スレッド取得完了: ${thread.title}`);
            const messages = thread.messages.map((msg) => msg.content);
            console.log(`メッセージ数: ${messages.length}`);
            console.log('OpenAI API呼び出し開始');
            const articleContent = await this.openaiService.generateArticleFromThread(messages);
            console.log('OpenAI API呼び出し完了');
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
            }
            else {
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
        }
        catch (error) {
            console.error('記事生成エラー詳細:', error);
            console.error('エラースタック:', error.stack);
            console.error('エラーメッセージ:', error.message);
            throw error;
        }
    }
    async generateSlide(threadId) {
        const thread = await this.findOne(threadId);
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const messages = thread.messages.map((msg) => msg.content);
        const slideContent = await this.openaiService.generateSlideFromThread(messages);
        const slide = await this.prisma.slide.create({
            data: {
                title: thread.title || '無題のスライド',
                content: slideContent,
                threadId: threadId,
            },
        });
        return slide;
    }
    async findArticles(threadId) {
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
    async findSlides(threadId) {
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
    async updateArticle(articleId, updateData) {
        const article = await this.prisma.article.findUnique({
            where: { id: articleId },
        });
        if (!article) {
            throw new common_1.NotFoundException(`Article with ID ${articleId} not found`);
        }
        return this.prisma.article.update({
            where: { id: articleId },
            data: updateData,
        });
    }
    async updateSlide(slideId, updateData) {
        const slide = await this.prisma.slide.findUnique({
            where: { id: slideId },
        });
        if (!slide) {
            throw new common_1.NotFoundException(`Slide with ID ${slideId} not found`);
        }
        return this.prisma.slide.update({
            where: { id: slideId },
            data: updateData,
        });
    }
};
exports.ThreadsService = ThreadsService;
exports.ThreadsService = ThreadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openai_service_1.OpenAIService])
], ThreadsService);
//# sourceMappingURL=threads.service.js.map