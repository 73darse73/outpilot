import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    console.log('🔄 データベースに接続中...');
    await this.$connect();
    console.log('✅ データベース接続完了！');
  }

  async onModuleDestroy() {
    console.log('🔄 データベース接続を切断中...');
    await this.$disconnect();
    console.log('✅ データベース接続切断完了！');
  }
}
