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
exports.SlidesController = void 0;
const common_1 = require("@nestjs/common");
const slides_service_1 = require("./slides.service");
const create_slide_dto_1 = require("./create-slide.dto");
const update_slide_dto_1 = require("./update-slide.dto");
let SlidesController = class SlidesController {
    slidesService;
    constructor(slidesService) {
        this.slidesService = slidesService;
    }
    async create(createSlideDto) {
        return this.slidesService.create(createSlideDto);
    }
    async findAll() {
        return this.slidesService.findAll();
    }
    async findOne(id) {
        return this.slidesService.findOne(id);
    }
    async update(id, updateSlideDto) {
        return this.slidesService.update(id, updateSlideDto);
    }
    async remove(id) {
        return this.slidesService.remove(id);
    }
    async generateFromThread(threadId) {
        return this.slidesService.generateFromThread(threadId);
    }
    async findByThread(threadId) {
        return this.slidesService.findByThread(threadId);
    }
};
exports.SlidesController = SlidesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_slide_dto_1.CreateSlideDto]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_slide_dto_1.UpdateSlideDto]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('generate-from-thread/:threadId'),
    __param(0, (0, common_1.Param)('threadId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "generateFromThread", null);
__decorate([
    (0, common_1.Get)('thread/:threadId'),
    __param(0, (0, common_1.Param)('threadId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "findByThread", null);
exports.SlidesController = SlidesController = __decorate([
    (0, common_1.Controller)('slides'),
    __metadata("design:paramtypes", [slides_service_1.SlidesService])
], SlidesController);
//# sourceMappingURL=slides.controller.js.map