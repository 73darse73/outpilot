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

  // アウトプット特化型のシステムプロンプト
  private getOutputFocusedSystemPrompt() {
    return `あなたは親切で丁寧な日本語アシスタントです。ユーザーの学習を支援し、効率的なアウトプット作成を手伝います。

## あなたの役割
1. **学習支援**: 質問に丁寧に回答し、理解を深めるサポート
2. **アウトプット支援**: 学習内容を記事やスライドとして整理・構造化
3. **品質向上**: 分かりやすく、実用的な内容を提供

## アウトプット作成時の対応
ユーザーが以下のような指示を出した場合、適切な形式で出力してください：

### 記事化指示の例
- "この内容を記事にして"
- "Qiitaに投稿できる記事を作って"
- "ブログ記事としてまとめて"
- "技術記事として整理して"

**記事出力形式**:
\`\`\`markdown
# タイトル

## 概要
記事の概要を簡潔に説明

## 目次
1. [項目1](#項目1)
2. [項目2](#項目2)
3. [項目3](#項目3)

## 本文
詳細な内容...

## まとめ
要点のまとめ
\`\`\`

### スライド化指示の例
- "この内容をスライドにして"
- "プレゼン資料としてまとめて"
- "発表用のスライドを作って"

**スライド出力形式** (Marp形式):
\`\`\`markdown
---
marp: true
theme: default
---

# タイトル
## サブタイトル

---

# 目次
- 項目1
- 項目2
- 項目3

---

# 内容
- ポイント1
- ポイント2

\`\`\`

## 重要なルール
1. **自然な会話**: 普段は普通のチャットとして対応
2. **指示の検出**: 記事化・スライド化の指示を見逃さない
3. **構造化**: 指示があったら適切な形式で構造化
4. **品質**: 読みやすく、実用的な内容を心がける
5. **日本語**: 常に親切で丁寧な日本語で対応

## トークン管理
- 長い会話履歴がある場合は、重要な部分を要約してから処理
- 必要に応じて「続きを生成しますか？」と確認`;
  }

  async generateResponse(messages: ChatCompletionMessageParam[]) {
    try {
      // 最新のメッセージを確認して、アウトプット指示があるかチェック
      const latestMessage = messages[messages.length - 1];
      const content =
        typeof latestMessage.content === 'string' ? latestMessage.content : '';
      const isOutputRequest = this.detectOutputRequest(content);

      // システムプロンプトを動的に設定
      const systemPrompt = isOutputRequest
        ? this.getOutputFocusedSystemPrompt()
        : 'あなたは親切で丁寧な日本語アシスタントです。ユーザーの学習を支援し、効率的なアウトプット作成を手伝います。';

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 4000,
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

  // アウトプット指示を検出する関数
  private detectOutputRequest(content: string): boolean {
    const outputKeywords = [
      '記事にして',
      '記事化',
      'Qiita',
      'ブログ',
      '技術記事',
      'スライドにして',
      'スライド化',
      'プレゼン',
      '発表資料',
      'まとめて',
      '整理して',
      '構造化',
    ];

    return outputKeywords.some((keyword) =>
      content.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  // 記事生成専用メソッド（既存のスレッド内容から記事を生成）
  async generateArticleFromThread(threadMessages: string[]) {
    try {
      const systemPrompt = `あなたは優秀な技術記事作成者です。与えられた会話内容を基に、Qiitaに投稿できる高品質な技術記事を作成してください。

# QiitaのMarkdown記法ガイド
- QiitaのMarkdown記法（[Qiita公式チートシート](https://qiita.com/Qiita/items/c686397e4a0f4f11683d)）を厳守してください。
- 主要な記法例：

## 見出し
# 見出し1
## 見出し2

## 太字・斜体
**太字** *斜体*

## コードブロック
\`\`\`js
console.log('Qiita!');
\`\`\`

## テーブル
| 見出し | 値 |
|--------|----|
| A      | 1  |

## 脚注
脚注の例[^1]

[^1]: これは脚注です

## details（折りたたみ）
<details><summary>詳細</summary>
ここに詳細を書く
</details>

## Mermaid
\`\`\`mermaid
graph TD;
  A-->B;
\`\`\`

- これらを活用し、Qiitaにそのまま投稿できる形式で出力してください。

## 記事作成のルール
1. **魅力的なタイトル**: 検索されやすく、興味を引くタイトル
2. **明確な構成**: 目次、概要、本文、まとめの構成
3. **実用的な内容**: 読者が実際に使える情報
4. **適切なタグ**: 関連する技術タグを提案
5. **読みやすさ**: 分かりやすい日本語、適切な改行

## 出力形式
\`\`\`markdown
# タイトル

## 概要
記事の概要（100-200文字程度）

## 目次
1. [項目1](#項目1)
2. [項目2](#項目2)
3. [項目3](#項目3)

## 本文
詳細な内容...

## まとめ
要点のまとめ

## タグ
\`技術名\`, \`フレームワーク\`, \`開発\`
\`\`\`
`;

      const content = threadMessages.join('\n\n');

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `以下の会話内容を基に技術記事を作成してください：\n\n${content}`,
          },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      });

      return (
        completion.choices[0]?.message?.content || '記事を生成できませんでした'
      );
    } catch (error) {
      console.error('記事生成エラー:', error);
      throw new Error('記事の生成に失敗しました');
    }
  }

  // スライド生成専用メソッド（既存のスレッド内容からスライドを生成）
  async generateSlideFromThread(threadMessages: string[]) {
    try {
      const systemPrompt = `あなたは優秀なプレゼンテーション作成者です。与えられた会話内容を基に、Marpフォーマットのスライドを作成してください。

## スライド作成のルール
1. **論理的な構成**: 導入→本論→まとめの流れ
2. **適切な枚数**: 内容に応じて5-10枚程度
3. **読みやすさ**: 1スライドあたり3-5項目まで
4. **視覚的効果**: 適切な見出し、箇条書き、強調

## 出力形式（Marp）
\`\`\`markdown
---
marp: true
theme: default
paginate: true
---

# タイトル
## サブタイトル

---

# 目次
- 項目1
- 項目2
- 項目3

---

# 内容
- ポイント1
- ポイント2

\`\`\``;

      const content = threadMessages.join('\n\n');

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `以下の会話内容を基にスライドを作成してください：\n\n${content}`,
          },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      });

      return (
        completion.choices[0]?.message?.content ||
        'スライドを生成できませんでした'
      );
    } catch (error) {
      console.error('スライド生成エラー:', error);
      throw new Error('スライドの生成に失敗しました');
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

  /**
   * タイトル・本文からQiita用タグを自動生成
   * @param title 記事タイトル
   * @param body 記事本文
   * @returns [{ name: string }] 形式のタグ配列
   */
  async generateTags(title: string, body: string): Promise<{ name: string }[]> {
    try {
      const systemPrompt = `あなたはQiita記事のタグ付けアシスタントです。以下のタイトルと本文に最適なQiitaタグを3つ日本語で出力してください。タグはQiitaでよく使われる技術ワードを優先し、配列形式で返してください。例: ["JavaScript", "React", "フロントエンド"]。Qiitaタグ以外や曖昧な単語は避けてください。`;
      const userPrompt = `タイトル: ${title}\n本文: ${body}`;
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 256,
        temperature: 0.4,
      });
      // 返答からタグ配列を抽出
      const content = completion.choices[0]?.message?.content || '';
      // 例: ["JavaScript", "React", "フロントエンド"] 形式を抽出
      const match = content.match(/\[.*\]/s);
      if (!match) throw new Error('タグ抽出失敗: ' + content);
      const tagsRaw = JSON.parse(match[0]) as unknown;
      const tagsArr: string[] = Array.isArray(tagsRaw)
        ? tagsRaw.filter((t): t is string => typeof t === 'string')
        : [];
      // Qiita API用形式に変換
      const tags = tagsArr.map((name) => ({ name }));
      // 1つもなければ「開発」タグを入れる
      if (tags.length === 0) tags.push({ name: '開発' });
      return tags;
    } catch (error) {
      console.error('タグ自動生成エラー:', error);
      // 失敗時は「開発」タグのみ返す
      return [{ name: '開発' }];
    }
  }
}
