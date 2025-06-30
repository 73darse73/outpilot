import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ThreadsController } from './threads.controller';
import { OpenAIModule } from '../openai/openai.module';

@Module({
  imports: [PrismaModule, OpenAIModule],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
