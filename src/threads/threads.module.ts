import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ThreadsController } from './threads.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {} 