import { useState, useCallback } from "react";
import { User } from "@/types/user";
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

        } catch (err) {

        } finally {

        }
    }, []);
}

