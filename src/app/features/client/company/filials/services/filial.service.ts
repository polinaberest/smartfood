import { Injectable } from '@angular/core';
import { organizationMock } from '../../../services/company.service';
import { Observable, of } from 'rxjs';
import { Filial } from '../../../models/filial.model';

export const filialsMock = [
  {
    id: '1',
    name: 'Филиал 1',
    address: 'Адрес филиала 1',
    ownerOrganization: organizationMock
  },
  {
    id: '2',
    name: 'Филиал 2',
    address: 'Адрес филиала 2',
    ownerOrganization: organizationMock
  },
  {
    id: '3',
    name: 'Филиал 3',
    address: 'Адрес филиала 3',
    ownerOrganization: organizationMock
  },
];

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  constructor() { }

  getAllFilials() : Observable<Filial[]>{
    return of(filialsMock);
  }
}
