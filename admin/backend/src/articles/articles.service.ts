import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleDto } from './article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ArticleDto[]> {
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

  async findOne(id: number): Promise<ArticleDto | null> {
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
}
