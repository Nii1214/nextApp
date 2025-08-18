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

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <div className="flex space-x-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-blue-500 text-white shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
