import { Injectable } from '@angular/core';
import { organizationMock } from '../../../services/company.service';
import { Observable, of } from 'rxjs';
import { Filial } from '../../../models/filial.model';
import { UpdateFilial } from '../../../models/update-filial.model';
import { AddFilial } from '../../../models/add-filial.model';
import { HttpClient } from '@angular/common/http';

export const filialsMock = [
  {
    id: '1',
    name: 'Филиал 1',
    address: 'Адрес филиала 1',
    ownerOrganization: organizationMock,
    isDeleted: false,
  },
  {
    id: '2',
    name: 'Филиал 2',
    address: 'Адрес филиала 2',
    ownerOrganization: organizationMock,
    isDeleted: false,
  },
  {
    id: '3',
    name: 'Филиал 3',
    address: 'Адрес филиала 3',
    ownerOrganization: organizationMock,
    isDeleted: false,
  },
];

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  constructor(private http: HttpClient) { }

  getAllFilials() : Observable<Filial[]>{
    return of(filialsMock.filter(filial => !filial?.isDeleted));
  }

  getAllOrganizationFilials(organizationId: string) : Observable<Filial[]>{
    return of(filialsMock.filter(filial => !filial?.isDeleted && filial.ownerOrganization.id === organizationId));
  }

  getFilialById(id: string) : Observable<Filial>{
    return of(filialsMock.find(filial => filial.id === id) as Filial);
  }

  updateFilial(id: string, updatedFilial: UpdateFilial) : Observable<Filial>{
    //return this.http.put<Filial>(``, updatedFilial);
    const filialToUpdate = filialsMock.find((filial) => filial.id === id);
    if (filialToUpdate !== undefined) {
      filialToUpdate.address = updatedFilial.address;
      filialToUpdate.name = updatedFilial.name;
    }

    return of(filialToUpdate as Filial);
  }

  addFilial(request: AddFilial) : Observable<Filial>{
    //this.http.post<Filial>(``, request);
    filialsMock.push({id: crypto.randomUUID(), ...request, ownerOrganization: organizationMock, isDeleted: false});
    return of(filialsMock[filialsMock.length - 1]);
  }
}
