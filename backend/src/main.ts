import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // グローバルバリデーションパイプを設定
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTOに定義されていないプロパティを除去
      forbidNonWhitelisted: true, // 未定義プロパティがあるとエラー
      transform: true, // 型変換を自動実行
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
