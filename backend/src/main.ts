import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS設定を追加
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3004',
    ],
    credentials: true,
  });

  // グローバルバリデーションパイプを設定
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTOに定義されていないプロパティを除去
      forbidNonWhitelisted: true, // 未定義プロパティがあるとエラー
      transform: true, // 型変換を自動実行
    }),
  );

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
