const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * 共通APIクライアントクラス
 * 認証認可とHTTPリクエストの共通処理を提供
 */
export class ApiClient {
    /**
     * ローカルストレージから認証トークンを取得
     * @returns 認証トークンまたはnull
     */
    protected getAuthToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth_token');
        }
        return null;
    }

    /**
     * 認証エラー時の処理
     * トークンを削除してログインページにリダイレクト
     */
    private handleAuthError(): void {
        localStorage.removeItem('auth_token');
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    /**
     * HTTPリクエストの共通処理
     * @param endpoint APIエンドポイント
     * @param options リクエストオプション
     * @returns レスポンスデータ
     */
    protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = this.getAuthToken();

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                // 認証エラーの特別処理
                if (response.status === 401) {
                    this.handleAuthError();
                }

                throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    /**
     * GETリクエストのヘルパーメソッド
     * @param endpoint APIエンドポイント
     * @returns レスポンスデータ
     */
    protected async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    /**
     * POSTリクエストのヘルパーメソッド
     * @param endpoint APIエンドポイント
     * @param data 送信データ
     * @returns レスポンスデータ
     */
    protected async post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * PUTリクエストのヘルパーメソッド
     * @param endpoint APIエンドポイント
     * @param data 送信データ
     * @returns レスポンスデータ
     */
    protected async put<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * DELETEリクエストのヘルパーメソッド
     * @param endpoint APIエンドポイント
     * @returns レスポンスデータ
     */
    protected async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}
