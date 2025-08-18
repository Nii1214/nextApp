'use client';

import Image from "next/image";
import Header from '@/components/ui/Header';
import { CheckSquare, BookOpen, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  // ローディング中はスピナーを表示
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center gap-8">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={200}
              height={42}
              priority
            />

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Next.js アプリケーションへようこそ
              </h1>
              <p className="text-base text-gray-600 mb-6 max-w-2xl">
                このアプリケーションは学習用・ポートフォリオ用として開発されています。
                React、TypeScript、Tailwind CSSを使用したモダンなWebアプリケーションです。
              </p>
            </div>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              {isAuthenticated ? (
                <a
                  className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 font-medium text-sm h-10 px-6"
                  href="/todo"
                >
                  <CheckSquare className="w-5 h-5" />
                  <span>ToDo アプリ</span>
                </a>
              ) : (
                <>
                  <a
                    className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 font-medium text-sm h-10 px-6"
                    href="/login"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>ログイン</span>
                  </a>
                  <a
                    className="rounded-lg border border-solid border-gray-200 transition-colors flex items-center justify-center hover:bg-gray-50 font-medium text-sm h-10 px-6"
                    href="/register"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>ユーザー登録</span>
                  </a>
                </>
              )}
              <a
                className="rounded-lg border border-solid border-gray-200 transition-colors flex items-center justify-center hover:bg-gray-50 font-medium text-sm h-10 px-6"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="w-5 h-5" />
                <span>ドキュメント</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
