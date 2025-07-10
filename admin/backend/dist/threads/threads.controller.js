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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsController = void 0;
const common_1 = require("@nestjs/common");
const threads_service_1 = require("./threads.service");
const create_thread_dto_1 = require("./dto/create-thread.dto");
const create_message_dto_1 = require("./dto/create-message.dto");
const create_summary_dto_1 = require("./dto/create-summary.dto");
const update_summary_dto_1 = require("./dto/update-summary.dto");
const slides_service_1 = require("../slides/slides.service");
let ThreadsController = class ThreadsController {
    threadsService;
    slidesService;
    constructor(threadsService, slidesService) {
        this.threadsService = threadsService;
        this.slidesService = slidesService;
    }
    async create(createThreadDto) {
        return this.threadsService.create(createThreadDto.title);
    }
    async findAll() {
        return this.threadsService.findAll();
    }
    async findOne(id) {
        const thread = await this.threadsService.findOne(id);
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${id} not found`);
        }
        return thread;
    }
    async update(id, createThreadDto) {
        const thread = await this.threadsService.update(id, createThreadDto.title);
        if (!thread) {
            throw new common_1.NotFoundException(`Thread with ID ${id} not found`);
        }
        return thread;
    }
    async remove(id) {
        try {
            return await this.threadsService.remove(id);
        }
        catch {
            throw new common_1.NotFoundException(`Thread with ID ${id} not found`);
        }
    }
    async createMessage(threadId, createMessageDto) {
        return this.threadsService.createMessage(threadId, createMessageDto);
    }
    async findMessages(threadId) {
        return this.threadsService.findMessages(threadId);
    }
    async findMessage(threadId, messageId) {
        return this.threadsService.findMessage(threadId, messageId);
    }
    async createSummary(threadId, createSummaryDto) {
        return this.threadsService.createSummary(threadId, createSummaryDto);
    }
    async generateAIResponse(threadId) {
        await this.threadsService.generateAIResponse(threadId);
        return { message: 'AI応答を生成しました' };
    }
    async generateTitle(body) {
        const title = await this.threadsService.generateTitle(body.content);
        return { title };
    }
    async generateSlide(threadId) {
        return this.slidesService.generateFromThread(threadId);
    }
    async findSummaries(threadId) {
        return this.threadsService.findSummaries(threadId);
    }
    async updateSummary(threadId, summaryId, updateSummaryDto) {
        return this.threadsService.updateSummary(threadId, summaryId, updateSummaryDto);
    }
};
exports.ThreadsController = ThreadsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_thread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_thread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)(':id/messages'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findMessages", null);
__decorate([
    (0, common_1.Get)(':threadId/messages/:messageId'),
    __param(0, (0, common_1.Param)('threadId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('messageId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findMessage", null);
__decorate([
    (0, common_1.Post)(':id/summaries'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_summary_dto_1.CreateSummaryDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "createSummary", null);
__decorate([
    (0, common_1.Post)(':id/ai-response'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "generateAIResponse", null);
__decorate([
    (0, common_1.Post)('generate-title'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "generateTitle", null);
__decorate([
    (0, common_1.Post)(':id/generate-slide'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "generateSlide", null);
__decorate([
    (0, common_1.Get)(':id/summaries'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findSummaries", null);
__decorate([
    (0, common_1.Patch)(':threadId/summaries/:summaryId'),
    __param(0, (0, common_1.Param)('threadId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('summaryId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_summary_dto_1.UpdateSummaryDto]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "updateSummary", null);
exports.ThreadsController = ThreadsController = __decorate([
    (0, common_1.Controller)('threads'),
    __metadata("design:paramtypes", [threads_service_1.ThreadsService,
        slides_service_1.SlidesService])
], ThreadsController);
//# sourceMappingURL=threads.controller.js.map