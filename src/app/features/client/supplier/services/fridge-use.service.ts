import { Injectable } from '@angular/core';
import { FridgeUseRequest } from '../../models/fridge-use-request.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { supplierMock } from '../../services/supplier.service';
import { fridgesMock } from '../../company/fridges/services/fridge.service';
import { dishesMock } from './dish.service';
import { AddFridgeUseRequest } from '../../models/add-fridge-use-request.model';



export const fridgeUseRequestsMock: FridgeUseRequest[] = [
  {
    id: '1',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Approved',
    supplier: supplierMock,
    fridgeUseRequested: fridgesMock[0],
    dishToDeliver: dishesMock[0],
    },
  {
    id: '2',
    requestTime: new Date(),
    status: 'Unseen',
    supplier: supplierMock,
    fridgeUseRequested: fridgesMock[1],
    dishToDeliver: dishesMock[1],
  },
  {
    id: '3',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Rejected',
    supplier: supplierMock,
    fridgeUseRequested: fridgesMock[4],
    dishToDeliver: dishesMock[0],
  },
  {
    id: '4',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Unseen',
    supplier: supplierMock,
    fridgeUseRequested: fridgesMock[5],
    dishToDeliver: dishesMock[0],
  },
];

@Injectable({
  providedIn: 'root'
})

export class FridgeUseService {

  constructor(private http: HttpClient) { }

  getSuppliersRequests(supplierId: string): Observable<FridgeUseRequest[]> {
    return of(fridgeUseRequestsMock);
    //return this.http.get<FridgeUseRequest[]>(`/api/fridge-use-requests/${supplierId}`);
  }

  getUnseenRequestsToOrganization(organizationId: string): Observable<FridgeUseRequest[]> {
    return of(fridgeUseRequestsMock.filter(request => request.status === 'Unseen'));
    //return this.http.get<FridgeUseRequest[]>();
  }

  acceptRequest(requestId: string): Observable<FridgeUseRequest> {
    fridgeUseRequestsMock.find(request => request.id === requestId)!.status = 'Approved';
    return of(fridgeUseRequestsMock.find(request => request.id === requestId)!);
    //return this.http.put<FridgeUseRequest>(`/api/fridge-use-requests/${requestId}/accept`, {});
  }

  rejectRequest(requestId: string): Observable<FridgeUseRequest> {
    fridgeUseRequestsMock.find(request => request.id === requestId)!.status = 'Rejected';
    return of(fridgeUseRequestsMock.find(request => request.id === requestId)!);
    //return this.http.put<FridgeUseRequest>(`/api/fridge-use-requests/${requestId}/reject`, {});
  }

  addFridgeUseRequest(request: AddFridgeUseRequest): Observable<FridgeUseRequest> {
    const result: FridgeUseRequest = { id: crypto.randomUUID(), ...request, status: 'Unseen', requestTime: new Date(), supplier: supplierMock, fridgeUseRequested: fridgesMock[0], dishToDeliver: dishesMock[0] };

      fridgeUseRequestsMock.push(result);
      return of(result);

      // return this.http.post(`${environment.apiBaseUrl}/api/fridge-use-requests`, request);
  }

}
