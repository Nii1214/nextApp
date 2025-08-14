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
