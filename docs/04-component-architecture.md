# コンポーネント設計

## 🎯 Reactコンポーネントとは

Reactコンポーネントは、UIを構成する独立した再利用可能な部品です。各コンポーネントは独自の状態とロジックを持ち、他のコンポーネントと組み合わせることで複雑なUIを構築できます。

### コンポーネントの基本概念

```tsx
// 基本的なコンポーネント
function Welcome(props) {
  return <h1>こんにちは、{props.name}さん！</h1>;
}

// 使用例
<Welcome name="田中" />
```

## 📁 プロジェクトのコンポーネント構造

### ディレクトリ構造
```
src/components/
├── ui/                    # 汎用的なUIコンポーネント
│   ├── LoadingSpinner.tsx # ローディング表示
│   └── ErrorMessage.tsx   # エラーメッセージ
└── features/              # 機能別コンポーネント
    └── todo/              # Todo機能専用
        ├── TodoForm.tsx   # Todo追加フォーム
        ├── TodoItem.tsx   # 個別Todoアイテム
        ├── TodoList.tsx   # Todoリスト
        ├── TodoStats.tsx  # 統計情報
        └── TodoContainer.tsx # Todo機能全体の統合
```

### コンポーネントの分類

#### 1. UI コンポーネント（`ui/`）
- **再利用可能**: 他のプロジェクトでも使用可能
- **汎用的**: 特定の機能に依存しない
- **単一責任**: 一つの機能に特化

#### 2. 機能コンポーネント（`features/`）
- **機能特化**: 特定の機能に特化したコンポーネント
- **ビジネスロジック**: 特定の機能に特化
- **状態管理**: 複数のUIコンポーネントを統合
- **データフロー**: APIとの連携

## 🔍 各コンポーネントの詳細解説

### 1. TodoForm コンポーネント

```tsx
// src/components/features/todo/TodoForm.tsx
'use client';

import { useState } from 'react';
import { TodoFormData } from '@/types/todo';

interface TodoFormProps {
    onSubmit: (data: TodoFormData) => Promise<void>;
    disabled?: boolean;
}

export default function TodoForm({ onSubmit, disabled = false }: TodoFormProps) {
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (inputValue.trim() === '' || isSubmitting || disabled) {
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit({ text: inputValue.trim() });
            setInputValue('');
        } catch (error) {
            console.error('Todo追加エラー:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="新しいタスクを入力..."
                disabled={disabled || isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
                type="submit"
                disabled={inputValue.trim() === '' || isSubmitting || disabled}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
            >
                {isSubmitting ? '追加中...' : '追加'}
            </button>
        </form>
    );
}
```

**解説:**
- **Props**: `onSubmit`関数と`disabled`状態を受け取る
- **状態管理**: 入力値と送信状態を管理
- **イベント処理**: フォーム送信とキーボード入力
- **アクセシビリティ**: 無効化状態とフォーカス管理

### 2. TodoItem コンポーネント

