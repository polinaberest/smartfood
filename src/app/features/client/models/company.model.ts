import { User } from "../../auth/models/user.model";

export interface Company {
    id: string;
    name: string;
    description: string | null;
    registerDate: Date;
    manager: User;
}