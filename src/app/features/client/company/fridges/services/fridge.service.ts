import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fridge } from '../../../models/fridge.model';
import { filialsMock } from '../../filials/services/filial.service';

const fridgesMock: Fridge[] = [
    {
      id: '1',
      placementDescription: 'Холодильник 1 - 1 єтаж',
      isOpen: false,
      filial: filialsMock[0]
    },
    {
      id: '2',
      placementDescription: 'Холодильник 2 - 2 єтаж',
      isOpen: true,
      filial: filialsMock[0]
    },
    {
      id: '3',
      placementDescription: 'Холодильник 3 - 3 єтаж',
      isOpen: false,
      filial: filialsMock[0]
    },
    {
      id: '4',
      placementDescription: 'Холодильник 4 - 1 єтаж',
      isOpen: true,
      filial: filialsMock[1]
    },
    {
      id: '5',
      placementDescription: 'Холодильник 5 - 2 єтаж',
      isOpen: false,
      filial: filialsMock[1]
    },
    {
      id: '6',
      placementDescription: 'Холодильник 6 - холл при входе',
      isOpen: true,
      filial: filialsMock[2]
    },
];


@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  constructor(private http: HttpClient) {}

  getAllOrganizationsFridges(companyId: string): Observable<Fridge[]> {
    return of(fridgesMock);
    //return this.http.get<Fridge[]>(`/api/companies/${companyId}/fridges`);
  }
}
