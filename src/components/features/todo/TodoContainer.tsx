'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoForm from '@/components/features/todo/TodoForm';
import TodoList from '@/components/features/todo/TodoList';
import TodoStats from '@/components/features/todo/TodoStats';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function TodoContainer() {
    const {
        todos,
        loading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        refetch,
    } = useTodos();

    const handleAddTodo = async (data: { text: string }) => {
        await addTodo(data);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                📝 ToDo リスト
            </h1>

            {error && (
                <ErrorMessage
                    message={error}
                    onRetry={refetch}
                />
            )}

            <TodoForm
                onSubmit={handleAddTodo}
                disabled={loading}
            />

            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                disabled={loading}
            />

            <TodoStats todos={todos} />
        </div>
    );
}
