import { PortfolioProject } from '@/types/portfolioProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import PortfolioSearchForm from './PortfolioSearchForm';
import PortfolioProjectCard from './PortfolioProjectCard';

interface PortfolioProjectListProps {
    projects: PortfolioProject[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onRetry: () => void;
    onViewProject: (project: PortfolioProject) => void;
    onEditProject: (project: PortfolioProject) => void;
}

export default function PortfolioProjectList({
    projects,
    loading,
    error,
    searchQuery,
    onSearchChange,
    onRetry,
    onViewProject,
    onEditProject
}: PortfolioProjectListProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-300">読み込み中...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 dark:text-red-400 mb-4">
                    <FontAwesomeIcon icon={faFolderOpen} className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    エラーが発生しました
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                    再試行
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 検索フォーム */}
            <PortfolioSearchForm
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
            />

            {/* 検索結果統計 */}
            {searchQuery && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        「{searchQuery}」の検索結果: {projects.length}件
                    </p>
                </div>
            )}

            {/* プロジェクト一覧 */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <PortfolioProjectCard
                            key={project.id}
                            project={project}
                            onView={onViewProject}
                            onEdit={onEditProject}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faFolderOpen} className="w-16 h-16 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {searchQuery ? '検索結果が見つかりません' : 'プロジェクトがありません'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        {searchQuery
                            ? '別のキーワードで検索してみてください'
                            : '新しいプロジェクトを作成して始めましょう'
                        }
                    </p>
                </div>
            )}
        </div>
    );
}
