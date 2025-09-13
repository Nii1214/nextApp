export interface PortfolioProject {
    id: number;
    title: string;
    position: string;
    status: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface PortfolioProjectResponse {
    data: PortfolioProject[];
}