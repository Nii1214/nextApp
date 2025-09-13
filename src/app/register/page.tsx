'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import RegisterForm from '@/components/auth/RegisterForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function RegisterPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // 既に認証されている場合はToDo画面にリダイレクト
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/todo');
        }
    }, [isAuthenticated, isLoading, router]);

    // ローディング中はスピナーを表示
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // 既に認証されている場合は何も表示しない（リダイレクト中）
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            {/* ヒーローセクション */}
            <div className="relative overflow-hidden mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-purple-600/20"></div>
                <div className="relative max-w-md mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-gray-100 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-4">
                            ユーザー登録
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                            新しいアカウントを作成してください
                        </p>
                    </div>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 py-6 sm:py-8 px-4 sm:px-6 md:px-10">
                    <RegisterForm />

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 font-medium">
                                    既にアカウントをお持ちの方
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/login"
                                className="w-full flex justify-center py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200"
                            >
                                ログイン
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
