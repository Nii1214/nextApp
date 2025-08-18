'use client';

import { ListTodo, CheckCircle, Layers } from 'lucide-react';
import { TodoTabType } from './TodoTabs';

interface TodoEmptyStateProps {
    activeTab: TodoTabType;
}

export default function TodoEmptyState({ activeTab }: TodoEmptyStateProps) {
    const getEmptyStateConfig = () => {
        switch (activeTab) {
            case 'pending':
                return {
                    icon: ListTodo,
                    title: '未完了のタスクがありません',
                    description: '全てのタスクが完了しています！お疲れ様でした。',
                    iconColor: 'text-blue-500'
                };
            case 'completed':
                return {
                    icon: CheckCircle,
                    title: '完了済みのタスクがありません',
                    description: 'まだタスクを完了していません。頑張りましょう！',
                    iconColor: 'text-green-500'
                };
            default:
                return {
                    icon: Layers,
                    title: 'タスクがありません',
                    description: '新しいタスクを追加して、生産性を向上させましょう！',
                    iconColor: 'text-gray-500'
                };
        }
    };

    const config = getEmptyStateConfig();
    const Icon = config.icon;

    return (
        <div className="text-center py-12">
            <div className={`mx-auto w-16 h-16 ${config.iconColor} mb-4`}>
                <Icon className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {config.title}
            </h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
                {config.description}
            </p>
        </div>
    );
}
