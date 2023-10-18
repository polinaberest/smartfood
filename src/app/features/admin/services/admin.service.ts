import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fridgeRequestsMock } from '../../client/company/fridges/services/fridge.service';
import { FridgeRequest } from '../../client/models/fridge-request.model';
import { UpdateFridgeInstallRequest } from '../../client/models/update-fridge-install-request.model';
import { Organization } from '../../client/models/organization.model';
import { organizationMock } from '../../client/services/organization.service';
import { UpdateOrganization } from '../../client/models/update-organization.model';
import { Supplier } from '../../client/models/supplier.model';
import { supplierMock } from '../../client/services/supplier.service';
import { UpdateSupplier } from '../../client/models/update-supplier.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) { }

  getAllFridgeInstallRequests(): Observable<FridgeRequest[]> {
    //return this.http.get<FridgeService[]>(`${environment.apiBaseUrl}/api/admin/fridge-install-requests`);
    return of(fridgeRequestsMock);
  }

  getAllOrganizations(): Observable<Organization[]> {
    //return this.http.get<Organization[]>(`${environment.apiBaseUrl}/api/admin/organization`);
    return of([organizationMock, organizationMock] as Organization[]);
  }

  updateOrganization(id: string, updatedOrganization: UpdateOrganization): Observable<Organization> {
    //return this.http.put<Organization>(`${environment.apiBaseUrl}/api/admin/organization/${id}`, updatedOrganization);
    organizationMock.isBlocked = updatedOrganization.isBlocked;
    return of(organizationMock);
  }

  getAllSuppliers(): Observable<Supplier[]> {
    //return this.http.get<Organization[]>(`${environment.apiBaseUrl}/api/admin/organization`);
    return of([supplierMock, supplierMock] as Supplier[]);
  }

  updateSupplier(id: string, updatedSupplier: UpdateSupplier): Observable<Supplier> {
    //return this.http.put<Supplier>(`${environment.apiBaseUrl}/api/admin/supplier/${id}`, updatedSupplier);
    supplierMock.isBlocked = updatedSupplier.isBlocked;
    return of(supplierMock);
  }
}
