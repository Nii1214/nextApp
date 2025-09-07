'use Client';

import Header from "@/components/ui/Header";
import UserContainer from "@/components/features/user/UserContainer";

export default function UsersPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl text-gray-900 font-bold mb-2">ユーザー管理</h1>
                <UserContainer />
            </main>
        </div>
    );
}

