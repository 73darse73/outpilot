'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ThreadsPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: 最新のチャットIDを取得する処理
    // const latestThreadId = ...

    // 一旦新規チャットにリダイレクト
    router.replace('/threads/new');
  }, [router]);

  return null; // リダイレクト中は何も表示しない
}
