'use client';

import ErrorMessage from "@/components/ui/ErrorMessage";
import { useUsers } from "@/hooks/useUsers";
import UserList from "./UserList";

export default function UserContainer() {

    return (
        <div className="space-y-6">
            <UserList
            // users={users}
            />
        </div>
    )

}