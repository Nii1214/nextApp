'use client';

import { useState } from 'react';
import { TodoFormData } from '@/types/todo';
import { Plus, Loader2 } from 'lucide-react';

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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="新しいタスクを入力..."
                    disabled={disabled || isSubmitting}
                    className="flex-1 px-3 py-3 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-sm bg-white dark:bg-gray-700"
                />
                <button
                    type="submit"
                    disabled={inputValue.trim() === '' || isSubmitting || disabled}
                    className="px-4 py-3 sm:py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 sm:gap-1 text-sm"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>追加中</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4" />
                            <span>追加</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
