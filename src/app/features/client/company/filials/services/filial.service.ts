import { Injectable } from '@angular/core';
import { organizationMock } from '../../../services/organization.service';
import { Observable, of, map, filter } from 'rxjs';
import { Filial } from '../../../models/filial.model';
import { UpdateFilial } from '../../../models/update-filial.model';
import { AddFilial } from '../../../models/add-filial.model';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';
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
export class FilialService extends ODataServiceBase<Filial> {
  protected override oDataEntityName: string = 'Filials';

  constructor(factory: ODataServiceFactory, 
    private http: HttpClient) {
    super(factory);
  }

  getAllFilials() : Observable<Filial[]>{
    return of(filialsMock.filter(filial => !filial?.isDeleted));
  }

  getAllOrganizationFilials(organizationId: string) : Observable<Filial[]>{
    return this.ODataService.entities()
      .query((q) =>
        q.filter(({ e }) => e().eq('organizationId', organizationId, 'none'))
      )
      .fetch()
      .pipe(this.mapODataEntities);
  }

  deleteFilialDeinstallFridges(id: string) : Observable<Filial>{
    return this.ODataService.destroy(id); 
  }
}
