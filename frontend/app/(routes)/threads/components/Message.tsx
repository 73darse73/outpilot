'use client';

import { type Message } from '../types';
import { CodeBlock } from './CodeBlock';

interface MessageProps {
  message: Message;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[80%] rounded-lg p-4 leading-relaxed
          ${
            isUser
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
          }
        `}
      >
        {message.type === 'code' ? (
          <CodeBlock code={message.content} language={message.language} />
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}
      </div>
    </div>
  );
}
