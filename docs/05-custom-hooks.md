# カスタムフック

## 🎯 カスタムフックとは

カスタムフックは、React Hooksを組み合わせて作成する独自のフックです。コンポーネント間で状態管理ロジックを共有し、コードの再利用性と保守性を向上させます。

### 基本的な概念

```tsx
// カスタムフックの基本構造
function useCustomHook() {
    // 状態管理
    const [state, setState] = useState(initialValue);
    
    // 副作用
    useEffect(() => {
        // 処理
    }, []);
    
    // カスタムロジック
    const customFunction = useCallback(() => {
        // 処理
    }, []);
    
    // 戻り値
    return {
        state,
        customFunction
    };
}
```

## 📁 プロジェクトのカスタムフック

### ディレクトリ構造
```
src/hooks/
└── useTodos.ts       # Todo状態管理フック
```

### 実際のカスタムフック
```typescript
// src/hooks/useTodos.ts
import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFormData } from '@/types/todo';
import { apiClient } from '@/lib/api';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Todo一覧を取得
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiClient.getTodos();
            setTodos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    }, []);

    // Todoを追加
    const addTodo = useCallback(async (formData: TodoFormData) => {
        try {
            setError(null);
            const newTodo = await apiClient.createTodo(formData);
            setTodos(prev => [...prev, newTodo]);
            return newTodo;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの追加に失敗しました');
            throw err;
        }
    }, []);

    // Todoの完了状態を切り替え
    const toggleTodo = useCallback(async (id: number) => {
        try {
            setError(null);
            const todo = todos.find(t => t.id === id);
            if (!todo) return;

            const updatedTodo = await apiClient.toggleTodo(id, !todo.completed);
            setTodos(prev => 
                prev.map(t => t.id === id ? updatedTodo : t)
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの更新に失敗しました');
        }
    }, [todos]);

    // Todoを削除
    const deleteTodo = useCallback(async (id: number) => {
        try {
            setError(null);
            await apiClient.deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの削除に失敗しました');
        }
    }, []);

    // 初回読み込み
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return {
        todos,
        loading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        refetch: fetchTodos,
    };
};
```

## 🔍 各機能の詳細解説

### 1. 状態管理

```typescript
const [todos, setTodos] = useState<Todo[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

**解説:**
- **todos**: Todoオブジェクトの配列を管理
- **loading**: データ取得中の状態を管理
- **error**: エラーメッセージを管理
- **型安全性**: TypeScriptで型を明確に定義

### 2. データ取得（fetchTodos）

```typescript
const fetchTodos = useCallback(async () => {
    try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getTodos();
        setTodos(data);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Todoの取得に失敗しました');
    } finally {
        setLoading(false);
    }
}, []);
```

**解説:**
- **useCallback**: 関数のメモ化（不要な再作成を防止）
- **非同期処理**: async/awaitを使用
- **エラーハンドリング**: try-catchでエラーを捕捉
- **状態更新**: ローディングとエラー状態を管理

### 3. Todo追加（addTodo）

```typescript
const addTodo = useCallback(async (formData: TodoFormData) => {
    try {
        setError(null);
        const newTodo = await apiClient.createTodo(formData);
        setTodos(prev => [...prev, newTodo]);
        return newTodo;
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Todoの追加に失敗しました');
        throw err;
    }
}, []);
```

**解説:**
- **楽観的更新**: API呼び出し前に状態を更新
- **関数型更新**: `setTodos(prev => [...prev, newTodo])`
- **エラー伝播**: throwでエラーを上位に伝播
- **戻り値**: 作成されたTodoオブジェクトを返す

### 4. Todo更新（toggleTodo）

```typescript
const toggleTodo = useCallback(async (id: number) => {
    try {
        setError(null);
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        const updatedTodo = await apiClient.toggleTodo(id, !todo.completed);
        setTodos(prev => 
            prev.map(t => t.id === id ? updatedTodo : t)
        );
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Todoの更新に失敗しました');
    }
}, [todos]);
```

**解説:**
- **条件チェック**: 対象のTodoが存在するか確認
- **状態反転**: `!todo.completed`で完了状態を切り替え
- **配列更新**: mapで特定の要素のみ更新
- **依存配列**: todosを依存配列に含める

### 5. Todo削除（deleteTodo）

```typescript
const deleteTodo = useCallback(async (id: number) => {
    try {
        setError(null);
        await apiClient.deleteTodo(id);
        setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Todoの削除に失敗しました');
    }
}, []);
```

**解説:**
- **フィルタリング**: filterで削除対象を除外
- **楽観的更新**: API呼び出し後に状態を更新
- **エラーハンドリング**: 削除失敗時の処理

### 6. 初回読み込み（useEffect）

```typescript
useEffect(() => {
    fetchTodos();
}, [fetchTodos]);
```

**解説:**
- **初回実行**: コンポーネントマウント時に実行
- **依存配列**: fetchTodosの変更時に再実行
- **useCallback**: 依存配列の無限ループを防止

## 🎯 カスタムフックの使用例

### コンポーネントでの使用

```tsx
// src/components/features/TodoContainer.tsx
export default function TodoContainer() {
    const {
        todos,
        loading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        refetch,
    } = useTodos();

    const handleAddTodo = async (data: { text: string }) => {
        await addTodo(data);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {error && <ErrorMessage message={error} onRetry={refetch} />}
            <TodoForm onSubmit={handleAddTodo} disabled={loading} />
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                disabled={loading}
            />
        </div>
    );
}
```

**解説:**
- **分割代入**: 必要な機能のみを取得
- **型推論**: TypeScriptが戻り値の型を推論
- **エラーハンドリング**: エラー状態の表示
- **ローディング状態**: ローディング中の表示

## 🔧 カスタムフックの設計原則

### 1. 単一責任の原則

```typescript
// ❌ 悪い例: 複数の責任を持つフック
function useApp() {
    // Todo管理、ユーザー管理、設定管理...
}

