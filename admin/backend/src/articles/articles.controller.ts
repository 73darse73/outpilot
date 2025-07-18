import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<ArticleDto[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleDto> {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  @Post(':id/qiita')
  async postToQiita(
    @Param('id') id: string,
    @Body() body: { tags?: { name: string }[] },
  ) {
    const articleId = Number(id);
    if (isNaN(articleId)) throw new NotFoundException('Invalid article id');
    return this.articlesService.postToQiita(articleId, body.tags || []);
  }
}
