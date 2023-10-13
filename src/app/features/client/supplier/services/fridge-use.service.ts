import { Injectable } from '@angular/core';
import { FridgeUseRequest } from '../../models/fridge-use-request.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { supplierMock } from '../../services/supplier.service';
import { fridgesMock } from '../../company/fridges/services/fridge.service';
import { dishesMock } from './dish.service';
import { AddFridgeUseRequest } from '../../models/add-fridge-use-request.model';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';


export const fridgeUseRequestsMock: FridgeUseRequest[] = [
  {
    id: '1',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Approved',
    supplier: supplierMock,
    fridge: fridgesMock[0],
    dish: dishesMock[0],
    },
  {
    id: '2',
    requestTime: new Date(),
    status: 'Unseen',
    supplier: supplierMock,
    fridge: fridgesMock[1],
    dish: dishesMock[1],
  },
  {
    id: '3',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Rejected',
    supplier: supplierMock,
    fridge: fridgesMock[4],
    dish: dishesMock[0],
  },
  {
    id: '4',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Unseen',
    supplier: supplierMock,
    fridge: fridgesMock[5],
    dish: dishesMock[0],
  },
];

@Injectable({
  providedIn: 'root'
})

export class FridgeUseService extends ODataServiceBase<FridgeUseRequest> {
  protected override oDataEntityName: string = 'FridgeUsageRequests';

  constructor(factory: ODataServiceFactory, 
    private http: HttpClient) {
    super(factory);
  }

  getSupplierUsageRequests(supplierId: string): Observable<FridgeUseRequest[]> {
    debugger;
    return this.ODataService.entities()
    .query((q) => {
      q.expand('supplier,dish,fridge/filial');
      q.filter(({ e }) => e().eq('supplierId', supplierId, 'none'))
    }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  getUnseenRequestsToOrganization(organizationId: string): Observable<FridgeUseRequest[]> {
    //return of(fridgeUseRequestsMock.filter(request => request.status === 'Unseen'));
    debugger;
    return this.ODataService.entities()
    .query((q) => {
      q.expand('dish,supplier,fridge/filial');
      q.filter(({ e }) => e().eq('fridge/filial/organizationId', organizationId, 'none')
        .and(e().eq('status', 'Unseen'))
        )
    }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  acceptRequest(requestId: string): Observable<FridgeUseRequest> {
    return this.http.put<FridgeUseRequest>(`https://localhost:7065/fridge-use-requests/${requestId}/accept`, {});
  }

  rejectRequest(requestId: string): Observable<FridgeUseRequest> {
    return this.http.put<FridgeUseRequest>(`https://localhost:7065/fridge-use-requests/${requestId}/reject`, {});
  }

  addFridgeUseRequest(request: AddFridgeUseRequest): Observable<FridgeUseRequest> {
    const result: FridgeUseRequest = { id: crypto.randomUUID(), ...request, status: 'Unseen', requestTime: new Date(), supplier: supplierMock, fridge: fridgesMock[0], dish: dishesMock[0] };

      fridgeUseRequestsMock.push(result);
      return of(result);

      // return this.http.post(`${environment.apiBaseUrl}/api/fridge-use-requests`, request);
  }

}
