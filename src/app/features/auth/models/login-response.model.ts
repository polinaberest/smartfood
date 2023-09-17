export interface LoginResponse {
    id: string;
    token: string;
    email: string;
    name: string;
    roles: string[];
    registerDate: Date;
}