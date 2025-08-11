# Next.js アプリケーション

このプロジェクトは、Next.js 15.4.6を使用した最新のWebアプリケーションです。

## 🚀 技術スタック

- **フレームワーク**: Next.js 15.4.6
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4.0
- **フォント**: Geist (Google Fonts)
- **コード品質**: ESLint
- **ルーティング**: App Router

## 📁 プロジェクト構造

```
next-js-app/
├── src/
│   └── app/
│       ├── layout.tsx      # ルートレイアウト
│       ├── page.tsx        # ホームページ
│       ├── globals.css     # グローバルスタイル
│       └── favicon.ico     # ファビコン
├── public/                 # 静的ファイル
├── node_modules/          # 依存関係
├── package.json           # プロジェクト設定
├── package-lock.json      # 依存関係ロック
├── tsconfig.json          # TypeScript設定
├── next.config.ts         # Next.js設定
├── postcss.config.mjs     # PostCSS設定
├── eslint.config.mjs      # ESLint設定
├── next-env.d.ts          # Next.js型定義
└── README.md              # このファイル
```

## 🛠️ セットアップ

### 前提条件
- Node.js 18.17以上
- npm または yarn

### インストール
```bash
# 依存関係のインストール
npm install
```

## 🏃‍♂️ 開発

### 開発サーバーの起動
```bash
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

### 利用可能なスクリプト

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番用ビルド
npm run start    # 本番サーバー起動
npm run lint     # ESLintによるコード品質チェック
```

## 📝 開発ガイド

### ページの追加
新しいページを作成するには、`src/app/` ディレクトリに新しいフォルダと `page.tsx` ファイルを作成します。

例：
```
src/app/about/page.tsx  # /about ページ
src/app/blog/page.tsx   # /blog ページ
```

### コンポーネントの作成
再利用可能なコンポーネントは `src/components/` ディレクトリに配置することを推奨します。

### スタイリング
このプロジェクトでは Tailwind CSS を使用しています。クラス名を直接使用してスタイリングできます。

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello World
</div>
```

## 🔧 設定ファイル

### TypeScript設定 (`tsconfig.json`)
- 厳密な型チェック
- パスエイリアス: `@/*` → `src/*`

### Next.js設定 (`next.config.ts`)
- 基本的なNext.js設定
- 必要に応じてカスタマイズ可能

### Tailwind CSS設定
- 最新のTailwind CSS 4.0を使用
- PostCSS設定済み

## 🌐 デプロイ

### Vercel（推奨）
このプロジェクトはVercelに簡単にデプロイできます：

1. [Vercel](https://vercel.com) にアカウントを作成
2. GitHubリポジトリを接続
3. 自動デプロイが開始されます

### その他のプラットフォーム
```bash
# ビルド
npm run build

# 本番サーバー起動
npm run start
```

## 📚 学習リソース

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Next.js学習チュートリアル](https://nextjs.org/learn)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🆘 サポート

問題が発生した場合や質問がある場合は、以下をご確認ください：

1. [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)
2. [Next.js Discord](https://discord.gg/nextjs)
3. [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

**Happy Coding! 🎉**
