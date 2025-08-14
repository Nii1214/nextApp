'use client';

import TodoContainer from '@/components/features/todo/TodoContainer';

export default function TodoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-md mx-auto">
                <TodoContainer />
            </div>
        </div>
    );
}
