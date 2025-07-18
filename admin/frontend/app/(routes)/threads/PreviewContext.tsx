'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { getArticle, getSlide, Article } from '@/lib/api/client';

interface PreviewContextType {
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  previewType: 'article' | 'slide' | null;
  setPreviewType: (type: 'article' | 'slide' | null) => void;
  previewContent: string;
  setPreviewContent: (content: string) => void;
  previewTitle: string;
  setPreviewTitle: (title: string) => void;
  isGeneratingPreview: boolean;
  setIsGeneratingPreview: (generating: boolean) => void;
  fetchPreview: (
    threadId: number,
    previewTypeDb: 'article' | 'slide',
  ) => Promise<void>;
  previewArticle: Article | null;
  setPreviewArticle: (article: Article | null) => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<'article' | 'slide' | null>(
    null,
  );
  const [previewContent, setPreviewContent] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  // fetchPreviewをContextで提供
  const fetchPreview = async (
    threadId: number,
    previewTypeDb: 'article' | 'slide',
  ) => {
    if (!threadId) return;
    if (previewTypeDb === 'article') {
      const article = await getArticle(threadId);
      if (article) {
        setPreviewContent(article.content);
        setPreviewTitle(article.title);
        setPreviewArticle(article);
      } else {
        setPreviewContent('記事がありません');
        setPreviewTitle('');
        setPreviewArticle(null);
      }
    } else {
      const slide = await getSlide(threadId);
      if (slide) {
        setPreviewContent(slide.content);
        setPreviewTitle(slide.title);
        setPreviewArticle(null);
      } else {
        setPreviewContent('スライドがありません');
        setPreviewTitle('');
        setPreviewArticle(null);
      }
    }
  };

  return (
    <PreviewContext.Provider
      value={{
        isPreviewOpen,
        setIsPreviewOpen,
        previewType,
        setPreviewType,
        previewContent,
        setPreviewContent,
        previewTitle,
        setPreviewTitle,
        isGeneratingPreview,
        setIsGeneratingPreview,
        fetchPreview,
        previewArticle,
        setPreviewArticle,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}
