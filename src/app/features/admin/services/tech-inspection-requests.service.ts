import { Injectable } from '@angular/core';
import { TechInspectionRequest } from '../../client/models/tech-inspection-request';
import { ODataEntitySetService, ODataServiceFactory } from 'angular-odata';
import { ODataServiceBase } from 'src/app/common/ODataServiceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechInspectionRequestsService extends ODataServiceBase<TechInspectionRequest> {
  protected override oDataEntityName: string = 'TechInspectionRequests';

  constructor(factory: ODataServiceFactory, 
    private http: HttpClient) {
    super(factory);
  }

  getAllRequests(): Observable<TechInspectionRequest[]> {
    return this.ODataService.entities()
    .query((q) => {
        q.expand('fridge/filial');
      }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  fulfillTechRequest(id: string): Observable<TechInspectionRequest> {
    return this.ODataService.destroy(id);
  }
}
