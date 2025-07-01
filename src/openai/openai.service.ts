import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(messages: ChatCompletionMessageParam[]) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      return (
        completion.choices[0]?.message?.content || '応答を生成できませんでした'
      );
    } catch (error) {
      console.error('OpenAI API エラー:', error);
      throw new Error('AI応答の生成に失敗しました');
    }
  }

  async generateSummary(content: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [
          {
            role: 'system',
            content:
              'あなたは優秀な要約作成者です。与えられた内容を簡潔で分かりやすく要約してください。',
          },
          {
            role: 'user',
            content: `以下の内容を要約してください：\n\n${content}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.3,
      });

      return (
        completion.choices[0]?.message?.content || '要約を生成できませんでした'
      );
    } catch (error) {
      console.error('OpenAI API エラー:', error);
      throw new Error('要約の生成に失敗しました');
    }
  }

  async generateSlide(content: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [
          {
            role: 'system',
            content: `あなたは優秀なプレゼンテーション作成者です。与えられた内容をMarpフォーマットのスライドに変換してください。

以下のルールに従ってください：
1. 最初に「---」で区切られたタイトルスライドを作成
2. 内容を論理的に分割して複数のスライドに分ける
3. 各スライドは「---」で区切る
4. 見出しには「#」を使用
5. 箇条書きには「-」を使用
6. コードブロックには「\`\`\`」を使用
7. 強調には「**」を使用
8. 適切なMarpテーマを指定（例：theme: default）

例：
---
# タイトル
## サブタイトル
---

# 目次
- 項目1
- 項目2
- 項目3

---

# 内容1
- ポイント1
- ポイント2

\`\`\`javascript
console.log('Hello World');
\`\`\`

---`,
          },
          {
            role: 'user',
            content: `以下の内容をMarpフォーマットのスライドに変換してください：\n\n${content}`,
          },
        ],
        max_tokens: 2000,
        temperature: 0.5,
      });

      return (
        completion.choices[0]?.message?.content ||
        'スライドを生成できませんでした'
      );
    } catch (error) {
      console.error('OpenAI API エラー:', error);
      throw new Error('スライドの生成に失敗しました');
    }
  }
}
