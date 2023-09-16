import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier.model';
import { supplierUser } from '../../auth/sevices/auth.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const supplierMock: Supplier = {
  id: "c057fbdb-a98d-4132-9df2-7ce7b3589e8c",
  description: "American fast food restaurant chain headquartered in Louisville, Kentucky, that specializes in fried chicken",
  manager: supplierUser,
  name: "KFC",
  registerDate: new Date()
};

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) {}

  getSupplier(userId: string): Observable<Supplier> {
    return of(supplierMock);
    // this.http.get<Supplier>(
    //   `${environment.apiBaseUrl}/api/users/{userId}/suppliers`
    // );
  }
  // getAllCompanies(): Observable<RequestPost[]> {
  //   return of(this.hardcodedPostsMockData);
  //   // this.http.get<RequestPost[]>(
  //   //   `${environment.apiBaseUrl}/api/requests`
  //   // );
  // }
}
