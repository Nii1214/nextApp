'use client';

import { useState } from 'react';
import { TodoFormData } from '@/types/todo';

interface TodoFormProps {
    onSubmit: (data: TodoFormData) => Promise<void>;
    disabled?: boolean;
}

export default function TodoForm({ onSubmit, disabled = false }: TodoFormProps) {
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.trim() === '' || isSubmitting || disabled) {
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit({ text: inputValue.trim() });
            setInputValue('');
        } catch (error) {
            console.error('Todo追加エラー:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="新しいタスクを入力..."
                disabled={disabled || isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
                type="submit"
                disabled={inputValue.trim() === '' || isSubmitting || disabled}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
            >
                {isSubmitting ? '追加中...' : '追加'}
            </button>
        </form>
    );
}
