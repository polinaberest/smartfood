import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Organization } from '../models/organization.model';
import { companyUser } from '../../auth/sevices/auth.service';
import { Filial } from '../models/filial.model';
import { filialsMock } from '../company/filials/services/filial.service';

export const organizationMock: Organization = {
  id: "c057fbdb-a98d-4132-9df2-7ce7b3589e8c",
  description: "An outstanding IT company",
  manager: companyUser,
  name: "NIX",
  registerDate: new Date()
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {}

  // getAllCompanies(): Observable<RequestPost[]> {
  //   return of(this.hardcodedPostsMockData);
  //   // this.http.get<RequestPost[]>(
  //   //   `${environment.apiBaseUrl}/api/requests`
  //   // );
  // }

  getOrganization(userId: string): Observable<Organization> {
    return of(organizationMock);
    // this.http.get<Organization>(
    //   `${environment.apiBaseUrl}/api/users/{userId}/organizations`
    // );
  }

  // TODO: move to filial service
  getOrganizationFilials(companyId: string): Observable<Filial[]> {
    //return this.http.get<Filial[]>(`/api/companies/${companyId}/filials`);
    return of(filialsMock);
  }
}
