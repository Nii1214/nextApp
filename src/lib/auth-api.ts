import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth';
import { ApiClient } from './api-client';

/**
 * 認証関連のAPI処理を提供するクラス
 * 共通APIクライアントを継承して認証処理を利用
 */
class AuthApiClient extends ApiClient {
    /**
     * ユーザーログイン
     * @param credentials ログイン認証情報
     * @returns 認証レスポンス
     */
    async loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
        return this.post<AuthResponse>('/auth/login', credentials);
    }

    /**
     * ユーザー登録
     * @param credentials 登録認証情報
     * @returns 認証レスポンス
     */
    async registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
        return this.post<AuthResponse>('/auth/register', credentials);
    }

    /**
     * ユーザーログアウト
     * @returns void
     */
    async logoutUser(): Promise<void> {
        await this.post<void>('/auth/logout');
    }

    /**
     * 現在のユーザー情報取得
     * @returns ユーザー情報
     */
    async getCurrentUser() {
        return this.get<{ data: { user: { id: number; name: string; email: string; created_at?: string; updated_at?: string } } }>('/auth/user');
    }
}

export const authApiClient = new AuthApiClient();
