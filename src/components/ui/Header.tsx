'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckSquare, Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/Icon';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-12 justify-between">
                    {/* ロゴ・ブランド（左端に配置） */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Icon icon={faLaptopCode} className="w-6 h-6 text-blue-500" />
                            <span className="text-lg font-bold text-gray-900">デブリオ</span>
                        </Link>
                    </div>
                    {/* ナビゲーション（中央に配置） */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Home className="w-4 h-4" />
                            <span>ホーム</span>
                        </Link>
                        {isAuthenticated && (
                            <Link
                                href="/todo"
                                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/todo'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <CheckSquare className="w-4 h-4" />
                                <span>ToDo</span>
                            </Link>
                        )}
                    </nav>
                    {/* ユーザーメニュー（右端に配置） */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-700">
                                    <User className="w-4 h-4" />
                                    <span>{user?.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>ログアウト</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <span>ログイン</span>
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    <span>登録</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* モバイルメニューボタン */}
                    <div className="md:hidden">
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
