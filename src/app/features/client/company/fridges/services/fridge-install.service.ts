import { Injectable } from '@angular/core';
import { FridgeRequest } from '../../../models/fridge-request.model';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FridgeInstallService extends ODataServiceBase<FridgeRequest> {
  protected override oDataEntityName: string = 'FridgeInstallationRequests';

  constructor(factory: ODataServiceFactory, 
    private http: HttpClient) {
    super(factory);
  }

  getOrganizationsInstallationRequests(organizationId: string): Observable<FridgeRequest[]> {
    debugger;
    return this.ODataService.entities()
    .query((q) => {
      q.expand('filial');
      q.filter(({ e }) => e().eq('filial/organizationId', organizationId, 'none'))
    }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }
}
