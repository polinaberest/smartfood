import { Filial } from "./filial.model";

export interface FridgeRequest {
    id: string;
    placementDescription: string;
    requestTime: Date;
    answeredTime?: Date;
    status: string;
    filial: Filial;
}