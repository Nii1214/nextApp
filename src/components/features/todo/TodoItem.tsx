'use client';

import { Todo } from '@/types/todo';
import { Check, Trash2 } from 'lucide-react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    disabled?: boolean;
}

export default function TodoItem({ todo, onToggle, onDelete, disabled = false }: TodoItemProps) {
    const handleToggle = async () => {
        if (!disabled) {
            await onToggle(todo.id);
        }
    };

    const handleDelete = async () => {
        if (!disabled) {
            await onDelete(todo.id);
        }
    };

    return (
        <div
            className={`flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md min-h-[72px] ${todo.completed ? 'opacity-75' : ''
                } ${disabled ? 'cursor-not-allowed' : ''}`}
        >
            <button
                onClick={handleToggle}
                disabled={disabled}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${todo.completed
                    ? 'bg-green-500 border-green-500 text-white shadow-sm'
                    : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                aria-label={todo.completed ? '完了を解除' : '完了にする'}
            >
                {todo.completed && <Check className="w-4 h-4" />}
            </button>

            <span
                className={`flex-1 text-sm leading-relaxed flex items-center min-h-[24px] ${todo.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-gray-100'
                    }`}
            >
                {todo.text}
            </span>

            <button
                onClick={handleDelete}
                disabled={disabled}
                className={`p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 ${disabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                aria-label="削除"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
