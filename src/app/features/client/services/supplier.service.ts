import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier.model';
import { supplierUser } from '../../auth/sevices/auth.service';
import { Observable, first, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';
import { query } from '@angular/animations';

export const supplierMock: Supplier = {
  id: 'c057fbdb-a98d-4132-9df2-7ce7b3589e8c',
  description:
    'American fast food restaurant chain headquartered in Louisville, Kentucky, that specializes in fried chicken',
  manager: supplierUser,
  name: 'KFC',
  registerDate: new Date(),
};

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends ODataServiceBase<Supplier> {
  protected override oDataEntityName: string = 'Suppliers';

  constructor(factory: ODataServiceFactory) {
    super(factory);
  }

  getSupplier(userId: string): Observable<Supplier> {
    return this.ODataService.entities()
      .query((c) => c.filter(({ e }) => e().eq('managerId', userId, 'none')))
      .fetch()
      .pipe(
        first(),
        map((c) => c.entities![0])
      );
  }

  // getAllCompanies(): Observable<RequestPost[]> {
  //   return of(this.hardcodedPostsMockData);
  //   // this.http.get<RequestPost[]>(
  //   //   `${environment.apiBaseUrl}/api/requests`
  //   // );
  // }
}
