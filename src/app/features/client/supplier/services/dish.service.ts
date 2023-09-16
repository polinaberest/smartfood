import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dish } from '../../models/dish.model';
import { supplierMock } from '../../services/supplier.service';
import { environment } from 'src/environments/environment';

const dishesMock: Dish[] = [
  {
    id: '9fb20bce-a2f3-46cf-a481-58935a9c5f71',
    name: 'Отбивная с ананасами',
    description:
      'Сочнейшая отбивная мастерски приготовленная нежнейшими руками наших поваров',
    price: 170,
    supplier: supplierMock,
  },
  {
    id: '9fb20bce-a2f3-46cf-a481-58935a9c5f71',
    name: 'Отбивная без ананасов',
    description:
      'Сочнейшая отбивная мастерски приготовленная нежнейшими руками наших поваров',
    price: 200,
    supplier: supplierMock,
  },
];

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  getAllSupplierDishes(supplierId: string): Observable<Dish[]> {
    return of(dishesMock);
    // return this.http.get<Dish[]>(
    //   `${environment.apiBaseUrl}/api/suppliers/${supplierId}/dishes`
    // );
  }
}
