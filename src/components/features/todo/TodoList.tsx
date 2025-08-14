'use client';

import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    disabled?: boolean;
}

export default function TodoList({ todos, onToggle, onDelete, disabled = false }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">📋</div>
                <p>タスクがありません</p>
                <p className="text-sm">新しいタスクを追加してください</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}
