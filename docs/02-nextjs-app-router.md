# Next.js App Router 基礎

## 🎯 App Routerとは

Next.js App Routerは、Next.js 13以降で導入された新しいルーティングシステムです。ファイルシステムベースのルーティングを採用し、より直感的で強力な機能を提供します。

### 従来のPages Routerとの違い

| 項目         | Pages Router                   | App Router                  |
| ------------ | ------------------------------ | --------------------------- |
| ディレクトリ | `pages/`                       | `app/`                      |
| ファイル名   | `index.js`, `[id].js`          | `page.tsx`, `[id]/page.tsx` |
| レイアウト   | `_app.js`, `_document.js`      | `layout.tsx`                |
| データ取得   | `getServerSideProps`           | Server Components           |
| スタイリング | CSS Modules, styled-components | CSS Modules, Tailwind CSS   |

## 📁 ファイルベースルーティング

### 基本的なルーティング

```
src/app/
├── page.tsx           # / (ホームページ)
├── about/
│   └── page.tsx      # /about
├── blog/
│   ├── page.tsx      # /blog
│   └── [slug]/
│       └── page.tsx  # /blog/hello-world
└── api/
    └── todos/
        └── route.ts  # /api/todos
```

### 特殊ファイル

| ファイル名      | 役割                     | 例                           |
| --------------- | ------------------------ | ---------------------------- |
| `page.tsx`      | ページコンポーネント     | `/about/page.tsx` → `/about` |
| `layout.tsx`    | レイアウトコンポーネント | 共通のヘッダー・フッター     |
| `loading.tsx`   | ローディングUI           | ページ読み込み中の表示       |
| `error.tsx`     | エラーUI                 | エラー発生時の表示           |
| `not-found.tsx` | 404ページ                | ページが見つからない場合     |
| `route.ts`      | API Routes               | `/api/todos`                 |

## 🏗️ プロジェクトでのApp Router構造

### 実際のディレクトリ構造

```
src/app/
├── layout.tsx         # ルートレイアウト
├── page.tsx           # ホームページ (/)
├── globals.css        # グローバルスタイル
├── favicon.ico        # ファビコン
├── api/               # API Routes
│   └── todos/
│       ├── route.ts   # GET/POST /api/todos
│       └── [id]/
│           └── route.ts # PUT/DELETE /api/todos/[id]
└── todo/
    └── page.tsx       # Todoページ (/todo)
```

### 各ファイルの役割

#### 1. `layout.tsx` - ルートレイアウト
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
```

**特徴:**
- すべてのページで共有されるレイアウト
- HTMLの基本構造を定義
- メタデータの設定
- グローバルスタイルの適用

#### 2. `page.tsx` - ページコンポーネント
```tsx
export default function HomePage() {
  return (
    <div>
      <h1>ホームページ</h1>
    </div>
  )
}
```

**特徴:**
- 各ルートに対応するUI
- Server Component（デフォルト）
- データ取得が可能

#### 3. `route.ts` - API Routes
```tsx
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json(body)
}
```

**特徴:**
- バックエンドAPIの実装
- HTTPメソッドの定義
- データベースとの連携

## 🔄 Server Components vs Client Components

### Server Components（デフォルト）

```tsx
// Server Component（'use client'ディレクティブなし）
export default function TodoList() {
  // サーバーサイドで実行
  const todos = await fetchTodos()
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}
```

**特徴:**
- サーバーサイドでレンダリング
- データベースに直接アクセス可能
- バンドルサイズに含まれない
- インタラクティブな機能は使用不可

### Client Components

```tsx
'use client' // このディレクティブが必要

import { useState } from 'react'

export default function TodoForm() {
  const [input, setInput] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // フォーム送信処理
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  )
}
```

**特徴:**
- クライアントサイドでレンダリング
- インタラクティブな機能が使用可能
- useState, useEffect等のReact Hooksが使用可能
- イベントハンドラーが使用可能

## 🎯 プロジェクトでの使用例

### 1. Todoページ（Client Component）
```tsx
// src/app/todo/page.tsx
import TodoContainer from '@/components/features/TodoContainer'

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <TodoContainer />
      </div>
    </div>
  )
}
```

**解説:**
- ページコンポーネントはServer Component
- インタラクティブな機能は`TodoContainer`に委譲
- レイアウトとスタイリングを担当

### 2. API Routes
```tsx
// src/app/api/todos/route.ts
export async function GET() {
  try {
    const response = await fetch(`${LARAVEL_API_URL}/todos`)
    const data = await response.json()
    
    const todos = data.data.map((item: any) => ({
      id: item.data.id,
      text: item.data.title,
      completed: item.data.completed,
    }))
    
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Todoの取得に失敗しました' },
      { status: 500 }
    )
  }
}
```

**解説:**
- サーバーサイドで実行
- 外部APIとの通信
- データ形式の変換
- エラーハンドリング

## 🔧 動的ルーティング

### 基本的な動的ルート
```
src/app/todos/[id]/page.tsx
```

**URL例:**
- `/todos/1` → `id = "1"`
- `/todos/abc` → `id = "abc"`

### 複数の動的セグメント
```
src/app/todos/[category]/[id]/page.tsx
```

**URL例:**
- `/todos/work/1` → `category = "work"`, `id = "1"`

### キャッチオールルート
```
src/app/blog/[...slug]/page.tsx
```

**URL例:**
- `/blog/2023/12/hello` → `slug = ["2023", "12", "hello"]`

## 📚 学習のポイント

### 初心者向け
1. **ファイル構造の理解**: ディレクトリとファイル名の関係
2. **基本的なルーティング**: ページの作成方法
3. **レイアウトの概念**: 共通UIの管理

### 中級者向け
1. **Server/Client Components**: 使い分けの判断
2. **動的ルーティング**: パラメータの取得
3. **API Routes**: バックエンド機能の実装

### 上級者向け
1. **パフォーマンス最適化**: レンダリング戦略
2. **SEO対策**: メタデータの管理
3. **セキュリティ**: API Routesの保護

## 🚀 実践演習

### 演習1: 新しいページの作成
1. `src/app/about/page.tsx` を作成
2. 簡単な自己紹介ページを実装
3. ナビゲーションからアクセスできるようにする

### 演習2: 動的ルートの実装
1. `src/app/todos/[id]/page.tsx` を作成
2. 個別のTodo詳細ページを実装
3. パラメータからTodo IDを取得

### 演習3: API Routesの拡張
1. 新しいAPIエンドポイントを作成
2. データの検索機能を実装
3. エラーハンドリングを追加

## 📖 参考資料

- [Next.js App Router公式ドキュメント](https://nextjs.org/docs/app)
- [Server Components vs Client Components](https://nextjs.org/docs/getting-started/react-essentials)
- [ルーティング基礎](https://nextjs.org/docs/app/building-your-application/routing)
