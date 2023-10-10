import { Filial } from "./filial.model";

export interface Fridge {
    id: string;
    placementDescription: string;
    isOpen: boolean;
    isDeleted?: boolean;
    filial: Filial;
    dishesServed: any[];
}