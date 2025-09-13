'use client';

import { ListTodo, CheckCircle, Layers } from 'lucide-react';

export type TodoTabType = 'all' | 'pending' | 'completed';

interface TodoTabsProps {
    activeTab: TodoTabType;
    onTabChange: (tab: TodoTabType) => void;
    stats: {
        total: number;
        completed: number;
        pending: number;
    };
}

export default function TodoTabs({ activeTab, onTabChange, stats }: TodoTabsProps) {
    const tabs = [
        {
            id: 'all' as TodoTabType,
            label: '全て',
            icon: Layers,
            count: stats.total,
        },
        {
            id: 'pending' as TodoTabType,
            label: '未完了',
            icon: ListTodo,
            count: stats.pending,
        },
        {
            id: 'completed' as TodoTabType,
            label: '完了済み',
            icon: CheckCircle,
            count: stats.completed,
        },
    ];

    const activeTabData = tabs.find(tab => tab.id === activeTab);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
            {/* デスクトップ用の横並びレイアウト */}
            <div className="hidden sm:flex space-x-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${isActive
                                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* モバイル用のプルダウンメニュー */}
            <div className="sm:hidden relative">
                <select
                    value={activeTab}
                    onChange={(e) => onTabChange(e.target.value as TodoTabType)}
                    className="w-full px-4 py-3 pr-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 appearance-none cursor-pointer"
                >
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <option key={tab.id} value={tab.id} className="py-2">
                                {tab.label} ({tab.count})
                            </option>
                        );
                    })}
                </select>

                {/* カスタムドロップダウンアイコン */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
