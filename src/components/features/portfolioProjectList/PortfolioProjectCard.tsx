import { PortfolioProject } from '@/types/portfolioProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faEdit, faEye, faCode, faRocket } from '@fortawesome/free-solid-svg-icons';

interface PortfolioProjectCardProps {
    project: PortfolioProject;
    onView?: (project: PortfolioProject) => void;
    onEdit?: (project: PortfolioProject) => void;
}

export default function PortfolioProjectCard({
    project,
    onView,
    onEdit
}: PortfolioProjectCardProps) {
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
            case '完了':
                return {
                    bg: 'bg-gradient-to-r from-emerald-100 to-green-100',
                    text: 'text-emerald-800',
                    border: 'border-emerald-200',
                    icon: 'bg-emerald-500'
                };
            case 'in_progress':
            case '進行中':
                return {
                    bg: 'bg-gradient-to-r from-blue-100 to-indigo-100',
                    text: 'text-blue-800',
                    border: 'border-blue-200',
                    icon: 'bg-blue-500'
                };
            case 'pending':
            case '未着手':
                return {
                    bg: 'bg-gradient-to-r from-amber-100 to-yellow-100',
                    text: 'text-amber-800',
                    border: 'border-amber-200',
                    icon: 'bg-amber-500'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-100 to-slate-100',
                    text: 'text-gray-800',
                    border: 'border-gray-200',
                    icon: 'bg-gray-500'
                };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const statusStyle = getStatusStyle(project.status);

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
            {/* 背景グラデーション */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/10 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* ステータスインジケーター */}
            <div className={`absolute top-0 left-0 w-full h-1 ${statusStyle.bg}`}></div>

            <div className="relative p-4 sm:p-6 flex flex-col h-full">
                {/* ヘッダー部分 */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-5 space-y-3 sm:space-y-0">
                    <div className="flex-1">
                        {/* プロジェクトアイコン */}
                        <div className="flex items-center mb-3">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${statusStyle.bg} rounded-xl flex items-center justify-center mr-3`}>
                                <FontAwesomeIcon
                                    icon={faCode}
                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${statusStyle.text}`}
                                />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {project.title}
                                </h3>
                            </div>
                        </div>

                        {/* ポジション */}
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"
                            />
                            <span className="font-medium">{project.position}</span>
                        </div>
                    </div>

                    {/* ステータスバッジ */}
                    <div className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border self-start`}>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${statusStyle.icon} rounded-full mr-1.5 sm:mr-2`}></div>
                        {project.status}
                    </div>
                </div>

                {/* 説明部分 - フレックスで残りスペースを占有 */}
                <div className="mb-6 flex-1">
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* フッター部分 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto space-y-3 sm:space-y-0">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="w-3 h-3 mr-1.5"
                        />
                        <span className="hidden sm:inline">更新: </span>
                        <span className="sm:hidden">更新</span>
                        <span className="sm:ml-1">{formatDate(project.updated_at)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        {onView && (
                            <button
                                onClick={() => onView(project)}
                                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex-1 sm:flex-none justify-center"
                            >
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="w-3 h-3 mr-1 sm:mr-1.5"
                                />
                                詳細
                            </button>
                        )}
                        {onEdit && (
                            <button
                                onClick={() => onEdit(project)}
                                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 flex-1 sm:flex-none justify-center"
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="w-3 h-3 mr-1 sm:mr-1.5"
                                />
                                編集
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
