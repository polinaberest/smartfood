import { Organization } from "./organization.model";
import { Fridge } from "./fridge.model";

export interface Filial {
    id: string;
    name: string;
    address: string;
    ownerOrganization: Organization;
    isDeleted?: boolean;
    //fridgesInstalled: Fridge[];
}