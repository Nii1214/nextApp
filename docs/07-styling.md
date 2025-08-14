# スタイリング

## 🎯 Tailwind CSSとは

Tailwind CSSは、ユーティリティファーストのCSSフレームワークです。事前に定義されたクラスを組み合わせることで、迅速で一貫性のあるデザインを実現できます。

### 従来のCSS vs Tailwind CSS

```css
/* 従来のCSS */
.todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease-in-out;
}

.todo-item:hover {
    background-color: #f3f4f6;
}

.todo-item.completed {
    opacity: 0.75;
}
```

```tsx
// Tailwind CSS
<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border transition-all hover:bg-gray-100 opacity-75">
    {/* コンテンツ */}
</div>
```

## 📁 プロジェクトのスタイリング構造

### ディレクトリ構造
```
src/
├── app/
│   └── globals.css        # グローバルスタイル
├── components/
│   ├── ui/               # UIコンポーネント（Tailwind CSS使用）
│   └── features/         # 機能コンポーネント
└── styles/               # カスタムスタイル（必要に応じて）
```

### グローバルスタイル
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
```

## 🔍 各コンポーネントのスタイリング解説

### 1. TodoForm コンポーネント

```tsx
// src/components/ui/TodoForm.tsx
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
```

**スタイリング解説:**

#### フォーム要素
- `flex gap-2 mb-6`: フレックスボックス、要素間のギャップ、下マージン
- `flex-1`: 残りのスペースを占有
- `px-4 py-2`: 水平・垂直パディング
- `border border-gray-300`: グレーの境界線
- `rounded-lg`: 大きな角丸

#### フォーカス状態
- `focus:outline-none`: デフォルトのアウトラインを削除
- `focus:ring-2 focus:ring-blue-500`: 青いリング効果
- `focus:border-transparent`: 境界線を透明に

#### 無効化状態
- `disabled:bg-gray-100`: 無効時の背景色
- `disabled:cursor-not-allowed`: 無効時のカーソル

#### ボタン
- `bg-blue-500 text-white`: 青い背景、白いテキスト
- `hover:bg-blue-600`: ホバー時の背景色
- `transition-colors`: 色の変化をアニメーション

### 2. TodoItem コンポーネント

```tsx
// src/components/ui/TodoItem.tsx
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
```

**スタイリング解説:**

#### コンテナ
- `flex items-center gap-3`: フレックスボックス、中央揃え、要素間ギャップ
- `p-3 bg-gray-50`: パディング、薄いグレー背景
- `rounded-lg border`: 角丸、境界線
- `transition-all`: すべてのプロパティのアニメーション

#### チェックボックス
- `w-5 h-5 rounded-full`: 5x5の円形
- `border-2`: 2pxの境界線
- `flex items-center justify-center`: 中央揃え
- `bg-green-500 border-green-500`: 完了時の緑色

#### テキスト
- `flex-1`: 残りのスペースを占有
- `line-through`: 完了時の取り消し線
- `text-gray-500`: 完了時のグレーテキスト

#### 削除ボタン
- `text-red-500 hover:text-red-700`: 赤色、ホバー時は濃い赤
- `transition-colors`: 色の変化をアニメーション

### 3. TodoStats コンポーネント

```tsx
// src/components/ui/TodoStats.tsx
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
```

**スタイリング解説:**

#### コンテナ
- `mt-6 pt-4`: 上マージン、上パディング
- `border-t border-gray-200`: 上境界線

#### 統計情報
- `flex justify-between`: 両端揃え
- `text-sm text-gray-600`: 小さなグレーテキスト

#### プログレスバー
- `w-full bg-gray-200`: 全幅、グレー背景
- `rounded-full h-2`: 円形、高さ2
- `bg-green-500`: 緑色の進捗
- `transition-all duration-300`: アニメーション

### 4. LoadingSpinner コンポーネント

```tsx
// src/components/ui/LoadingSpinner.tsx
<div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <span className="ml-2 text-gray-600">読み込み中...</span>
</div>
```

**スタイリング解説:**
- `flex justify-center items-center`: 中央揃え
- `animate-spin`: 回転アニメーション
- `rounded-full h-8 w-8`: 円形、8x8サイズ
- `border-b-2 border-blue-500`: 下境界線のみ

### 5. ErrorMessage コンポーネント

```tsx
// src/components/ui/ErrorMessage.tsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div className="flex items-center">
        <div className="text-red-500 mr-2">⚠️</div>
        <div className="flex-1">
            <p className="text-red-800 text-sm">{message}</p>
        </div>
        {onRetry && (
            <button
                onClick={onRetry}
                className="text-red-600 hover:text-red-800 text-sm font-medium underline"
            >
                再試行
            </button>
        )}
    </div>
