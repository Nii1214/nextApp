'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PortfolioProjectList from '@/components/features/portfolioProjectList/PortfolioProjectList';
import { PortfolioProject } from '@/types/portfolioProject';

export default function PortfolioProjectListPage() {
    // デモ用のサンプルデータ（実際の実装ではusePortfolioProjectフックを使用）
    const [projects] = useState<PortfolioProject[]>([
        {
            id: 1,
            title: "ECサイト開発プロジェクト",
            position: "フロントエンド開発者",
            status: "完了",
            description: "ReactとTypeScriptを使用したECサイトのフロントエンド開発を担当。レスポンシブデザインとユーザビリティを重視した実装を行いました。",
            created_at: "2024-01-15T00:00:00Z",
            updated_at: "2024-02-20T00:00:00Z"
        },
        {
            id: 2,
            title: "モバイルアプリ開発",
            position: "フルスタック開発者",
            status: "進行中",
            description: "React Nativeを使用したクロスプラットフォームモバイルアプリの開発。バックエンドAPIも含めたフルスタック開発を担当しています。",
            created_at: "2024-02-01T00:00:00Z",
            updated_at: "2024-03-15T00:00:00Z"
        },
        {
            id: 3,
            title: "データ分析ダッシュボード",
            position: "フロントエンド開発者",
            status: "未着手",
            description: "D3.jsとChart.jsを使用したデータ可視化ダッシュボードの開発予定。リアルタイムデータの表示とインタラクティブなグラフ機能を実装予定です。",
            created_at: "2024-03-01T00:00:00Z",
            updated_at: "2024-03-01T00:00:00Z"
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);

    const handleViewProject = (project: PortfolioProject) => {
        console.log('プロジェクト詳細を表示:', project);
        // 実際の実装では詳細ページに遷移
    };

    const handleEditProject = (project: PortfolioProject) => {
        console.log('プロジェクトを編集:', project);
        // 実際の実装では編集ページに遷移
    };

    const handleRetry = () => {
        console.log('再試行');
        // 実際の実装ではデータの再取得
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Header />

                {/* ヒーローセクション */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-purple-600/20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-gray-100 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-4">
                                ポートフォリオプロジェクト
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                                あなたのプロジェクト一覧を確認・管理できます。創造的な作品を探索し、新しいアイデアを見つけましょう。
                            </p>
                        </div>
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-12">
                        <PortfolioProjectList
                            projects={projects}
                            loading={loading}
                            error={error}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onRetry={handleRetry}
                            onViewProject={handleViewProject}
                            onEditProject={handleEditProject}
                        />
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}