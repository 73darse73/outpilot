"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function main() {
    try {
        const thread = await prisma.thread.findUnique({
            where: { id: 1 },
            include: {
                messages: true,
                summaries: true,
            },
        });
        console.log('=== スレッドの詳細 ===');
        console.log(`タイトル: ${thread?.title}`);
        console.log('\n=== メッセージ一覧 ===');
        thread?.messages.forEach((message) => {
            console.log(`${message.role}: ${message.content}`);
        });
        console.log('\n=== 要約 ===');
        thread?.summaries.forEach((summary) => {
            console.log(`タイトル: ${summary.title}`);
            console.log(`内容: ${summary.content}`);
            console.log(`ステータス: ${summary.status}`);
        });
    }
    catch (error) {
        console.error('エラーが発生しました:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=test-prisma.js.map