# デプロイメント

## 🎯 デプロイメントとは

デプロイメントは、開発したアプリケーションを本番環境に公開するプロセスです。Next.jsアプリケーションは、Vercel、Netlify、AWS、Google Cloud Platformなど、様々なプラットフォームにデプロイできます。

### デプロイメントの流れ
```
開発環境 → ビルド → テスト → 本番環境 → 公開
```

## 🛠️ 本番環境の準備

### 1. 環境変数の設定

#### 開発環境（.env.local）
```env
# Laravel API URL（開発環境）
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

#### 本番環境
```env
# Laravel API URL（本番環境）
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### 2. ビルド設定の確認

#### next.config.ts
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // 本番環境での最適化設定
    output: 'standalone', // Dockerデプロイ用
    experimental: {
        // 実験的機能の設定
    },
    // 画像最適化
    images: {
        domains: ['your-api-domain.com'],
    },
    // セキュリティヘッダー
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
```

### 3. パッケージ設定の確認

#### package.json
```json
{
  "name": "next-js-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.4.6"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.4.6",
    "@eslint/eslintrc": "^3"
  }
}
```

## 🚀 Vercelでのデプロイメント（推奨）

### 1. Vercelアカウントの作成
1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでサインアップ
3. プロジェクトのインポート

### 2. プロジェクトの接続
```bash
# Vercel CLIのインストール
npm i -g vercel

# プロジェクトディレクトリで実行
vercel

# 対話形式で設定
? Set up and deploy "~/next-js-app"? [Y/n] y
? Which scope do you want to deploy to? your-username
? Link to existing project? [y/N] n
? What's your project's name? next-js-todo-app
? In which directory is your code located? ./
```

### 3. 環境変数の設定
Vercelダッシュボードで環境変数を設定：
```
NEXT_PUBLIC_API_URL=https://your-laravel-api.com/api
```

### 4. 自動デプロイメント
GitHubリポジトリと連携することで、プッシュ時に自動デプロイ：
```bash
# コードをプッシュ
git add .
git commit -m "feat: 本番環境用の設定を追加"
git push origin main
```

## 🐳 Dockerでのデプロイメント

### 1. Dockerfileの作成
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# 依存関係のインストール
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json* ./
RUN npm ci

# アプリケーションのビルド
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境変数の設定
ENV NEXT_TELEMETRY_DISABLED 1

# ビルドの実行
RUN npm run build

# 本番環境の実行
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 自動的に利用可能な出力トラッキングを設定
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. .dockerignoreの作成
```dockerignore
# .dockerignore
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.git
.gitignore
.next
.vercel
```

### 3. Docker Composeの設定
```yaml
# docker-compose.yml
version: '3.8'

services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://laravel-api:8000/api
    depends_on:
      - laravel-api

  laravel-api:
    image: your-laravel-api:latest
    ports:
      - "8000:8000"
    environment:
      - DB_HOST=database
      - DB_DATABASE=todos
      - DB_USERNAME=root
      - DB_PASSWORD=password

  database:
    image: mysql:8.0
    environment:
      - MYSQL_DATABASE=todos
      - MYSQL_ROOT_PASSWORD=password
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 4. Dockerでの実行
```bash
# イメージのビルド
docker build -t next-js-todo-app .

# コンテナの実行
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000/api next-js-todo-app

# Docker Composeでの実行
docker-compose up -d
```

## ☁️ その他のプラットフォーム

### 1. Netlify
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. AWS Amplify
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 3. Google Cloud Platform
```yaml
# app.yaml
runtime: nodejs18
env: standard

env_variables:
  NODE_ENV: "production"
  NEXT_PUBLIC_API_URL: "https://your-api-domain.com/api"

automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 1
  max_instances: 10
```

## 📊 パフォーマンス最適化

### 1. ビルド最適化
```bash
# 本番ビルドの実行
npm run build

# ビルド結果の確認
npm run start
```

### 2. 画像最適化
```tsx
// next/imageの使用
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
/>
```

### 3. コード分割
```tsx
// 動的インポート
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
```

## 🔒 セキュリティ対策

### 1. 環境変数の管理
```bash
# 本番環境での環境変数設定
export NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
export NODE_ENV=production
```

### 2. HTTPSの強制
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
}
```

### 3. CSP（Content Security Policy）
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
}
```

## 📈 監視とログ

### 1. エラーモニタリング
```typescript
// エラーハンドリングの追加
export function reportWebVitals(metric: any) {
  console.log(metric)
  // 分析サービスに送信
  if (metric.label === 'web-vital') {
    // Google Analytics、Vercel Analytics等
  }
}
```

### 2. パフォーマンス監視
```typescript
// パフォーマンスメトリクスの収集
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## 🚀 実践演習

### 演習1: Vercelでのデプロイメント
```bash
# 1. GitHubリポジトリの作成
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/next-js-todo-app.git
git push -u origin main

# 2. Vercelでのデプロイ
# VercelダッシュボードでGitHubリポジトリをインポート
```

### 演習2: 環境変数の設定
```bash
# 本番環境用の環境変数ファイル
# .env.production
NEXT_PUBLIC_API_URL=https://your-production-api.com/api
NODE_ENV=production
```

### 演習3: カスタムドメインの設定
```bash
# Vercelでのカスタムドメイン設定
# 1. Vercelダッシュボードでドメインを追加
# 2. DNSレコードの設定
# 3. SSL証明書の自動発行
```

## 📚 学習のポイント

### 初心者向け
1. **基本的なデプロイ**: Vercelでの簡単デプロイ
2. **環境変数**: 開発・本番環境の設定
3. **ビルドプロセス**: npm run buildの理解

### 中級者向け
1. **Docker**: コンテナ化とデプロイ
2. **CI/CD**: 自動化パイプライン
3. **パフォーマンス**: 最適化手法

### 上級者向け
1. **インフラ**: クラウドインフラの設計
2. **セキュリティ**: 本番環境のセキュリティ
3. **監視**: アプリケーションの監視とログ

## 📖 参考資料

- [Next.js デプロイメント](https://nextjs.org/docs/deployment)
- [Vercel ドキュメント](https://vercel.com/docs)
- [Docker ドキュメント](https://docs.docker.com/)
- [Web Vitals](https://web.dev/vitals/)
