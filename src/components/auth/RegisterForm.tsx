'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterCredentials } from '@/types/auth';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function RegisterForm() {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // パスワード確認
        if (credentials.password !== credentials.password_confirmation) {
            setError('パスワードが一致しません');
            return;
        }

        setIsLoading(true);

        try {
            await register(credentials);
            router.push('/todo');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ユーザー登録に失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <ErrorMessage message={error} />}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    お名前
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="山田太郎"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="example@email.com"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    パスワード
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="8文字以上で入力"
                />
            </div>

            <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                    パスワード（確認）
                </label>
                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={credentials.password_confirmation}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="パスワードを再入力"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? '登録中...' : 'ユーザー登録'}
            </button>
        </form>
    );
}
