import { Supplier } from "./supplier.model";

export interface Dish {
    id: string;
    supplier: Supplier;
    name: string;
    description: string | null;
    price: number;
}