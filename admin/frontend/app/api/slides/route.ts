import { NextRequest, NextResponse } from 'next/server';

interface Slide {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slideshareUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// 簡易的なインメモリストレージ（実際のプロジェクトではデータベースを使用）
let slides: Slide[] = [
  {
    id: 1,
    title: 'モダンなWeb開発のベストプラクティス',
    content:
      '# モダンなWeb開発のベストプラクティス\n\n## 目次\n- フロントエンド開発\n- バックエンド開発\n- デプロイメント\n\n## フロントエンド開発\nReact、TypeScript、Next.jsを使った効率的な開発手法を紹介します。',
    status: 'published',
    slideshareUrl: 'https://slideshare.net/example/modern-web-dev',
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-20T09:00:00Z',
  },
  {
    id: 2,
    title: 'TypeScriptで作る堅牢なアプリケーション',
    content:
      '# TypeScriptで作る堅牢なアプリケーション\n\n## 型安全性の重要性\n- コンパイル時のエラー検出\n- リファクタリングの安全性\n- 開発効率の向上\n\n## 実践的な型定義\n実際のプロジェクトで使える型定義のパターンを紹介します。',
    status: 'published',
    slideshareUrl: 'https://slideshare.net/example/typescript-robust',
    createdAt: '2025-01-18T15:30:00Z',
    updatedAt: '2025-01-18T15:30:00Z',
  },
];

export async function GET(request: NextRequest) {
  const response = NextResponse.json(slides);

  // CORSヘッダーを追加
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, status, slideshareUrl } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'タイトルと内容は必須です' },
        { status: 400 },
      );
    }

    const newSlide: Slide = {
      id: slides.length + 1,
      title,
      content,
      status: status || 'draft',
      slideshareUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    slides.push(newSlide);

    const response = NextResponse.json(newSlide, { status: 201 });

    // CORSヘッダーを追加
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('スライド作成エラー:', error);
    return NextResponse.json(
      { error: 'スライドの作成に失敗しました' },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  const response = new NextResponse();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}
