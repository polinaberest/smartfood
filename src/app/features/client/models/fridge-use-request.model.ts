import { Dish } from "./dish.model";
import { Fridge } from "./fridge.model";

export interface FridgeUseRequest {
    id: string;
    requestMessage?: string;
    requestTime: Date;
    answeredTime?: Date;
    status: string;
    supplierId: string;
    fridgeUseRequested: Fridge;
    dishToDeliver: Dish;
}