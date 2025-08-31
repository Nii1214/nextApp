'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthContextType } from '@/types/auth';
import { authApiClient } from '@/lib/auth-api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 初期化時にローカルストレージからトークンを復元
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');

        if (savedToken) {
            setToken(savedToken);
            // トークンが有効かチェック
            validateToken(savedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    // トークンの有効性をチェック
    const validateToken = async (authToken: string) => {
        try {
            const response = await authApiClient.getCurrentUser();
            setUser(response.data.user);
        } catch (error) {
            // トークンが無効な場合、ローカルストレージをクリア
            localStorage.removeItem('auth_token');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // ログイン処理
    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authApiClient.loginUser(credentials);
            const { user: userData, token: authToken } = response.data;

            setUser(userData);
            setToken(authToken);
            localStorage.setItem('auth_token', authToken);
        } catch (error) {
            throw error;
        }
    };

    // ユーザー登録処理
    const register = async (credentials: RegisterCredentials) => {
        try {
            const response = await authApiClient.registerUser(credentials);
            const { user: userData, token: authToken } = response.data;

            setUser(userData);
            setToken(authToken);
            localStorage.setItem('auth_token', authToken);
        } catch (error) {
            throw error;
        }
    };

    // ログアウト処理
    const logout = async () => {
        try {
            if (token) {
                await authApiClient.logoutUser();
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem('auth_token');
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// カスタムフック
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
