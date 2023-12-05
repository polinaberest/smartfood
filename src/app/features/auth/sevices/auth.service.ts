import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../models/login-request.model';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../models/register-request.model';
import { TokenStorageService } from './tokenStorage.service';

export enum Role {
  Supplier = 'supplier',
  OrganizationManager = 'organizationmanager',
  Admin = 'admin',
  Sysadmin = 'sysadmin',
}

const superAdminResponse: LoginResponse | any = {
  id: 'ba25735e-da37-4925-8cad-5dddad98b0ae',
  email: 'p.b@gmail.com',
  name: 'Polina Berest',
  roles: [Role.Admin],
  registerDate: new Date('22-08-2023'),
  token: 'e62f19e6-9f5d-47fc-ab6c-9c2fe3705ea2',
};

const supplierResponse: LoginResponse | any = {
  id: 'ba25735e-da37-4925-8cad-5dddad98b0ae',
  email: 's@gmail.com',
  name: 'Save & Co',
  roles: [Role.Supplier],
  registerDate: new Date('22-08-2023'),
  token: 'e62f19e6-9f5d-47fc-ab6c-9c2fe3705ea2',
};

export const supplierUser: User | any = { ...supplierResponse };

const companyResponse: LoginResponse | any = {
  id: 'ba25735e-da37-4925-8cad-5dddad98b0ae',
  email: 'r@gmail.com',
  name: 'Rysya Berest',
  roles: [Role.OrganizationManager],
  registerDate: new Date('22-08-2023'),
  token: 'e62f19e6-9f5d-47fc-ab6c-9c2fe3705ea2',
};

export const companyUser: User = { ...companyResponse };

const loginResponsesMocks = [
  superAdminResponse,
  supplierResponse,
  companyResponse,
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private tokenStorage: TokenStorageService
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    const obs = this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/auth/login`,
      request
    );

    return obs;
  }

  refreshToken(token: string, refreshToken: string): Observable<LoginResponse> {
    const req = this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/Auth/refresh-token`,
      { token, refreshToken }
    );
    return req;
  }

  register(request: RegisterRequest): Observable<any> {
    const req = this.http.post(
      `${environment.apiBaseUrl}/api/Auth/registerCompany`,
      request
    );

    return req;
    return of(true);
  }

  setUser(user: User): void {
    this.$user.next(user);
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    return this.tokenStorage.getUser();
  }

  loadUserFromLocalStorage() {
    this.user().subscribe((u) => {
      if (u === undefined) {
        const localStorageUser = this.getUser();
        if (localStorageUser !== undefined) {
          this.setUser(localStorageUser);
        }
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
