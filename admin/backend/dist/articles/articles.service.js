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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("axios");
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const articles = await this.prisma.article.findMany({
            where: {
                status: 'published',
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return articles.map((article) => ({
            id: article.id,
            title: article.title,
            content: article.content,
            status: article.status,
            qiitaUrl: article.qiitaUrl || undefined,
            threadId: article.threadId || undefined,
            createdAt: article.createdAt.toISOString(),
            updatedAt: article.updatedAt.toISOString(),
        }));
    }
    async findOne(id) {
        const article = await this.prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            return null;
        }
        return {
            id: article.id,
            title: article.title,
            content: article.content,
            status: article.status,
            qiitaUrl: article.qiitaUrl || undefined,
            threadId: article.threadId || undefined,
            createdAt: article.createdAt.toISOString(),
            updatedAt: article.updatedAt.toISOString(),
        };
    }
    async postToQiita(articleId) {
        const article = await this.prisma.article.findUnique({
            where: { id: articleId },
        });
        if (!article)
            throw new Error('記事が見つかりません');
        if (article.status === 'published' && article.qiitaUrl) {
            return { message: 'すでにQiitaに投稿済み', url: article.qiitaUrl };
        }
        const qiitaToken = process.env.QIITA_TOKEN;
        if (!qiitaToken)
            throw new Error('Qiita APIトークンが設定されていません');
        const body = {
            title: article.title,
            body: article.content,
            tags: [],
            private: false,
        };
        const res = await axios_1.default.post('https://qiita.com/api/v2/items', body, {
            headers: {
                Authorization: `Bearer ${qiitaToken}`,
                'Content-Type': 'application/json',
            },
        });
        const qiitaUrl = res.data.url;
        await this.prisma.article.update({
            where: { id: articleId },
            data: { status: 'published', qiitaUrl },
        });
        return { message: 'Qiitaに投稿しました', url: qiitaUrl };
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map