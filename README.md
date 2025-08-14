# Next.js Todo アプリケーション

Next.js 15.4.6を使用したTodo管理アプリケーションです。Laravel APIと連携してデータを管理します。

## 技術スタック

- **フロントエンド**: Next.js 15.4.6 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **バックエンド**: Laravel API
- **リンター**: ESLint

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Laravel API プロキシ)
│   ├── todo/              # Todoページ
│   └── layout.tsx         # ルートレイアウト
├── components/            # 再利用可能なコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   └── features/         # 機能別コンポーネント
├── types/                # TypeScript型定義
├── lib/                  # ユーティリティ関数
└── hooks/                # カスタムフック
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、Laravel APIのURLを設定してください：

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Laravel APIの準備

Laravel APIが以下のエンドポイントを提供していることを確認してください：

- `GET /api/todos` - Todo一覧取得
- `POST /api/todos` - Todo作成
- `PUT /api/todos/{id}` - Todo更新
- `DELETE /api/todos/{id}` - Todo削除

### 4. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で起動します。

## 機能

### Todo管理
- ✅ Todoの追加
- ✅ Todoの完了/未完了切り替え
- ✅ Todoの削除
- ✅ 統計情報の表示（総数、完了数、未完了数）

### UI/UX
- 📱 モバイルファーストデザイン
- 🎨 モダンなUI（Tailwind CSS）
- ⚡ リアルタイム更新
- 🔄 ローディング状態の表示
- ⚠️ エラーハンドリング

## コンポーネント構成

### UI コンポーネント（汎用的）
- `LoadingSpinner` - ローディング表示
- `ErrorMessage` - エラーメッセージ表示

### 機能コンポーネント（Todo機能専用）
- `TodoForm` - Todo追加フォーム
- `TodoItem` - 個別のTodoアイテム
- `TodoList` - Todoリスト表示
- `TodoStats` - 統計情報表示
- `TodoContainer` - Todo機能全体の統合

### カスタムフック
- `useTodos` - Todoデータの状態管理

## API連携

### Laravel APIとの通信
Next.js API Routesを介してLaravel APIと通信します：

- `/api/todos` - Todo一覧取得・作成
- `/api/todos/[id]` - Todo更新・削除

### エラーハンドリング
- API通信エラーの適切な処理
- ユーザーフレンドリーなエラーメッセージ
- 再試行機能

## 開発

### コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# リンター実行
npm run lint
```

### コード規約
- TypeScriptの厳密な型チェック
- ESLintによるコード品質管理
- コンポーネントの単一責任原則
- 適切なエラーハンドリング

## デプロイ

### Vercel推奨
1. GitHubリポジトリと連携
2. 環境変数の設定
3. 自動デプロイ

### 環境変数
本番環境でも以下の環境変数を設定してください：
- `NEXT_PUBLIC_API_URL` - Laravel APIの本番URL

## トラブルシューティング

### よくある問題

1. **API通信エラー**
   - Laravel APIが起動しているか確認
   - 環境変数の設定を確認
   - CORS設定を確認

2. **ビルドエラー**
   - TypeScriptエラーの確認
   - 依存関係の確認

3. **スタイル問題**
   - Tailwind CSSの設定確認
   - クラス名の確認

## ライセンス

MIT License
