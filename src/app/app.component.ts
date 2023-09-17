import { Component } from '@angular/core';
import { AuthService } from './features/auth/sevices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartfood';

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
    this.authService.loadUserFromLocalStorage();
  }
}
