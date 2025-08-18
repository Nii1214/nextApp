'use client';

import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';
import TodoEmptyState from './TodoEmptyState';
import { TodoTabType } from './TodoTabs';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    disabled?: boolean;
    activeTab?: TodoTabType;
}

export default function TodoList({ todos, onToggle, onDelete, disabled = false, activeTab = 'all' }: TodoListProps) {
    if (todos.length === 0) {
        return <TodoEmptyState activeTab={activeTab} />;
    }

    return (
        <div className="space-y-3">
            {todos.map((todo, index) => (
                <TodoItem
                    key={todo.id || index}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}
