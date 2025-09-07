'use client';

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export default function UserList() {
    // 仮のデータ（本来はAPIやDBから取得する）
    const users: User[] = [
        { id: 1, name: "山田太郎", email: "taro@example.com", createdAt: "2023-08-01", updatedAt: "2023-08-10" },
        { id: 2, name: "佐藤花子", email: "hanako@example.com", createdAt: "2023-08-02", updatedAt: "2023-08-11" },
        { id: 3, name: "鈴木一郎", email: "ichiro@example.com", createdAt: "2023-08-03", updatedAt: "2023-08-12" },
    ];

    return (
        <div className="p-6">
            <table className="table-auto border-collapse border border-gray-300 w-full text-gray-900">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">名前</th>
                        <th className="border border-gray-300 px-4 py-2">メールアドレス</th>
                        <th className="border border-gray-300 px-4 py-2">作成日時</th>
                        <th className="border border-gray-300 px-4 py-2">更新日時</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.createdAt}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