// ✅ 良い例: 責任を分離したフック
function useTodos() {
    // Todo管理のみ
}

function useUser() {
    // ユーザー管理のみ
}
```

### 2. 再利用性の考慮

```typescript
// 汎用的なフック
function useApi<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 実装...

    return { data, loading, error, refetch };
}

// 特定の機能に特化したフック
function useTodos() {
    return useApi<Todo[]>('/todos');
}
```

### 3. 型安全性の確保

```typescript
// 戻り値の型を明確に定義
interface UseTodosReturn {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    addTodo: (formData: TodoFormData) => Promise<void>;
    toggleTodo: (id: number) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
    refetch: () => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
    // 実装...
};
```

## 📚 パフォーマンス最適化

### 1. useCallbackの活用

```typescript
// 関数のメモ化
const addTodo = useCallback(async (formData: TodoFormData) => {
    // 実装
}, []); // 依存配列が空の場合、関数は再作成されない
```

### 2. useMemoの活用

```typescript
// 計算結果のメモ化
const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
}, [todos]);
```

### 3. 依存配列の最適化

```typescript
// 依存配列を最小限に
const toggleTodo = useCallback(async (id: number) => {
    // 実装
}, []); // todosを依存配列から除外（関数内で直接参照）
```

## 🚀 実践演習

### 演習1: 新しいカスタムフックの作成

```typescript
// useLocalStorageフックを作成
function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
}
```

### 演習2: エラーハンドリングの改善

```typescript
// エラー状態の詳細管理
interface ErrorState {
    message: string;
    code?: string;
    retry?: () => void;
}

const [error, setError] = useState<ErrorState | null>(null);
```

### 演習3: 楽観的更新の実装

```typescript
// 楽観的更新のパターン
const optimisticToggle = useCallback(async (id: number) => {
    const originalTodos = [...todos];
    
    // 楽観的更新
    setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
    ));
    
    try {
        await apiClient.toggleTodo(id, !todos.find(t => t.id === id)?.completed);
    } catch (error) {
        // エラー時は元に戻す
        setTodos(originalTodos);
        setError('更新に失敗しました');
    }
}, [todos]);
```

## 📖 学習のポイント

### 初心者向け
1. **useState**: 状態管理の基本
2. **useEffect**: 副作用の管理
3. **useCallback**: 関数のメモ化

### 中級者向け
1. **カスタムフック設計**: 責任の分離
2. **型安全性**: TypeScriptの活用
3. **パフォーマンス**: 最適化手法

### 上級者向け
1. **アーキテクチャ**: 大規模アプリケーションの設計
2. **テスト**: カスタムフックのテスト戦略
3. **デバッグ**: 開発者ツールの活用

## 📖 参考資料

- [React Hooks公式ドキュメント](https://react.dev/reference/react)
- [カスタムフック](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)
- [useCallback](https://react.dev/reference/react/useCallback)
