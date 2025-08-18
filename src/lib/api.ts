import { Todo, TodoFormData } from '@/types/todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiClient {
    private getAuthToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth_token');
        }
        return null;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
                    localStorage.removeItem('auth_token');
                    // ページをリロードして認証状態をリセット
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                }

                throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Todo関連のAPI
    async getTodos(): Promise<Todo[]> {
        const response = await this.request<{ data: any[] }>('/todos');
        // Laravel APIの統一された形式に対応
        return response.data.map(item => ({
            id: item.id,
            text: item.title, // titleをtextに変換
            completed: item.completed
        }));
    }

    async createTodo(data: TodoFormData): Promise<Todo> {
        // Laravel APIの形式に合わせてデータを変換
        const requestData = {
            title: data.text, // textをtitleに変換
            description: data.text // descriptionも同じ値で設定
        };

        const response = await this.request<{ data: any }>('/todos', {
            method: 'POST',
            body: JSON.stringify(requestData),
        });

        // Laravel APIの統一された形式に対応
        const todoData = response.data;

        return {
            id: todoData.id,
            text: todoData.title, // titleをtextに変換
            completed: todoData.completed
        };
    }

    async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
        // Laravel APIの形式に合わせてデータを変換
        const requestData: any = {
            completed: data.completed
        };

        // textが提供されている場合のみtitleとdescriptionを更新
        if (data.text !== undefined) {
            requestData.title = data.text;
            requestData.description = data.text;
        }

        const response = await this.request<{ data: any }>(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(requestData),
        });

        // Laravel APIの統一された形式に対応
        const todoData = response.data;

        return {
            id: todoData.id,
            text: todoData.title, // titleをtextに変換
            completed: todoData.completed
        };
    }

    async deleteTodo(id: number): Promise<void> {
        await this.request<{ data: any }>(`/todos/${id}`, {
            method: 'DELETE',
        });
    }

    async toggleTodo(id: number, completed: boolean): Promise<Todo> {
        return this.updateTodo(id, { completed });
    }
}

export const apiClient = new ApiClient();
