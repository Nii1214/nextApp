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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="新しいタスクを入力..."
                    disabled={disabled || isSubmitting}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 text-sm"
                />
                <button
                    type="submit"
                    disabled={inputValue.trim() === '' || isSubmitting || disabled}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center gap-1 text-sm"
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