```tsx
// src/components/features/todo/TodoItem.tsx
'use client';

import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    disabled?: boolean;
}

export default function TodoItem({ todo, onToggle, onDelete, disabled = false }: TodoItemProps) {
    const handleToggle = async () => {
        if (!disabled) {
            await onToggle(todo.id);
        }
    };

    const handleDelete = async () => {
        if (!disabled) {
            await onDelete(todo.id);
        }
    };

    return (
        <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg border transition-all ${
            todo.completed ? 'opacity-75' : ''
        } ${disabled ? 'cursor-not-allowed' : ''}`}>
            <button
                onClick={handleToggle}
                disabled={disabled}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                {todo.completed && '✓'}
            </button>

            <span className={`flex-1 ${
                todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-800'
            }`}>
                {todo.text}
            </span>

            <button
                onClick={handleDelete}
                disabled={disabled}
                className={`text-red-500 hover:text-red-700 transition-colors ${
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
                🗑️
            </button>
        </div>
    );
}
```

**解説:**
- **Props**: Todoオブジェクトと操作関数を受け取る
- **条件付きスタイリング**: 完了状態に応じた表示
- **イベント処理**: クリックイベントの処理
- **無効化状態**: ローディング中の操作防止

### 3. TodoList コンポーネント

```tsx
// src/components/features/todo/TodoList.tsx
'use client';

import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    disabled?: boolean;
}

export default function TodoList({ todos, onToggle, onDelete, disabled = false }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">📋</div>
                <p>タスクがありません</p>
                <p className="text-sm">新しいタスクを追加してください</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}
```

**解説:**
- **条件付きレンダリング**: 空の状態とリスト表示
- **コンポーネント合成**: TodoItemを組み合わせ
- **キー管理**: Reactのリストレンダリング最適化
- **Props受け渡し**: 親から子へのデータフロー

### 4. TodoStats コンポーネント

```tsx
// src/components/features/todo/TodoStats.tsx
'use client';

import { Todo } from '@/types/todo';

interface TodoStatsProps {
    todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;

    if (total === 0) {
        return null;
    }

    return (
        <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
                <span>総タスク数: {total}</span>
                <span>完了済み: {completed}</span>
                <span>未完了: {pending}</span>
            </div>
            
            <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                    />
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                    {total > 0 ? Math.round((completed / total) * 100) : 0}% 完了
                </div>
            </div>
        </div>
    );
}
```

**解説:**
- **計算ロジック**: 統計情報の算出
- **条件付きレンダリング**: データがない場合は非表示
- **プログレスバー**: 視覚的な進捗表示
- **アニメーション**: CSSトランジション

### 5. TodoContainer コンポーネント

```tsx
// src/components/features/todo/TodoContainer.tsx
'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoForm from '@/components/ui/TodoForm';
import TodoList from '@/components/ui/TodoList';
import TodoStats from '@/components/ui/TodoStats';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

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
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                📝 ToDo リスト
            </h1>

            {error && (
                <ErrorMessage 
                    message={error} 
                    onRetry={refetch}
                />
            )}

            <TodoForm 
                onSubmit={handleAddTodo}
                disabled={loading}
            />

            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                disabled={loading}
            />

            <TodoStats todos={todos} />
        </div>
    );
}
```

**解説:**
- **状態管理**: useTodosフックを使用
- **コンポーネント統合**: 複数のUIコンポーネントを組み合わせ
- **エラーハンドリング**: エラー状態の表示
- **ローディング状態**: データ取得中の表示

## 🏗️ コンポーネント設計の原則

### 1. 単一責任の原則
```tsx
// ❌ 悪い例: 複数の責任を持つコンポーネント
function TodoApp() {
    // 状態管理、API呼び出し、UI表示、スタイリング...
}

// ✅ 良い例: 責任を分離したコンポーネント
function TodoContainer() {
    const { todos, addTodo } = useTodos(); // 状態管理
    return <TodoList todos={todos} onAdd={addTodo} />; // UI表示
}
```

### 2. Props によるデータフロー
```tsx
// 親から子への一方向データフロー
<TodoContainer>
    <TodoList todos={todos} onToggle={toggleTodo} />
        <TodoItem todo={todo} onToggle={onToggle} />
</TodoContainer>
```

### 3. 再利用性の考慮
```tsx
// 汎用的なコンポーネント
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}

// 特定の機能に特化したコンポーネント
interface TodoFormProps {
    onSubmit: (data: TodoFormData) => Promise<void>;
}
```

## 🔧 コンポーネント間の関係性

### データフロー図
```
TodoContainer (状態管理)
├── TodoForm (入力)
├── TodoList (表示)
│   └── TodoItem (個別アイテム)
├── TodoStats (統計)
├── LoadingSpinner (ローディング)
└── ErrorMessage (エラー)
```

### 依存関係
- **TodoContainer**: 他のすべてのコンポーネントを統合
- **TodoList**: TodoItemに依存
- **UI コンポーネント**: 互いに独立
- **機能コンポーネント**: UI コンポーネントに依存

## 📚 学習のポイント

### 初心者向け
1. **コンポーネントの概念**: UIの部品化
2. **Props**: 親から子へのデータ受け渡し
3. **状態管理**: useStateの使用方法

### 中級者向け
1. **コンポーネント設計**: 責任の分離
2. **再利用性**: 汎用的なコンポーネント作成
3. **パフォーマンス**: 不要な再レンダリングの防止

### 上級者向け
1. **アーキテクチャ**: 大規模アプリケーションの設計
2. **パターン**: デザインパターンの活用
3. **テスト**: コンポーネントのテスト戦略

## 🚀 実践演習

### 演習1: 新しいUIコンポーネントの作成
```tsx
// SearchInputコンポーネントを作成
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}
```

### 演習2: コンポーネントの合成
```tsx
// TodoFilterコンポーネントを作成
// 完了/未完了でフィルタリングする機能
```

### 演習3: 条件付きレンダリング
```tsx
// TodoDetailコンポーネントを作成
// クリック時に詳細を表示する機能
```

## 📖 参考資料

- [React公式ドキュメント](https://react.dev/)
- [Reactコンポーネント](https://react.dev/learn/your-first-component)
- [Props](https://react.dev/learn/passing-props-to-a-component)
- [状態管理](https://react.dev/learn/managing-state)
