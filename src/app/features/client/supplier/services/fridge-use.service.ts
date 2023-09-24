import { Injectable } from '@angular/core';
import { FridgeUseRequest } from '../../models/fridge-use-request.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { supplierMock } from '../../services/supplier.service';
import { fridgesMock } from '../../company/fridges/services/fridge.service';
import { dishesMock } from './dish.service';



export const fridgeUseRequestsMock: FridgeUseRequest[] = [
  {
    id: '1',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Approved',
    supplierId: supplierMock.id,
    fridgeUseRequested: fridgesMock[0],
    dishToDeliver: dishesMock[0],
    },
  {
    id: '2',
    requestTime: new Date(),
    status: 'Unseen',
    supplierId: supplierMock.id,
    fridgeUseRequested: fridgesMock[1],
    dishToDeliver: dishesMock[1],
  },
  {
    id: '3',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Rejected',
    supplierId: supplierMock.id,
    fridgeUseRequested: fridgesMock[4],
    dishToDeliver: dishesMock[0],
  },
  {
    id: '4',
    requestMessage: 'Свежесть мяса гарантируем',
    requestTime: new Date(),
    answeredTime: new Date(),
    status: 'Approved',
    supplierId: supplierMock.id,
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
}
