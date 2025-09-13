'use client';

import { Todo } from '@/types/todo';

interface TodoStatsProps {
    todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;

    if (total === 0) {
        return null;
    }

    return (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>総タスク数: {total}</span>
                <span>完了済み: {completed}</span>
                <span>未完了: {pending}</span>
            </div>

            {/* プログレスバー */}
            <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-green-500 dark:bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                    />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                    {total > 0 ? Math.round((completed / total) * 100) : 0}% 完了
                </div>
            </div>
        </div>
    );
}
