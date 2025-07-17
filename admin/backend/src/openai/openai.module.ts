import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenAIController } from './openai.controller';

@Module({
  providers: [OpenAIService],
  exports: [OpenAIService],
  controllers: [OpenAIController],
})
export class OpenAIModule {}
