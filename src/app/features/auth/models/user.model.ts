export interface User {
    id: string;
    email: string;
    name: string;
    description: string | null;
    registerDate: Date;
    roles: string[];
}