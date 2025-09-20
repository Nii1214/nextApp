import { useState, useCallback } from "react";
import { User } from "@/types/auth";
import { userApiClient } from '@/lib/user-api';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // ユーザー一覧を取得
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userApiClient.getUsers();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ユーザー一覧の取得に失敗しました');
        } finally {
            setLoading(false);
        }
    }, []);

    // ユーザーを作成
    const createUser = useCallback(async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            setError(null);
            const newUser = await userApiClient.createUser(userData);
            setUsers(prev => [...prev, newUser]);
            return newUser;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ユーザーの作成に失敗しました');
            throw err;
        }
    }, []);

    // ユーザーを更新
    const updateUser = useCallback(async (id: number, userData: Partial<User>) => {
        try {
            setError(null);
            const updatedUser = await userApiClient.updateUser(id, userData);
            setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
            return updatedUser;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ユーザーの更新に失敗しました');
            throw err;
        }
    }, []);

    // ユーザーを削除
    const deleteUser = useCallback(async (id: number) => {
        try {
            setError(null);
            await userApiClient.deleteUser(id);
            setUsers(prev => prev.filter(user => user.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ユーザーの削除に失敗しました');
            throw err;
        }
    }, []);

    return {
        users,
        error,
        loading,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser
    };
};

