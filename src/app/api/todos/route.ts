import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Laravel APIのレスポンス型定義
interface LaravelTodoResponse {
    id: number;
    title: string;
    completed: boolean;
}

interface LaravelApiResponse {
    data: { data: LaravelTodoResponse }[];
}

interface LaravelSingleApiResponse {
    data: LaravelTodoResponse;
}

export async function GET() {
    try {
        const response = await fetch(`${LARAVEL_API_URL}/todos`);

        if (!response.ok) {
            throw new Error(`Laravel API Error: ${response.status}`);
        }

        const data: LaravelApiResponse = await response.json();

        // Laravel APIの二重ネストされたレスポンス形式を変換
        const todos = data.data.map((item) => {
            const todo = item.data; // 二重ネストされたdataオブジェクトから取得
            return {
                id: todo.id,
                text: todo.title, // titleをtextに変換
                completed: todo.completed,
            };
        });

        return NextResponse.json(todos);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Todoの取得に失敗しました' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // フロントエンドの形式をLaravel APIの形式に変換
        const laravelData = {
            title: body.text, // textをtitleに変換
            description: body.text, // 説明も同じテキストを使用
        };

        const response = await fetch(`${LARAVEL_API_URL}/todos`, {
            method: 'POST',
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
            { error: 'Todoの作成に失敗しました' },
            { status: 500 }
        );
    }
}
