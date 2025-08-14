import { Todo, TodoFormData } from '@/types/todo';

class ApiClient {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `/api${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Todo関連のAPI
    async getTodos(): Promise<Todo[]> {
        return this.request<Todo[]>('/todos');
    }

    async createTodo(data: TodoFormData): Promise<Todo> {
        return this.request<Todo>('/todos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
        return this.request<Todo>(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteTodo(id: number): Promise<void> {
        return this.request<void>(`/todos/${id}`, {
            method: 'DELETE',
        });
    }

    async toggleTodo(id: number, completed: boolean): Promise<Todo> {
        return this.updateTodo(id, { completed });
    }
}

export const apiClient = new ApiClient();
