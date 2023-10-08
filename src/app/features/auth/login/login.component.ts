import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService, Role } from '../sevices/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../sevices/tokenStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: LoginRequest;
  role = Role;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: ({ token, refreshToken }) => {
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveRefreshToken(refreshToken);

        const user = this.tokenStorage.getUser();
        if (user) {
          this.authService.setUser(user);
        }

        // redirect to Home page after login
        this.router.navigateByUrl('/');
      },
    });
  }
}
