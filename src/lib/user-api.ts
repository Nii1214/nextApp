import { ApiClient } from './api-client';
import { User } from '@/types/auth';

class UserApiClient extends ApiClient {
    constructor() {
        super();
    }

    async getUsers(): Promise<User[]> {
        const response = await this.get('/users') as { data: User[] };
        return response.data;
    }

    async getUser(id: number): Promise<User> {
        const response = await this.get(`/users/${id}`) as { data: User };
        return response.data;
    }

    async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
        const response = await this.post('/users', userData) as { data: User };
        return response.data;
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const response = await this.put(`/users/${id}`, userData) as { data: User };
        return response.data;
    }

    async deleteUser(id: number): Promise<void> {
        await this.delete(`/users/${id}`);
    }
}

export const userApiClient = new UserApiClient();
