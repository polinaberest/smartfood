import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../../models/dish.model';
import { supplierMock } from '../../services/supplier.service';
import { ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';

export const dishesMock: Dish[] = [
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
export class DishService extends ODataServiceBase<Dish> {
  protected override oDataEntityName: string = 'Dishes';

  constructor(factory: ODataServiceFactory) {
    super(factory);
  }

  getAllSupplierDishes(supplierId: string): Observable<Dish[]> {
    return this.ODataService.entities()
      .query((q) =>
        q.filter(({ e }) => e().eq('supplier/id', supplierId, 'none'))
      )
      .fetch()
      .pipe(this.mapODataEntities);
  }

  deleteDish(id: string): Observable<Dish> {
    // TODO: Implement.
    throw Error('Not implemented');
  }
}
