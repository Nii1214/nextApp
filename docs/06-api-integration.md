# API連携

## 🎯 API連携とは

API連携は、フロントエンド（Next.js）とバックエンド（Laravel API）の間でデータをやり取りする仕組みです。このプロジェクトでは、Next.js API Routesを介してLaravel APIと通信し、安全で効率的なデータ交換を実現しています。

### 通信フロー
```
ブラウザ → Next.js API Routes → Laravel API → データベース
```

## 📁 プロジェクトのAPI連携構造

### ディレクトリ構造
```
src/
├── lib/
│   └── api.ts           # APIクライアント
└── app/
    └── api/
        └── todos/
            ├── route.ts     # GET/POST /api/todos
            └── [id]/
                └── route.ts # PUT/DELETE /api/todos/[id]
```

## 🔍 各ファイルの詳細解説

### 1. APIクライアント（api.ts）

```typescript
// src/lib/api.ts
import { Todo, TodoFormData } from '@/types/todo';

class ApiClient {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `/api${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Todo関連のAPI
    async getTodos(): Promise<Todo[]> {
        return this.request<Todo[]>('/todos');
    }

    async createTodo(data: TodoFormData): Promise<Todo> {
        return this.request<Todo>('/todos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
        return this.request<Todo>(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteTodo(id: number): Promise<void> {
        return this.request<void>(`/todos/${id}`, {
            method: 'DELETE',
        });
    }

    async toggleTodo(id: number, completed: boolean): Promise<Todo> {
        return this.updateTodo(id, { completed });
    }
}

export const apiClient = new ApiClient();
```

**解説:**
- **クラス設計**: 再利用可能なAPIクライアント
- **型安全性**: TypeScriptで戻り値の型を指定
- **エラーハンドリング**: 統一されたエラー処理
- **メソッド設計**: 各API操作に対応するメソッド

### 2. Next.js API Routes（route.ts）

#### GET/POST /api/todos

```typescript
// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function GET() {
    try {
        const response = await fetch(`${LARAVEL_API_URL}/todos`);

        if (!response.ok) {
            throw new Error(`Laravel API Error: ${response.status}`);
        }

        const data = await response.json();

        // Laravel APIのレスポンス形式を変換
        const todos = data.data.map((item: any) => {
            const todo = item.data; // ネストされたdataオブジェクトから取得
            return {
                id: todo.id,
                text: todo.title, // titleをtextに変換
                completed: todo.completed,
            };
        });

        return NextResponse.json(todos);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Todoの取得に失敗しました' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // フロントエンドの形式をLaravel APIの形式に変換
        const laravelData = {
            title: body.text, // textをtitleに変換
            description: body.text, // 説明も同じテキストを使用
        };

        const response = await fetch(`${LARAVEL_API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(laravelData),
        });

        if (!response.ok) {
            throw new Error(`Laravel API Error: ${response.status}`);
        }

        const data = await response.json();

        // Laravel APIのレスポンス形式を変換
        const todo = data.data; // dataオブジェクトから取得
        return NextResponse.json({
            id: todo.id,
            text: todo.title, // titleをtextに変換
            completed: todo.completed,
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Todoの作成に失敗しました' },
            { status: 500 }
        );
    }
}
```

**解説:**
- **プロキシ機能**: Laravel APIへのリクエストを中継
- **データ変換**: フロントエンドとバックエンドの形式を変換
- **エラーハンドリング**: 適切なエラーレスポンス
- **環境変数**: API URLの設定

#### PUT/DELETE /api/todos/[id]

```typescript
// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // フロントエンドの形式をLaravel APIの形式に変換
        const laravelData: any = {};
        if (body.text !== undefined) {
            laravelData.title = body.text;
            laravelData.description = body.text;
        }
        if (body.completed !== undefined) {
            laravelData.completed = body.completed;
        }

        const response = await fetch(`${LARAVEL_API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(laravelData),
        });

        if (!response.ok) {
            throw new Error(`Laravel API Error: ${response.status}`);
        }

        const data = await response.json();

        // Laravel APIのレスポンス形式を変換
        const todo = data.data; // dataオブジェクトから取得
        return NextResponse.json({
            id: todo.id,
            text: todo.title, // titleをtextに変換
            completed: todo.completed,
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Todoの更新に失敗しました' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(`${LARAVEL_API_URL}/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Laravel API Error: ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Todoの削除に失敗しました' },
            { status: 500 }
        );
    }
}
```

**解説:**
- **動的ルート**: `[id]`パラメータの取得
- **条件付き更新**: 部分的なデータ更新
- **非同期パラメータ**: Next.js 15の新しい仕様
- **削除処理**: 成功時のレスポンス

## 🔄 データ変換の詳細

### フロントエンド形式
```typescript
interface Todo {
    id: number;
    text: string;      // フロントエンドでは "text"
    completed: boolean;
}
```

### Laravel API形式
```typescript
interface LaravelTodo {
    id: number;
    title: string;     // Laravel APIでは "title"
    description: string;
    completed: boolean;
}
```

### 変換処理
```typescript
// フロントエンド → Laravel API
const laravelData = {
    title: body.text,        // text → title
    description: body.text,  // 説明も同じテキスト
};

// Laravel API → フロントエンド
const todo = {
    id: data.data.id,
    text: data.data.title,   // title → text
    completed: data.data.completed,
};
```

## 🛡️ セキュリティ対策

### 1. 環境変数の使用
```typescript
const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
```

### 2. エラーハンドリング
```typescript
try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
} catch (error) {
    console.error('API request failed:', error);
    throw error;
}
```

### 3. 入力値の検証
```typescript
// フロントエンドでの検証
if (inputValue.trim() === '') {
    return;
}

// サーバーサイドでの検証
if (!body.text || typeof body.text !== 'string') {
    return NextResponse.json(
        { error: '無効なデータです' },
        { status: 400 }
    );
}
```

## 📊 パフォーマンス最適化

### 1. キャッシュ戦略
```typescript
// キャッシュヘッダーの設定
const response = await fetch(url, {
    headers: {
        'Cache-Control': 'max-age=60', // 60秒間キャッシュ
    },
});
```

### 2. エラーレトライ
```typescript
async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetch(url, options);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

### 3. リクエストの最適化
```typescript
// 不要なリクエストの防止
const [isSubmitting, setIsSubmitting] = useState(false);

if (isSubmitting) {
    return; // 既に送信中なら何もしない
}
```

## 🚀 実践演習

### 演習1: 新しいAPIエンドポイントの作成
```typescript
// 検索機能のAPI
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
        return NextResponse.json({ error: '検索クエリが必要です' }, { status: 400 });
    }
    
    // Laravel APIに検索クエリを送信
    const response = await fetch(`${LARAVEL_API_URL}/todos/search?q=${encodeURIComponent(query)}`);
    // ...
}
```

### 演習2: バッチ処理の実装
```typescript
// 複数のTodoを一括更新
export async function PATCH(request: NextRequest) {
    const body = await request.json();
    const { ids, completed } = body;
    
    // 並列で更新処理を実行
    const promises = ids.map(id => 
        fetch(`${LARAVEL_API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        })
    );
    
    await Promise.all(promises);
    return NextResponse.json({ success: true });
}
```

### 演習3: リアルタイム更新の実装
```typescript
// WebSocketを使用したリアルタイム更新
import { Server } from 'socket.io';

const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('todo-updated', (data) => {
        socket.broadcast.emit('todo-updated', data);
    });
});
```

## 📚 学習のポイント

### 初心者向け
1. **HTTPメソッド**: GET, POST, PUT, DELETEの理解
2. **非同期処理**: async/awaitの使用方法
3. **エラーハンドリング**: try-catchの活用

### 中級者向け
1. **API設計**: RESTful APIの設計原則
2. **データ変換**: フロントエンドとバックエンドの形式変換
3. **セキュリティ**: 適切なセキュリティ対策

### 上級者向け
1. **パフォーマンス**: キャッシュと最適化戦略
2. **スケーラビリティ**: 大規模システムの設計
3. **モニタリング**: APIの監視とログ管理

## 📖 参考資料

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)
- [RESTful API設計](https://restfulapi.net/)
- [HTTPステータスコード](https://developer.mozilla.org/ja/docs/Web/HTTP/Status)
