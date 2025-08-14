interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
                <div className="text-red-500 mr-2">⚠️</div>
                <div className="flex-1">
                    <p className="text-red-800 text-sm">{message}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                    >
                        再試行
                    </button>
                )}
            </div>
        </div>
    );
}
