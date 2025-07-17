import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ThreadsModule } from './threads/threads.module';
import { SlidesModule } from './slides/slides.module';
import { ArticlesModule } from './articles/articles.module';
import { OpenAIModule } from './openai/openai.module';
import { OpenAIController } from './openai/openai.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ThreadsModule,
    SlidesModule,
    ArticlesModule,
    OpenAIModule,
  ],
  controllers: [AppController, OpenAIController],
  providers: [AppService],
})
export class AppModule {}
