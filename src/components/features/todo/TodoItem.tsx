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
            className={`flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md ${todo.completed ? 'opacity-75' : ''
                } ${disabled ? 'cursor-not-allowed' : ''}`}
        >
            <button
                onClick={handleToggle}
                disabled={disabled}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${todo.completed
                    ? 'bg-green-500 border-green-500 text-white shadow-sm'
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                aria-label={todo.completed ? '完了を解除' : '完了にする'}
            >
                {todo.completed && <Check className="w-4 h-4" />}
            </button>

            <span
                className={`flex-1 text-sm leading-normal ${todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-900'
                    }`}
            >
                {todo.text}
            </span>

            <button
                onClick={handleDelete}
                disabled={disabled}
                className={`p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 ${disabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                aria-label="削除"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
