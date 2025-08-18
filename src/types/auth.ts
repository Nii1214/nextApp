export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export interface AuthResponse {
    data: {
        user: User;
        token: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}
