import { useState, useEffect } from 'react';
import { threadsApi, slidesApi, articlesApi } from '@/lib/api/client';
import type { Thread, Slide, Article } from '@/lib/api/types';

// 共通のローディング・エラー状態管理
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Thread関連のフック
export const useThreads = () => {
  const [state, setState] = useState<ApiState<Thread[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const data = await threadsApi.getAll();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    fetchThreads();
  }, []);

  return state;
};

// Slide関連のフック
export const useSlides = () => {
  const [state, setState] = useState<ApiState<Slide[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await slidesApi.getAll();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    fetchSlides();
  }, []);

  return state;
};

// Article関連のフック
export const useArticles = () => {
  const [state, setState] = useState<ApiState<Article[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesApi.getAll();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    fetchArticles();
  }, []);

  return state;
};
