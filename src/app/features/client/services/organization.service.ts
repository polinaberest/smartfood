import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, first, map } from 'rxjs';
import { Organization } from '../models/organization.model';
import { companyUser } from '../../auth/sevices/auth.service';
import { Filial } from '../models/filial.model';
import { filialsMock } from '../company/filials/services/filial.service';
import { ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';

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
export class OrganizationService extends ODataServiceBase<Organization> {
  protected override oDataEntityName: string = 'Organizations';

  constructor(factory: ODataServiceFactory) {
    super(factory);
  }

  // getAllCompanies(): Observable<RequestPost[]> {
  //   return of(this.hardcodedPostsMockData);
  //   // this.http.get<RequestPost[]>(
  //   //   `${environment.apiBaseUrl}/api/requests`
  //   // );
  // }

  getOrganizationByManagerId(managerId: string): Observable<Organization> {
    debugger;
    return this.ODataService.entities()
      .query((c) => c.filter(({ e }) => e().eq('managerId', managerId, 'none')))
      .fetch()
      .pipe(
        first(),
        map((c) => c.entities![0])
      );
  }
}
