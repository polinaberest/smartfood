import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

