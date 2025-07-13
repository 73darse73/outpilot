import { PrismaService } from '../prisma/prisma.service';
import { ArticleDto } from './article.dto';
export declare class ArticlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ArticleDto[]>;
    findOne(id: number): Promise<ArticleDto | null>;
}
