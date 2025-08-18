export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoFormData {
    text: string;
}

export interface TodoStats {
    total: number;
    completed: number;
    pending: number;
}

// Laravel APIレスポンスの型定義
export interface LaravelTodo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface LaravelTodoResponse {
    data: LaravelTodo;
}

export interface LaravelTodoListResponse {
    data: LaravelTodo[];
}
