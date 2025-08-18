import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// API通信の共通関数
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// 認証済みリクエスト用の関数
export async function authenticatedRequest<T>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
): Promise<T> {
    return apiRequest<T>(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });
}

// ログイン
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

// ユーザー登録
export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

// ログアウト
export async function logoutUser(token: string): Promise<void> {
    await authenticatedRequest('/auth/logout', token, {
        method: 'POST',
    });
}

// 現在のユーザー情報取得
export async function getCurrentUser(token: string) {
    return authenticatedRequest<{ data: { user: { id: number; name: string; email: string; created_at?: string; updated_at?: string } } }>('/auth/user', token);
}
