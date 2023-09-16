import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<RequestPost[]> {
    return of(this.hardcodedPostsMockData);
    // this.http.get<RequestPost[]>(
    //   `${environment.apiBaseUrl}/api/requests`
    // );
  }

  getRequestById(id: string): Observable<RequestPost> {
    //return this.http.get<RequestPost>(`${environment.apiBaseUrl}/api/requests/${id}`);
    return of(
      this.hardcodedPostsMockData.find((post) => post.id === id) as RequestPost
    );
  }

  getAllUsersRequests(userId: string): Observable<RequestPost[]> {
    return of(
      this.hardcodedPostsMockData.filter((post) => post.author.id === userId)
    );
  }

  addVolunteerToRequest(id: string, volunteer: User): Observable<RequestPost> {
    const url = `${environment.apiBaseUrl}/api/requests/${id}/addVolunteer`;
    return this.http.post<RequestPost>(url, { volunteer });
  }

  updateRequest(id: string, updatedRequest: UpdateRequestPost): Observable<RequestPost> {
    return this.http.put<RequestPost>(`${environment.apiBaseUrl}/api/requests/${id}?addAuth=true`, updatedRequest);
  }

  deleteRequest(id: string): Observable<RequestPost> {
    return this.http.delete<RequestPost>(`${environment.apiBaseUrl}/api/requests/${id}?addAuth=true`);
  }
}
