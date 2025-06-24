import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // スレッドとそのメッセージ、要約を取得
    const thread = await prisma.thread.findUnique({
      where: { id: 1 },
      include: {
        messages: true,
        summaries: true
      }
    });

    console.log('=== スレッドの詳細 ===');
    console.log(`タイトル: ${thread?.title}`);
    console.log('\n=== メッセージ一覧 ===');
    thread?.messages.forEach(message => {
      console.log(`${message.role}: ${message.content}`);
    });
    console.log('\n=== 要約 ===');
    thread?.summaries.forEach(summary => {
      console.log(`タイトル: ${summary.title}`);
      console.log(`内容: ${summary.content}`);
      console.log(`ステータス: ${summary.status}`);
    });
  } catch (error) {
    console.error('エラーが発生しました:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 