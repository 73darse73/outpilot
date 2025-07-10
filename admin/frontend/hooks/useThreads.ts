'use client';

import { useState, useCallback } from 'react';
import { threadsApi, ApiError } from '@/lib/api/client';
import {
  type Thread,
  type ThreadDetail,
  type Message,
  type CreateMessage,
  type CreateThread,
} from '@/lib/api/types';

export function useThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // スレッド一覧を取得
  const fetchThreads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await threadsApi.getAll();
      setThreads(data);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'スレッドの取得に失敗しました';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // スレッドを作成
  const createThread = useCallback(async (data: CreateThread) => {
    setLoading(true);
    setError(null);
    try {
      const newThread = await threadsApi.create(data);
      setThreads((prev) => [newThread, ...prev]);
      return newThread;
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'スレッドの作成に失敗しました';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // スレッドを削除
  const deleteThread = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await threadsApi.delete(id);
      setThreads((prev) => prev.filter((thread) => thread.id !== id));
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'スレッドの削除に失敗しました';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    threads,
    loading,
    error,
    fetchThreads,
    createThread,
    deleteThread,
  };
}

export function useThread(threadId: number) {
  const [thread, setThread] = useState<ThreadDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // スレッド詳細を取得
  const fetchThread = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await threadsApi.getById(threadId);
      setThread(data);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'スレッドの取得に失敗しました';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [threadId]);

  // メッセージを作成
  const createMessage = useCallback(
    async (data: CreateMessage) => {
      setLoading(true);
      setError(null);
      try {
        const newMessage = await threadsApi.createMessage(threadId, data);
        setThread((prev) =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, newMessage],
              }
            : null,
        );
        return newMessage;
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : 'メッセージの送信に失敗しました';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [threadId],
  );

  // AI応答を生成
  const generateAIResponse = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await threadsApi.generateAIResponse(threadId);
      // AI応答生成後、スレッドを再取得
      await fetchThread();
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'AI応答の生成に失敗しました';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [threadId, fetchThread]);

  return {
    thread,
    loading,
    error,
    fetchThread,
    createMessage,
    generateAIResponse,
  };
}
