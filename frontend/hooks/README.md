# Custom Hooks

React カスタムフックのディレクトリです。アプリケーション全体で再利用可能なロジックを管理します。

## 📁 ファイル構成

### `useThreads.ts`

チャットスレッドの管理を行うカスタムフック

```typescript
interface UseThreadsReturn {
  threads: Thread[];
  loading: boolean;
  error: string | null;
  fetchThreads: () => Promise<void>;
  createThread: (title: string) => Promise<void>;
  deleteThread: (id: string) => Promise<void>;
}
```

#### 機能

- **スレッド一覧取得**: API からスレッド一覧を取得
- **新規スレッド作成**: 新しいスレッドを作成
- **スレッド削除**: 指定したスレッドを削除
- **ローディング状態管理**: 非同期処理中の状態管理
- **エラーハンドリング**: API 呼び出しエラーの処理

#### 使用例

```typescript
function ThreadsPage() {
  const { threads, loading, error, fetchThreads, createThread } = useThreads();

  useEffect(() => {
    fetchThreads();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
```

## 🔧 フック設計原則

### 1. 単一責任の原則

各フックは一つの責任を持つ

```typescript
// ✅ 良い例
const useThreads = () => {
  /* スレッド管理のみ */
};
const useMessages = () => {
  /* メッセージ管理のみ */
};

// ❌ 悪い例
const useThreadsAndMessages = () => {
  /* 複数の責任 */
};
```

### 2. 型安全性

TypeScript の型定義を活用

```typescript
interface UseThreadsState {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

interface UseThreadsActions {
  fetchThreads: () => Promise<void>;
  createThread: (title: string) => Promise<void>;
}

type UseThreadsReturn = UseThreadsState & UseThreadsActions;
```

### 3. エラーハンドリング

統一されたエラー処理

```typescript
const useThreads = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    const message = error instanceof Error ? error.message : 'Unknown error';
    setError(message);
  };

  const fetchThreads = async () => {
    try {
      setError(null);
      const response = await apiClient.threads.getAll();
      const data = await response.json();
      setThreads(data);
    } catch (err) {
      handleError(err);
    }
  };

  return { error, fetchThreads };
};
```

### 4. 最適化

不要な再レンダリングを防ぐ

```typescript
const useThreads = () => {
  const fetchThreads = useCallback(async () => {
    // 実装
  }, []); // 依存配列を適切に設定

  const createThread = useCallback(async (title: string) => {
    // 実装
  }, []);

  return { fetchThreads, createThread };
};
```

## 🚀 今後の拡張予定

### `useMessages.ts`

メッセージ管理フック

```typescript
interface UseMessagesReturn {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}
```

### `useSlides.ts`

スライド管理フック

```typescript
interface UseSlidesReturn {
  slides: Slide[];
  loading: boolean;
  createSlide: (data: CreateSlideData) => Promise<void>;
  updateSlide: (id: string, data: UpdateSlideData) => Promise<void>;
  deleteSlide: (id: string) => Promise<void>;
}
```

### `useArticles.ts`

記事管理フック

```typescript
interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  createArticle: (data: CreateArticleData) => Promise<void>;
  publishToQiita: (id: string) => Promise<void>;
}
```

### `useAuth.ts`

認証管理フック

```typescript
interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}
```

## 🧪 テスト

### フックのテスト

```typescript
import { renderHook, act } from '@testing-library/react';
import { useThreads } from './useThreads';

describe('useThreads', () => {
  it('should fetch threads successfully', async () => {
    const { result } = renderHook(() => useThreads());

    await act(async () => {
      await result.current.fetchThreads();
    });

    expect(result.current.threads).toHaveLength(2);
    expect(result.current.loading).toBe(false);
  });
});
```

## 🔍 デバッグ

### フックのデバッグ

```typescript
const useThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  // 開発環境でのみログ出力
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Threads updated:', threads);
    }
  }, [threads]);

  // ...
};
```

### React DevTools

- React DevTools Profiler でフックの使用状況を確認
- コンポーネントツリーでフックの状態を追跡

## 📚 参考資料

- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Custom Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Testing React Hooks](https://testing-library.com/docs/react-testing-library/api#renderhook)

---

**Custom Hooks** - 再利用可能な React ロジック
