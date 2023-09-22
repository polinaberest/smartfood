import { Filial } from "./filial.model";

export interface Fridge {
    id: string;
    placementDescription: string;
    isOpen: boolean;
    filial: Filial;
    //dishesServed: DishStored[];
}