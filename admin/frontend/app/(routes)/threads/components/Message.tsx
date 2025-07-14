'use client';

import { type Message } from '../types';
import { CodeBlock } from './CodeBlock';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageProps {
  message: Message;
}

export function Message({ message }: MessageProps) {
  if (message.role === 'system') {
    return (
      <div className="w-full flex justify-center my-6">
        <div className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm max-w-xl">
          <div className="prose prose-neutral prose-sm text-center leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} py-4`}>
      <div
        className={`
          max-w-[80%] px-6 py-4 rounded-2xl shadow-sm
          ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
          }
        `}
        style={{ wordBreak: 'break-word' }}
      >
        <div className="prose prose-neutral dark:prose-invert prose-xl leading-loose prose-p:my-6 prose-li:my-3 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-6">
          {message.type === 'code' ? (
            <CodeBlock code={message.content} language={message.language} />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-bold mb-4 mt-6 first:mt-0 text-2xl">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-bold mb-3 mt-5 first:mt-0 text-xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-bold mb-3 mt-4 first:mt-0 text-lg">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0 leading-relaxed text-base">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 list-disc list-inside leading-relaxed">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 space-y-2 list-decimal list-inside leading-relaxed">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1 leading-relaxed">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900 dark:text-gray-100">
                    {children}
                  </strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children, className }) => {
                  if (className) {
                    return (
                      <div className="bg-gray-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                        <code className="text-sm leading-relaxed">
                          {children}
                        </code>
                      </div>
                    );
                  }
                  return (
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                },
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 my-6 italic bg-gray-50 dark:bg-gray-800 py-2 rounded-r">
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <hr className="border-gray-300 dark:border-gray-600 my-6" />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => (
                  <tr className="border-b border-gray-300 dark:border-gray-600">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left font-bold border-r border-gray-300 dark:border-gray-600">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
