import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../sevices/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
      role: ''
    };
  }

  setUserRole(role: string) {
    this.model.role = role;
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: ({ token, id, email, name, registerDate, roles}) => {
        // set auth cookie
        this.cookieService.set(
          'Authorization',
          `Bearer ${token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );

        // set User
        this.authService.setUser({
          id,
          email,
          name,
          registerDate,
          roles,
        });

        console.log('model', this.model);

        // redirect to Home page after login
        this.router.navigateByUrl('/');
      },
    });
  }
}
