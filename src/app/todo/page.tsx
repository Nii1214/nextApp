'use client';

import Header from '@/components/ui/Header';
import TodoContainer from '@/components/features/todo/TodoContainer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function TodoPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Header />

                {/* ヒーローセクション */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-purple-600/20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-gray-100 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-4">
                                ToDo リスト
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                                タスクを管理して、効率的に作業を進めましょう。完了したタスクをチェックして、進捗を可視化できます。
                            </p>
                        </div>
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-12">
                        <TodoContainer />
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
