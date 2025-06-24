import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [PrismaModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
