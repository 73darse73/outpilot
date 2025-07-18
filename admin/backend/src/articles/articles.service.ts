import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleDto } from './article.dto';
import axios, { AxiosResponse } from 'axios';

interface QiitaPostResponse {
  url: string;
  [key: string]: any;
}

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

  async postToQiita(articleId: number, tags: { name: string }[] = []) {
    // 記事をDBから取得
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) throw new Error('記事が見つかりません');
    if (article.status === 'published' && article.qiitaUrl) {
      return { message: 'すでにQiitaに投稿済み', url: article.qiitaUrl };
    }

    // Qiita API用データ整形
    const qiitaToken = process.env.QIITA_TOKEN;
    if (!qiitaToken) throw new Error('Qiita APIトークンが設定されていません');

    // Qiita API仕様に合わせてtagsを{name, versions: []}形式に変換
    const qiitaTags = (tags || []).map((tag) => ({
      name: tag.name,
      versions: [],
    }));
    const body = {
      title: article.title,
      body: article.content,
      tags: qiitaTags,
      private: false,
    };

    // Qiita APIに投稿
    const res: AxiosResponse<QiitaPostResponse> = await axios.post(
      'https://qiita.com/api/v2/items',
      body,
      {
        headers: {
          Authorization: `Bearer ${qiitaToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const qiitaUrl = res.data.url;

    // DBを更新（status, qiitaUrl）
    await this.prisma.article.update({
      where: { id: articleId },
      data: { status: 'published', qiitaUrl },
    });

    return { message: 'Qiitaに投稿しました', url: qiitaUrl };
  }
}
