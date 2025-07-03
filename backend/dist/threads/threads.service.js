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
            const openaiMessages = messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));
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
};
exports.ThreadsService = ThreadsService;
exports.ThreadsService = ThreadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openai_service_1.OpenAIService])
], ThreadsService);
//# sourceMappingURL=threads.service.js.map