import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface PortfolioSearchFormProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    placeholder?: string;
}

export default function PortfolioSearchForm({
    searchQuery,
    onSearchChange,
    placeholder = "プロジェクトを検索..."
}: PortfolioSearchFormProps) {
    const clearSearch = () => {
        onSearchChange('');
    };

    return (
        <div className="relative group">
            {/* 背景グラデーション */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* メインコンテナ */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="relative">
                    {/* 検索アイコン */}
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors duration-200 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400"
                        />
                    </div>

                    {/* 検索入力フィールド */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={placeholder}
                        className="block w-full pl-12 pr-12 py-4 bg-gray-50/50 dark:bg-gray-700/50 border-2 border-gray-100 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base font-medium transition-all duration-200 hover:bg-white dark:hover:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-500"
                    />

                    {/* クリアボタン */}
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="h-4 w-4"
                            />
                        </button>
                    )}
                </div>

                {/* 検索ヒント */}
                <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                        <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full mr-2"></div>
                        タイトル、説明、ポジション、ステータスで検索できます
                    </span>
                </div>
            </div>
        </div>
    );
}
