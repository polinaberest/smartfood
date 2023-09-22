import { Organization } from "./company.model";
import { Fridge } from "./fridge.model";

export interface Filial {
    id: string;
    name: string;
    address: string;
    ownerOrganization: Organization;
    //fridgesInstalled: Fridge[];
}