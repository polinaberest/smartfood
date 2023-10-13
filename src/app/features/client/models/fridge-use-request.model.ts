import { Dish } from "./dish.model";
import { Fridge } from "./fridge.model";
import { Supplier } from "./supplier.model";

export interface FridgeUseRequest {
    id: string;
    requestMessage?: string;
    requestTime: Date;
    answeredTime?: Date;
    status: string;
    supplier: Supplier;
    fridge: Fridge;
    dish: Dish;
}