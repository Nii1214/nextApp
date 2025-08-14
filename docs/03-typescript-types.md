# TypeScript 型定義

## 🎯 TypeScriptとは

TypeScriptは、JavaScriptに静的型付けを追加したプログラミング言語です。コンパイル時に型チェックを行うことで、実行時エラーを事前に防ぎ、コードの品質と保守性を向上させます。

### JavaScript vs TypeScript

```javascript
// JavaScript
function addTodo(text) {
  return {
    id: Date.now(),
    text: text,
    completed: false
  }
}

// 実行時までエラーが分からない
addTodo(123) // 数値を渡してもエラーにならない
```

```typescript
// TypeScript
interface TodoFormData {
  text: string;
}

function addTodo(text: string) {
  return {
    id: Date.now(),
    text: text,
    completed: false
  }
}

// コンパイル時にエラーが分かる
addTodo(123) // エラー: 型 'number' は型 'string' に割り当てられません
```

## 📁 プロジェクトの型定義

### 型定義ファイルの場所
```
src/types/
└── todo.ts          # Todo関連の型定義
```

### 実際の型定義
```typescript
// src/types/todo.ts
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoFormData {
    text: string;
}

export interface TodoStats {
    total: number;
    completed: number;
    pending: number;
}
```

## 🔍 各型定義の詳細解説

### 1. `Todo` インターフェース

```typescript
export interface Todo {
    id: number;        // Todoの一意の識別子
    text: string;      // Todoの内容
    completed: boolean; // 完了状態
}
```

**使用例:**
```typescript
const todo: Todo = {
    id: 1,
    text: "買い物に行く",
    completed: false
}
```

**解説:**
- `id`: データベースの主キーとして使用
- `text`: ユーザーが入力するTodoの内容
- `completed`: チェックボックスの状態を管理

### 2. `TodoFormData` インターフェース

```typescript
export interface TodoFormData {
    text: string;      // フォームで入力されるテキスト
}
```

**使用例:**
```typescript
const formData: TodoFormData = {
    text: "新しいタスク"
}

// フォーム送信時に使用
const handleSubmit = (data: TodoFormData) => {
    console.log(data.text) // "新しいタスク"
}
```

**解説:**
- フォーム入力時のデータ構造を定義
- `id`や`completed`は含まない（新規作成時は不要）
- APIリクエストのペイロードとして使用

### 3. `TodoStats` インターフェース

```typescript
export interface TodoStats {
    total: number;     // 総タスク数
    completed: number; // 完了済みタスク数
    pending: number;   // 未完了タスク数
}
```

**使用例:**
```typescript
const stats: TodoStats = {
    total: 10,
    completed: 3,
    pending: 7
}

// 統計情報の表示に使用
console.log(`完了率: ${(stats.completed / stats.total) * 100}%`)
```

**解説:**
- 統計情報の表示に使用
- 計算済みの値を保持
- UIコンポーネントで表示用データとして使用

## 🎯 型定義の活用例

### 1. コンポーネントのProps型定義

```typescript
// src/components/ui/TodoItem.tsx
interface TodoItemProps {
    todo: Todo;                                    // Todoオブジェクト
    onToggle: (id: number) => Promise<void>;       // 完了状態切り替え関数
    onDelete: (id: number) => Promise<void>;       // 削除関数
    disabled?: boolean;                            // 無効化状態（オプショナル）
}

export default function TodoItem({ 
    todo, 
    onToggle, 
    onDelete, 
    disabled = false 
}: TodoItemProps) {
    // コンポーネントの実装
}
```

**解説:**
- Propsの型を明確に定義
- 必須プロパティとオプショナルプロパティを区別
- 関数の型も定義（引数と戻り値）

### 2. カスタムフックの型定義

```typescript
// src/hooks/useTodos.ts
export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);        // Todo配列
    const [loading, setLoading] = useState<boolean>(true); // ローディング状態
    const [error, setError] = useState<string | null>(null); // エラーメッセージ

    const addTodo = useCallback(async (formData: TodoFormData) => {
        // 実装
    }, []);

    return {
        todos,      // Todo[]
        loading,    // boolean
        error,      // string | null
        addTodo,    // (formData: TodoFormData) => Promise<void>
        // ...
    };
};
```

**解説:**
- 状態の型を明確に定義
- 関数の引数と戻り値の型を指定
- 戻り値のオブジェクトの型も推論される

### 3. API関数の型定義

```typescript
// src/lib/api.ts
class ApiClient {
    async getTodos(): Promise<Todo[]> {
        // 実装
    }

    async createTodo(data: TodoFormData): Promise<Todo> {
        // 実装
    }

    async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
        // 実装
    }
}
```

**解説:**
- 戻り値の型を`Promise<Todo[]>`で指定
- `Partial<Todo>`で部分的な更新を表現
- 非同期処理の型安全性を確保

## 🔧 高度な型定義

### 1. ユニオン型

```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

const [state, setState] = useState<LoadingState>('idle');
```

### 2. ジェネリクス

```typescript
interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

const response: ApiResponse<Todo[]> = {
    data: todos,
    message: "取得成功",
    success: true
};
```

### 3. 条件付き型

```typescript
type NonNullableTodo = NonNullable<Todo | null>;
type TodoKeys = keyof Todo; // "id" | "text" | "completed"
```

## 📚 型安全性のメリット

### 1. コンパイル時エラー検出

```typescript
// エラー: 型 'number' は型 'string' に割り当てられません
const todo: Todo = {
    id: 1,
    text: 123,        // エラー！
    completed: false
}
```

### 2. IDEサポート

```typescript
const todo: Todo = {
    id: 1,
    text: "買い物",
    completed: false
}

// IDEが自動補完を提供
todo.  // ← ここでプロパティの候補が表示される
```

### 3. リファクタリングの安全性

```typescript
// プロパティ名を変更した場合
interface Todo {
    id: number;
    title: string;  // text → title に変更
    completed: boolean;
}

// 使用箇所でエラーが表示される
console.log(todo.text) // エラー: プロパティ 'text' は存在しません
```

## 🚀 実践演習

### 演習1: 新しい型定義の作成
```typescript
// 期限付きTodoの型定義を作成
interface TodoWithDeadline extends Todo {
    deadline: Date;
    priority: 'low' | 'medium' | 'high';
}
```

### 演習2: 関数の型定義
```typescript
// Todoフィルタリング関数の型定義
type TodoFilter = (todo: Todo) => boolean;
type TodoSorter = (a: Todo, b: Todo) => number;
```

### 演習3: ユーティリティ型の活用
```typescript
// 読み取り専用のTodo型
type ReadonlyTodo = Readonly<Todo>;

// オプショナルなTodo型
type OptionalTodo = Partial<Todo>;
```

## 📖 学習のポイント

### 初心者向け
1. **基本的な型**: `string`, `number`, `boolean`
2. **インターフェース**: オブジェクトの型定義
3. **型注釈**: 変数や関数の型指定

### 中級者向け
1. **ジェネリクス**: 再利用可能な型定義
2. **ユニオン型**: 複数の型の組み合わせ
3. **型ガード**: 実行時の型チェック

### 上級者向け
1. **条件付き型**: 動的な型定義
2. **型推論**: TypeScriptの自動型判定
3. **型安全性**: エラーを防ぐ設計

## 📖 参考資料

- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs)
- [TypeScriptハンドブック](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React + TypeScript](https://react.dev/learn/typescript)
