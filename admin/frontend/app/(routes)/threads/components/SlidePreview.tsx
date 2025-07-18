'use client';

import { useEffect, useState } from 'react';
import { Marp } from '@marp-team/marp-core';
import { Slide } from '@/lib/api/client';

interface SlidePreviewProps {
  slide: Slide;
  onEdit?: (content: string) => void;
}

export function SlidePreview({ slide, onEdit }: SlidePreviewProps) {
  const [html, setHtml] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const marp = new Marp({
      html: true,
      math: 'mathjax',
    });

    try {
      const result = marp.render(slide.content);
      setHtml(result.html);

      // スライド数を計算（---で区切られた数）
      const slideCount = (slide.content.match(/^---$/gm) || []).length + 1;
      setTotalSlides(slideCount);
    } catch (error) {
      console.error('スライドのレンダリングエラー:', error);
      setHtml('<div class="error">スライドの表示に失敗しました</div>');
    }
  }, [slide.content]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{slide.title}</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {currentSlide + 1} / {totalSlides}
            </span>
            {onEdit && (
              <button
                onClick={() => onEdit(slide.content)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                編集
              </button>
            )}
          </div>
        </div>
      </div>

      {/* スライドナビゲーション */}
      {totalSlides > 1 && (
        <div className="bg-gray-100 px-6 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              前へ
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {/* スライド表示エリア */}
      <div className="p-8 min-h-[500px] flex items-center justify-center">
        <div
          className="w-full max-w-4xl"
          dangerouslySetInnerHTML={{ __html: html }}
          style={
            {
              '--marp-theme': 'default',
            } as React.CSSProperties
          }
        />
      </div>

      {/* フッター */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            作成日: {new Date(slide.createdAt).toLocaleDateString('ja-JP')}
          </span>
          <span>Marp形式</span>
        </div>
      </div>
    </div>
  );
}
