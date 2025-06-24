import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {} 