import { User } from '@/types/user';
import { ApiClient } from './api-client';

/**
 * ユーザー関連のAPI処理を提供するクラス
 * 共通APIクライアントを継承して認証処理を利用
 */
class UserApiClient extends ApiClient {
    /**
     * ユーザー一覧を取得
     * @returns ユーザー配列
     */
    async getUsers(): Promise<User[]> {
        const response = await this.get<{ data: User[] }>('/users');
        return response.data;
    }

    /**
     * 特定のユーザーを取得
     * @param id ユーザーID
     * @returns ユーザー情報
     */
    async getUser(id: number): Promise<User> {
        const response = await this.get<{ data: User }>(`/users/${id}`);
        return response.data;
    }

    /**
     * ユーザーを更新
     * @param id ユーザーID
     * @param data 更新データ
     * @returns 更新されたユーザー
     */
    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const response = await this.put<{ data: User }>(`/users/${id}`, data);
        return response.data;
    }

    /**
     * ユーザーを削除
     * @param id ユーザーID
     */
    async deleteUser(id: number): Promise<void> {
        await this.delete<void>(`/users/${id}`);
    }
}

export const userApiClient = new UserApiClient();