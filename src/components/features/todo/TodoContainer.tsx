'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoForm from '@/components/features/todo/TodoForm';
import TodoList from '@/components/features/todo/TodoList';
import TodoStats from '@/components/features/todo/TodoStats';
import TodoTabs from '@/components/features/todo/TodoTabs';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function TodoContainer() {
    const {
        todos,
        allTodos,
        loading,
        creating,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        refetch,
        activeTab,
        setActiveTab,
        stats
    } = useTodos();

    const handleAddTodo = async (data: { text: string }) => {
        await addTodo(data);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-6">
            {error && (
                <ErrorMessage
                    message={error}
                    onRetry={refetch}
                />
            )}

            <TodoForm
                onSubmit={handleAddTodo}
                disabled={loading || creating}
            />

            <TodoTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                stats={stats}
            />

            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                disabled={loading}
                activeTab={activeTab}
            />

            <TodoStats todos={allTodos} />
        </div>
    );
}
