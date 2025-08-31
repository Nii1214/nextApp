import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, TodoFormData } from '@/types/todo';
import { todoApiClient } from '@/lib/todo-api';
import { TodoTabType } from '@/components/features/todo/TodoTabs';
import { useAuth } from '@/contexts/AuthContext';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TodoTabType>('pending');
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    // Todo一覧を取得
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await todoApiClient.getTodos();
            setTodos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    }, []);

    // Todoを追加
    const addTodo = useCallback(async (formData: TodoFormData) => {
        try {
            setError(null);
            setCreating(true);
            const newTodo = await todoApiClient.createTodo(formData);
            setTodos(prev => [newTodo, ...prev]); // 先頭に追加
            return newTodo;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの追加に失敗しました');
            throw err;
        } finally {
            setCreating(false);
        }
    }, []);

    // Todoの完了状態を切り替え
    const toggleTodo = useCallback(async (id: number) => {
        try {
            setError(null);
            const todo = todos.find(t => t.id === id);
            if (!todo) return;

            const updatedTodo = await todoApiClient.toggleTodo(id, !todo.completed);
            setTodos(prev =>
                prev.map(t => t.id === id ? updatedTodo : t)
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの更新に失敗しました');
        }
    }, [todos]);

    // Todoを削除
    const deleteTodo = useCallback(async (id: number) => {
        try {
            setError(null);
            await todoApiClient.deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの削除に失敗しました');
        }
    }, []);

    // タブ別のフィルタリングされたTodoリスト
    const filteredTodos = useMemo(() => {
        switch (activeTab) {
            case 'pending':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }, [todos, activeTab]);

    // 統計情報
    const stats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const pending = total - completed;

        return { total, completed, pending };
    }, [todos]);

    // 初回読み込み（認証済みの場合のみ）
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            fetchTodos();
        } else if (!authLoading && !isAuthenticated) {
            // 認証されていない場合はローディングを停止
            setLoading(false);
            setTodos([]);
            setError(null);
        }
    }, [fetchTodos, isAuthenticated, authLoading]);

    // 認証状態が変更された時にデータをリセット
    useEffect(() => {
        if (!isAuthenticated && !authLoading) {
            setTodos([]);
            setError(null);
            setLoading(false);
        }
    }, [isAuthenticated, authLoading]);

    return {
        todos: filteredTodos,
        allTodos: todos,
        loading,
        creating,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        refetch: fetchTodos,
        activeTab,
        setActiveTab,
        stats
    };
};
