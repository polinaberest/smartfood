import { Injectable } from '@angular/core';
import { FridgeRequest } from '../../../models/fridge-request.model';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FridgeInstallRequest } from '../../../models/fridge-install-request.model';

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

  getAllRequests(): Observable<FridgeRequest[]> {
    return this.ODataService.entities()
    .query((q) => {
        q.expand('filial/ownerOrganization');
      }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  updateFridgeInstallRequest(id: string, updatedRequest: FridgeRequest): Observable<FridgeRequest> {
    return this.ODataService.update(id, updatedRequest).pipe(this.mapODataEntity);
  }

  checkUriExists(uri: string): Observable<boolean> {
    //return this.http.get<boolean>(`${this.apiUrl}/checkUrl?url=${encodeURIComponent(url)}`);
    return this.http.get<boolean>(`https://localhost:7065/fridge-install-requests/checkUri?uri=${encodeURIComponent(uri)}`, {});
  }

  fulfillInstallation(installRequestId: string, uri: string): Observable<FridgeInstallRequest> {
    return this.http.post<FridgeInstallRequest>(`https://localhost:7065/fridge-install-requests/${installRequestId}/fulfill?uri=${encodeURIComponent(uri)}`, {});
  }
}
