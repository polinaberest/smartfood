import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../models/login-request.model';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../models/register-request.model';


const mockLoginResponse: LoginResponse = {
  id: 'ba25735e-da37-4925-8cad-5dddad98b0ae',
  email: 'p.b@gmail.com',
  name: 'Polina Berest',
  roles: ['Superadmin'],
  description: null,
  registerDate: new Date("22-08-2023"),
  token: 'e62f19e6-9f5d-47fc-ab6c-9c2fe3705ea2',
};

export const userMock: User = { ...mockLoginResponse };

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return of(mockLoginResponse);

    // return this.http.post<LoginResponse>(
    //   `${environment.apiBaseUrl}/api/auth/login`,
    //   {
    //     email: request.email,
    //     password: request.password,
    //     role: request.role
    //   }
    // );
  }

  register(request: RegisterRequest): Observable<any> {
    return of(true);
    //return this.http.post(`${environment.apiBaseUrl}/api/auth/register`, request);
  }

  setUser(user: User): void {
    this.$user.next(user);

    localStorage.setItem('user-id', user.id);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-name', user.name);
    localStorage.setItem('user-description', user.description || '');
    localStorage.setItem('user-register-date', user.registerDate.toString());
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const id = localStorage.getItem('user-id');
    const email = localStorage.getItem('user-email');
    const description = localStorage.getItem('user-description');
    const register = localStorage.getItem('user-register-date');
    const name = localStorage.getItem('user-name');
    const roles = localStorage.getItem('user-roles');

    if (id && email && roles) {
      const user: User = {
        id,
        email,
        description,
        registerDate: new Date(register || ''),
        name: name || email,
        roles: roles?.split(','),
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
