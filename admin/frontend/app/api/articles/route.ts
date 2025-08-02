import { NextRequest, NextResponse } from 'next/server';

interface Article {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  qiitaUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// 簡易的なインメモリストレージ（実際のプロジェクトではデータベースを使用）
let articles: Article[] = [
  {
    id: 1,
    title: 'Next.js 15の新機能について',
    content:
      'Next.js 15で追加された新機能について詳しく解説します。App Routerの改善やパフォーマンスの向上など、開発者にとって重要な変更点をまとめました。',
    status: 'published',
    qiitaUrl: 'https://qiita.com/example/nextjs15',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'TypeScriptの型安全性を活用した開発',
    content:
      'TypeScriptを使った開発で、型安全性を最大限に活用する方法を紹介します。型定義のベストプラクティスや、よくあるエラーの回避方法について説明します。',
    status: 'published',
    qiitaUrl: 'https://qiita.com/example/typescript-safety',
    createdAt: '2025-01-10T14:30:00Z',
    updatedAt: '2025-01-10T14:30:00Z',
  },
];

export async function GET(request: NextRequest) {
  const response = NextResponse.json(articles);

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
    const { title, content, status, qiitaUrl } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'タイトルと内容は必須です' },
        { status: 400 },
      );
    }

    const newArticle: Article = {
      id: articles.length + 1,
      title,
      content,
      status: status || 'draft',
      qiitaUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    articles.push(newArticle);

    const response = NextResponse.json(newArticle, { status: 201 });

    // CORSヘッダーを追加
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('記事作成エラー:', error);
    return NextResponse.json(
      { error: '記事の作成に失敗しました' },
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
