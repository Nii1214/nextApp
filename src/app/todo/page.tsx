'use client';

import Header from '@/components/ui/Header';
import TodoContainer from '@/components/features/todo/TodoContainer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function TodoPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                ToDo リスト
                            </h1>
                        </div>
                        <TodoContainer />
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
