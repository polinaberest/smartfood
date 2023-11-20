import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackupFile } from '../../client/models/backup-file';

@Injectable({
  providedIn: 'root'
})
export class SystemAdministrationService {

  constructor(private http: HttpClient) { }

  getAllBackups(): Observable<BackupFile[]> {
    return this.http.get<BackupFile[]>(`${environment.apiBaseUrl}/api/backup/all`);
  }

  createBackup(): Observable<BackupFile> {
    return this.http.post<BackupFile>(`${environment.apiBaseUrl}/api/backup/create`, null);
  }
}
