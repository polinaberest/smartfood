export interface LoginResponse {
    token: string;
    id: string;
    email: string;
    name: string;
    description: string | null;
    registerDate: Date;
    roles: string[];
}