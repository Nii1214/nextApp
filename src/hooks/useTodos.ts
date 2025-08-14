import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFormData } from '@/types/todo';
import { apiClient } from '@/lib/api';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Todo一覧を取得
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiClient.getTodos();
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
            const newTodo = await apiClient.createTodo(formData);
            setTodos(prev => [...prev, newTodo]);
            return newTodo;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの追加に失敗しました');
            throw err;
        }
    }, []);

    // Todoの完了状態を切り替え
    const toggleTodo = useCallback(async (id: number) => {
        try {
            setError(null);
            const todo = todos.find(t => t.id === id);
            if (!todo) return;

            const updatedTodo = await apiClient.toggleTodo(id, !todo.completed);
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
            await apiClient.deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの削除に失敗しました');
        }
    }, []);

    // 初回読み込み
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return {
        todos,
        loading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        refetch: fetchTodos,
    };
};
