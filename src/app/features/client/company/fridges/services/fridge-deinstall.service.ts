import { Injectable } from '@angular/core';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FridgeDeinstallationRequest } from '../../../models/fridge-deinstall-request.model';

@Injectable({
  providedIn: 'root'
})
export class FridgeDeinstallService extends ODataServiceBase<FridgeDeinstallationRequest> {
  protected override oDataEntityName: string = 'FridgeDeinstallationRequests';

  constructor(factory: ODataServiceFactory, 
    private http: HttpClient) {
    super(factory);
  }

  getAllRequests(): Observable<FridgeDeinstallationRequest[]> {
    return this.ODataService.entities()
    .query((q) => {
        q.expand('fridge/filial');
      }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  fulfillFridgeDeinstallRequest(id: string): Observable<FridgeDeinstallationRequest> {
    return this.ODataService.destroy(id);
  }
}
