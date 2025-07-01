import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ThreadsController } from './threads.controller';
import { OpenAIModule } from '../openai/openai.module';
import { SlidesModule } from '../slides/slides.module';

@Module({
  imports: [PrismaModule, OpenAIModule, SlidesModule],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
