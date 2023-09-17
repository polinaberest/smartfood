import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  // getAllCompanies(): Observable<RequestPost[]> {
  //   return of(this.hardcodedPostsMockData);
  //   // this.http.get<RequestPost[]>(
  //   //   `${environment.apiBaseUrl}/api/requests`
  //   // );
  // }
}
