import { Fridge } from "./fridge.model";

export interface FridgeDeinstallationRequest {
    id: string;
    requestTime: Date;
    fulfilledTime?: Date;
    status: string;
    fridge: Fridge;
}