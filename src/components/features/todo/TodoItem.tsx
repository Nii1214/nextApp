'use client';

import { Todo } from '@/types/todo';

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
            className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg border transition-all ${todo.completed ? 'opacity-75' : ''
                } ${disabled ? 'cursor-not-allowed' : ''}`}
        >
            <button
                onClick={handleToggle}
                disabled={disabled}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                {todo.completed && '✓'}
            </button>

            <span
                className={`flex-1 ${todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
            >
                {todo.text}
            </span>

            <button
                onClick={handleDelete}
                disabled={disabled}
                className={`text-red-500 hover:text-red-700 transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
            >
                🗑️
            </button>
        </div>
    );
}
