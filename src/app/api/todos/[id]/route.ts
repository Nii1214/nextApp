import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Laravel APIのレスポンス型定義
interface LaravelTodoResponse {
    id: number;
    title: string;
    completed: boolean;
}

interface LaravelSingleApiResponse {
    data: LaravelTodoResponse;
}

interface UpdateTodoData {
    text?: string;
    completed?: boolean;
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body: UpdateTodoData = await request.json();

        // フロントエンドの形式をLaravel APIの形式に変換
        const laravelData: Partial<LaravelTodoResponse> = {};
        if (body.text !== undefined) {
            laravelData.title = body.text;
        }
        if (body.completed !== undefined) {
            laravelData.completed = body.completed;
        }

        const response = await fetch(`${LARAVEL_API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(laravelData),
        });

        if (!response.ok) {
            throw new Error(`Laravel API Error: ${response.status}`);
        }

        const data: LaravelSingleApiResponse = await response.json();

        // Laravel APIのレスポンス形式を変換
        const todo = data.data; // dataオブジェクトから取得
        return NextResponse.json({
            id: todo.id,
            text: todo.title, // titleをtextに変換
            completed: todo.completed,
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Todoの更新に失敗しました' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(`${LARAVEL_API_URL}/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Laravel API Error: ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Todoの削除に失敗しました' },
            { status: 500 }
        );
    }
}
