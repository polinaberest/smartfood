import { Component, ViewChild } from '@angular/core';
import { AuthService, Role } from '../sevices/auth.service';
import { RegisterRequest } from '../models/register-request.model';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: RegisterRequest;
  role = Role;

  confirmPassword: string = '';
  passwordsNotMatch: boolean = false;
  isShortPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.model = {
      email: '',
      password: '',
      name: '',
      organizationName: '',
      description: '',
      role: this.role.OrganizationManager,
    };
  }

  @ViewChild('emailField', { static: true })
  emailField?: NgModel;

  setUserRole(role: string) {
    this.model.role = role;
  }

  validateUser(): boolean {
    return (
      this.validatePassword() &&
      this.model.email.trim().length > 3 &&
      this.model.name.trim().length >= 5
    );
  }

  validatePassword(): boolean {
    if (this.model.password !== this.confirmPassword) {
      this.passwordsNotMatch = true;
      return false;
    }

    if (this.model.password.trim().length < 6) {
      this.isShortPassword = true;
      return false;
    }

    return true;
  }

  resetPasswordError() {
    this.passwordsNotMatch = false;
    this.isShortPassword = false;
  }

  onFormSubmit(): void {
    if (this.validateUser()) {
      this.authService.register(this.model).subscribe({
        next: (response) => {
          console.log('Successful registration!', this.model);
          // redirect to login
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.error('error', error);
        },
      });
    }
  }
}
