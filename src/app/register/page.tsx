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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        ユーザー登録
                    </h2>
                    <p className="text-sm text-gray-600">
                        新しいアカウントを作成してください
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <RegisterForm />

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    既にアカウントをお持ちの方
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/login"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
