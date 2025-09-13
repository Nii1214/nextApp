import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo } from '@/types/todo';
import { PortfolioProject } from '@/types/portfolioProject';
import { useAuth } from '@/contexts/AuthContext';
import { portfolioProjectApiClient } from '@/lib/portfolioProject-api';

export const useTodos = () => {
    const [todos, setPortfolioProjects] = useState<PortfolioProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    // Todo一覧を取得
    const fetchPortfolioProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await portfolioProjectApiClient.getPortfolioProjects();
            setPortfolioProjects(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Todoの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    }, []);


};