</div>
```

**スタイリング解説:**
- `bg-red-50 border border-red-200`: 薄い赤背景、赤い境界線
- `rounded-lg p-4`: 角丸、パディング
- `text-red-500`: 赤いアイコン
- `text-red-800`: 濃い赤のテキスト
- `underline`: 下線付きリンク

## 🎨 レスポンシブデザイン

### ブレークポイント
```tsx
// モバイルファーストアプローチ
<div className="
    w-full           // モバイル: 全幅
    md:w-1/2         // タブレット: 半分
    lg:w-1/3         // デスクトップ: 3分の1
    xl:w-1/4         // 大画面: 4分の1
">
```

### 実際の使用例
```tsx
// src/app/todo/page.tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div className="max-w-md mx-auto">
        <TodoContainer />
    </div>
</div>
```

**解説:**
- `min-h-screen`: 最小高さを画面サイズに
- `bg-gradient-to-br`: 右下へのグラデーション
- `from-blue-50 to-indigo-100`: 青からインディゴへのグラデーション
- `py-8 px-4`: 垂直・水平パディング
- `max-w-md mx-auto`: 最大幅、中央揃え

## 🔧 カスタムスタイルの作成

### 1. コンポーネントクラス
```css
/* src/app/globals.css */
@layer components {
    .btn-primary {
        @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
    }
    
    .btn-secondary {
        @apply px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors;
    }
}
```

### 2. ユーティリティクラス
```css
@layer utilities {
    .text-shadow {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
}
```

## 📱 アクセシビリティ

### 1. フォーカス管理
```tsx
// フォーカス可能な要素
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    ボタン
</button>
```

### 2. キーボードナビゲーション
```tsx
// キーボードショートカット
<input
    onKeyPress={(e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }}
    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
```

### 3. スクリーンリーダー対応
```tsx
// aria属性の使用
<button
    aria-label="Todoを完了にする"
    aria-pressed={todo.completed}
    className="..."
>
    {todo.completed && '✓'}
</button>
```

## 🚀 実践演習

### 演習1: 新しいコンポーネントのスタイリング
```tsx
// SearchInputコンポーネント
<div className="relative">
    <input
        type="text"
        placeholder="検索..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
</div>
```

### 演習2: アニメーションの追加
```tsx
// フェードインアニメーション
<div className="animate-fade-in">
    <TodoItem />
</div>

// globals.css
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}
```

### 演習3: ダークモード対応
```tsx
// ダークモード対応のスタイリング
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
    <div className="border border-gray-200 dark:border-gray-700">
        <input className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
    </div>
</div>
```

## 📚 学習のポイント

### 初心者向け
1. **ユーティリティクラス**: 基本的なクラスの理解
2. **レスポンシブ**: ブレークポイントの使用方法
3. **コンポーネント**: 再利用可能なスタイルの作成

### 中級者向け
1. **カスタマイズ**: テーマの設定とカスタマイズ
2. **パフォーマンス**: 最適化とバンドルサイズ
3. **アクセシビリティ**: ユニバーサルデザイン

### 上級者向け
1. **デザインシステム**: 一貫性のあるデザイン
2. **アニメーション**: 高度なアニメーション効果
3. **パフォーマンス**: 最適化とベストプラクティス

## 📖 参考資料

- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Tailwind CSS設定](https://tailwindcss.com/docs/configuration)
- [レスポンシブデザイン](https://tailwindcss.com/docs/responsive-design)
- [アクセシビリティ](https://tailwindcss.com/docs/accessibility)
