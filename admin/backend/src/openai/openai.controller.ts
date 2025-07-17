import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  /**
   * タイトル・本文からQiita用タグを自動生成
   * @param body { title: string, body: string }
   * @returns { tags: { name: string }[] }
   */
  @Post('generate-tags')
  async generateTags(@Body() body: { title: string; body: string }) {
    const tags = await this.openaiService.generateTags(body.title, body.body);
    return { tags };
  }
}
