import { ApiClient } from './api-client';
import { PortfolioProject, PortfolioProjectResponse } from '@/types/portfolioProject';

/**
 * Todo関連のAPI処理を提供するクラス
 * 共通APIクライアントを継承して認証処理を利用
 */
class PortfolioProjectApiClient extends ApiClient {
    /**
     * ポートフォリオプロジェクト一覧を取得
     * @returns Todo配列
     */
    async getPortfolioProjects(): Promise<PortfolioProject[]> {
        const response = await this.get<PortfolioProjectResponse>('/portfolio-projects');
        return response.data.map(item => ({
            id: item.id,
            title: item.title,
            position: item.position,
            status: item.status,
            description: item.description,
            created_at: item.created_at,
            updated_at: item.updated_at
        }));
    }
}

export const portfolioProjectApiClient = new PortfolioProjectApiClient();
