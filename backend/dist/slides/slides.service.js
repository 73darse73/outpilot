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
exports.SlidesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const openai_service_1 = require("../openai/openai.service");
let SlidesService = class SlidesService {
    prisma;
    openaiService;
    constructor(prisma, openaiService) {
        this.prisma = prisma;
        this.openaiService = openaiService;
    }
    async create(createSlideDto) {
        return this.prisma.slide.create({
            data: createSlideDto,
        });
    }
    async findAll() {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Slide with ID ${id} not found`);
        }
        return slide;
    }
    async update(id, updateSlideDto) {
        const slide = await this.prisma.slide.update({
            where: { id },
            data: updateSlideDto,
        });
        if (!slide) {
            throw new common_1.NotFoundException(`Slide with ID ${id} not found`);
        }
        return slide;
    }
    async remove(id) {
        try {
            return await this.prisma.slide.delete({
                where: { id },
            });
        }
        catch {
            throw new common_1.NotFoundException(`Slide with ID ${id} not found`);
        }
    }
    async generateFromThread(threadId) {
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
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const conversation = thread.messages
            .map((msg) => `${msg.role}: ${msg.content}`)
            .join('\n\n');
        const slideContent = await this.openaiService.generateSlide(conversation);
        const title = thread.title || `スライド ${new Date().toLocaleDateString()}`;
        return this.prisma.slide.create({
            data: {
                title,
                content: slideContent,
                threadId,
            },
        });
    }
    async findByThread(threadId) {
        const thread = await this.prisma.thread.findUnique({
            where: { id: threadId },
        });
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${threadId} not found`);
        }
        return this.prisma.slide.findMany({
            where: { threadId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.SlidesService = SlidesService;
exports.SlidesService = SlidesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openai_service_1.OpenAIService])
], SlidesService);
//# sourceMappingURL=slides.service.js.map