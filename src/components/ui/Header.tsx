'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckSquare, Menu, LogOut, User, FolderOpen, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/Icon';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-12 justify-between">
                    {/* ロゴ・ブランド（左端に配置） */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Icon icon={faLaptopCode} className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">デブリオ</span>
                        </Link>
                    </div>
                    {/* ナビゲーション（中央に配置） */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                                }`}
                        >
                            <Home className="w-4 h-4" />
                            <span>ホーム</span>
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/todo"
                                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/todo'
                                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                                        }`}
                                >
                                    <CheckSquare className="w-4 h-4" />
                                    <span>ToDo</span>
                                </Link>
                                <Link
                                    href="/portfolioProjectList"
                                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/portfolioProjectList'
                                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                                        }`}
                                >
                                    <FolderOpen className="w-4 h-4" />
                                    <span>ポートフォリオ</span>
                                </Link>
                            </>
                        )}
                    </nav>
                    {/* ユーザーメニュー（右端に配置） */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                                    <User className="w-4 h-4" />
                                    <span>{user?.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>ログアウト</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                >
                                    <span>ログイン</span>
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                                >
                                    <span>登録</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* モバイルメニューボタン */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* モバイルメニュー */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* ナビゲーションリンク */}
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/'
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <Home className="w-5 h-5 mr-3" />
                                    ホーム
                                </div>
                            </Link>

                            {isAuthenticated && (
                                <>
                                    <Link
                                        href="/todo"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/todo'
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <CheckSquare className="w-5 h-5 mr-3" />
                                            ToDo
                                        </div>
                                    </Link>
                                    <Link
                                        href="/portfolioProjectList"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/portfolioProjectList'
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <FolderOpen className="w-5 h-5 mr-3" />
                                            ポートフォリオ
                                        </div>
                                    </Link>
                                </>
                            )}

                            {/* ユーザーメニュー */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                                {isAuthenticated ? (
                                    <>
                                        <div className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            <User className="w-5 h-5 mr-3" />
                                            {user?.name}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <LogOut className="w-5 h-5 mr-3" />
                                                ログアウト
                                            </div>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            ログイン
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                                        >
                                            登録
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
