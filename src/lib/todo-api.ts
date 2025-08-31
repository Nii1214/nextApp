import { Todo, TodoFormData, LaravelTodoResponse, LaravelTodoListResponse } from '@/types/todo';
import { ApiClient } from './api-client';

/**
 * Todo関連のAPI処理を提供するクラス
 * 共通APIクライアントを継承して認証処理を利用
 */
class TodoApiClient extends ApiClient {
    /**
     * Todo一覧を取得
     * @returns Todo配列
     */
    async getTodos(): Promise<Todo[]> {
        const response = await this.get<LaravelTodoListResponse>('/todos');
        // Laravel APIの統一された形式に対応
        return response.data.map(item => ({
            id: item.id,
            text: item.title, // titleをtextに変換
            completed: item.completed
        }));
    }

    /**
     * 新しいTodoを作成
     * @param data Todo作成データ
     * @returns 作成されたTodo
     */
    async createTodo(data: TodoFormData): Promise<Todo> {
        // Laravel APIの形式に合わせてデータを変換
        const requestData = {
            title: data.text, // textをtitleに変換
            description: data.text // descriptionも同じ値で設定
        };

        const response = await this.post<LaravelTodoResponse>('/todos', requestData);

        // Laravel APIの統一された形式に対応
        const todoData = response.data;

        return {
            id: todoData.id,
            text: todoData.title, // titleをtextに変換
            completed: todoData.completed
        };
    }

    /**
     * Todoを更新
     * @param id TodoのID
     * @param data 更新データ
     * @returns 更新されたTodo
     */
    async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
        // Laravel APIの形式に合わせてデータを変換
        const requestData: {
            completed?: boolean;
            title?: string;
            description?: string;
        } = {
            completed: data.completed
        };

        // textが提供されている場合のみtitleとdescriptionを更新
        if (data.text !== undefined) {
            requestData.title = data.text;
            requestData.description = data.text;
        }

        const response = await this.put<LaravelTodoResponse>(`/todos/${id}`, requestData);

        // Laravel APIの統一された形式に対応
        const todoData = response.data;

        return {
            id: todoData.id,
            text: todoData.title, // titleをtextに変換
            completed: todoData.completed
        };
    }

    /**
     * Todoを削除
     * @param id TodoのID
     */
    async deleteTodo(id: number): Promise<void> {
        await this.delete<void>(`/todos/${id}`);
    }

    /**
     * Todoの完了状態を切り替え
     * @param id TodoのID
     * @param completed 完了状態
     * @returns 更新されたTodo
     */
    async toggleTodo(id: number, completed: boolean): Promise<Todo> {
        return this.updateTodo(id, { completed });
    }
}

export const todoApiClient = new TodoApiClient();
