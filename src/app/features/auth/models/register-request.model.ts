export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    description: string | null;
    registerDate: Date;
    roles: string[];
}