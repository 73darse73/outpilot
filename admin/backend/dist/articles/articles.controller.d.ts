import { ArticlesService } from './articles.service';
import { ArticleDto } from './article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(): Promise<ArticleDto[]>;
    findOne(id: number): Promise<ArticleDto>;
    postToQiita(id: string, body: {
        tags?: {
            name: string;
        }[];
    }): Promise<{
        message: string;
        url: string;
    }>;
}
