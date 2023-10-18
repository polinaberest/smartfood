import { Fridge } from "./fridge.model";

export interface TechInspectionRequest {
    id: string;
    requestTime: Date;
    fulfilledTime?: Date;
    status: string;
    fridge: Fridge;
    temperature: number;
    opensCount: number;
}