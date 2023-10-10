import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fridge } from '../../../models/fridge.model';
import { filialsMock } from '../../filials/services/filial.service';
import { UpdateFridge } from '../../../models/update-fridge.model';
import { environment } from 'src/environments/environment';
import { FridgeInstallRequest } from '../../../models/fridge-install-request.model';
import { FridgeRequest } from '../../../models/fridge-request.model';
import { Status } from '../../../models/request-status';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';

export const fridgesMock: Fridge[] = [
    {
      id: '1',
      placementDescription: 'Холодильник 1 - 1 єтаж',
      isOpen: false,
      filial: filialsMock[0],
      dishesServed: []
    },
    {
      id: '2',
      placementDescription: 'Холодильник 2 - 2 єтаж',
      isOpen: true,
      filial: filialsMock[0],
      dishesServed: []
    },
    {
      id: '3',
      placementDescription: 'Холодильник 3 - 3 єтаж',
      isOpen: false,
      filial: filialsMock[0],
      dishesServed: []
    },
    {
      id: '4',
      placementDescription: 'Холодильник 4 - 1 єтаж',
      isOpen: true,
      filial: filialsMock[1],
      dishesServed: []
    },
    {
      id: '5',
      placementDescription: 'Холодильник 5 - 2 єтаж',
      isOpen: false,
      filial: filialsMock[1],
      dishesServed: []
    },
    {
      id: '6',
      placementDescription: 'Холодильник 6 - холл при входе',
      isOpen: true,
      filial: filialsMock[2],
      dishesServed: []
    },
];

export const fridgeRequestsMock: FridgeRequest[] = [
  {
    id: '1',
    filialOfInstall: filialsMock[1],
    organizationId: filialsMock[1].ownerOrganization.id,
    requestTime: new Date(),
    placementDescription: 'lalalala',
    status: Status.Rejected
  },
  {
    id: '2',
    filialOfInstall: filialsMock[0],
    organizationId: filialsMock[0].ownerOrganization.id,
    requestTime: new Date(),
    placementDescription: 'la2la2la2la',
    status: Status.Unseen
  },
  {
    id: '3',
    filialOfInstall: filialsMock[1],
    organizationId: filialsMock[1].ownerOrganization.id,
    requestTime: new Date(),
    placementDescription: 'la333lalala',
    status: Status.Approved
  }
];

@Injectable({
  providedIn: 'root'
})
export class FridgeService extends ODataServiceBase<Fridge> {
  protected override oDataEntityName: string = 'Fridges';

  constructor(factory: ODataServiceFactory, 
    private http: HttpClient) {
    super(factory);
  }
  getAllFridges(): Observable<Fridge[]> {
    return of(fridgesMock);
    //return this.http.get<Fridge[]>('/api/fridges');
  }

  getAllOrganizationsFridges(organizationId: string): Observable<Fridge[]> {
    debugger;
    return this.ODataService.entities()
    .query((q) => {
      q.expand('filial');
      q.filter(({ e }) => e().eq('filial/organizationId', organizationId, 'none'))
    }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  getFilialFridges(filialId: string): Observable<Fridge[]> {
    return of(fridgesMock.filter((fridge) => fridge.filial.id === filialId));
    //return this.http.get<Fridge[]>('/api/filials/${filialId}/fridges');
  }


  addFridgeInstallRequest(request: FridgeInstallRequest): Observable<FridgeRequest> {
    const result: FridgeRequest = { id: crypto.randomUUID(), ...request, status: 'Unseen', requestTime: new Date(), filialOfInstall: filialsMock[0], organizationId: filialsMock[0].ownerOrganization.id };
        fridgeRequestsMock.push(result);
        return of(result);

    // return this.http.post(``, request);
  }

  getOrganizationsInstallationRequests(companyId: string): Observable<FridgeRequest[]> {
    return of(fridgeRequestsMock);
    //return this.http.get<FridgeRequest[]>(`/api/installation-requests/${companyId}`);
  }

  deinstallFridge(id: string) : Observable<Fridge>{
    return this.ODataService.destroy(id); // this.http.delete<Filial>(`https://localhost:7065/filials/${id}/delete`);
  }
}
