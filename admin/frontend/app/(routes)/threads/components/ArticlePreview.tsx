'use client';

import { Article, threadsApi } from '@/lib/api/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState } from 'react';

interface ArticlePreviewProps {
  article: Article;
  onEdit?: (content: string) => void;
}

export function ArticlePreview({ article, onEdit }: ArticlePreviewProps) {
  const [status, setStatus] = useState(article.status);
  const [qiitaUrl, setQiitaUrl] = useState(article.qiitaUrl);
  const [isPosting, setIsPosting] = useState(false);
  const [postMessage, setPostMessage] = useState('');
  const [showTagModal, setShowTagModal] = useState(false);
  const [tags, setTags] = useState<{ name: string }[]>([]);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);

  // タグ編集用
  const handleTagChange = (index: number, value: string) => {
    setTags((prev) => prev.map((t, i) => (i === index ? { name: value } : t)));
  };
  const handleAddTag = () => {
    setTags((prev) => [...prev, { name: '' }]);
  };
  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  // デバッグログ
  console.log('ArticlePreview - article:', article);
  console.log('ArticlePreview - article.content:', article.content);
  console.log('ArticlePreview - article.content type:', typeof article.content);

  // 記事コンテンツをそのまま使用（バックエンドで既に```markdownを除去済み）
  const contentToRender = article.content;

  console.log('ArticlePreview - contentToRender:', contentToRender);

  // Qiita投稿処理
  const handlePostToQiita = async () => {
    setIsGeneratingTags(true);
    setPostMessage('');
    try {
      const { tags: generatedTags } = await threadsApi.generateTags(
        article.title,
        article.content,
      );
      setTags(generatedTags);
      setShowTagModal(true);
    } catch (e) {
      setPostMessage('タグ自動生成に失敗しました');
    } finally {
      setIsGeneratingTags(false);
    }
  };

  // タグ確定→Qiita投稿API呼び出し
  const handleConfirmTagsAndPost = async () => {
    setIsPosting(true);
    setPostMessage('');
    setShowTagModal(false);
    try {
      const filteredTags = tags.filter((t) => t.name.trim() !== '');
      const res = await fetch(`/api/articles/${article.id}/qiita`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: filteredTags }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('published');
        setQiitaUrl(data.url);
        setPostMessage('Qiitaに投稿しました！');
      } else {
        setPostMessage(data.message || '投稿に失敗しました');
      }
    } catch (e) {
      setPostMessage('投稿に失敗しました');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {article.title || 'テスト記事'}
          </h3>
          <div className="flex items-center space-x-4 mt-1">
            <span
              className={`px-2 py-1 text-xs rounded ${
                status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {status === 'published' ? '投稿済み' : '下書き'}
            </span>
            {qiitaUrl && (
              <a
                href={qiitaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Qiitaで見る
              </a>
            )}
          </div>
        </div>
        {/* Qiita投稿ボタン */}
        {status !== 'published' && (
          <button
            onClick={handlePostToQiita}
            disabled={isPosting || isGeneratingTags}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isPosting || isGeneratingTags ? '準備中...' : 'Qiitaに投稿'}
          </button>
        )}
      </div>
      {postMessage && (
        <div className="px-6 py-2 text-sm text-green-600">{postMessage}</div>
      )}

      {/* 記事内容 */}
      <div className="p-6">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-6 mt-8 first:mt-0 text-gray-900">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-4 mt-6 first:mt-0 text-gray-900">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mb-3 mt-5 first:mt-0 text-gray-900">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-bold mb-3 mt-4 first:mt-0 text-gray-900">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="mb-4 last:mb-0 leading-relaxed text-gray-700">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 space-y-2 list-disc list-inside text-gray-700">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 space-y-2 list-decimal list-inside text-gray-700">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="mb-1 text-gray-700">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-gray-700">{children}</em>
              ),
              code: ({ children, className }) => {
                if (className) {
                  return (
                    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                      <code className="text-sm font-mono">{children}</code>
                    </div>
                  );
                }
                return (
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-gray-800">
                    {children}
                  </code>
                );
              },
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic bg-blue-50 py-2 rounded-r text-gray-700">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="border-gray-300 my-8" />,
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-100">{children}</thead>
              ),
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => (
                <tr className="border-b border-gray-300">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-bold border-r border-gray-300 text-gray-900">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 border-r border-gray-300 text-gray-700">
                  {children}
                </td>
              ),
            }}
          >
            {contentToRender}
          </ReactMarkdown>
        </div>
      </div>

      {/* フッター */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            作成日: {new Date(article.createdAt).toLocaleDateString('ja-JP')}
          </span>
          <span>
            更新日: {new Date(article.updatedAt).toLocaleDateString('ja-JP')}
          </span>
        </div>
      </div>

      {/* タグ編集モーダル */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md z-[100000] relative">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              タグを編集して投稿
            </h2>
            <div className="space-y-2 mb-4">
              {tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tag.name}
                    onChange={(e) => handleTagChange(idx, e.target.value)}
                    className="border rounded px-2 py-1 flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    placeholder="タグ名"
                  />
                  <button
                    onClick={() => handleRemoveTag(idx)}
                    className="text-red-500 hover:underline"
                    disabled={tags.length <= 1}
                  >
                    削除
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddTag}
                className="text-blue-500 dark:text-blue-400 hover:underline mt-2"
              >
                ＋タグを追加
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTagModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                disabled={isPosting}
              >
                キャンセル
              </button>
              <button
                onClick={handleConfirmTagsAndPost}
                className="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded hover:bg-green-600 dark:hover:bg-green-800"
                disabled={
                  isPosting ||
                  tags.length === 0 ||
                  tags.some((t) => !t.name.trim())
                }
              >
                このタグで投稿
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
