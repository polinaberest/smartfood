import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  dishes$?: Observable<Dish[]>;
  currentUser: User | undefined;

  constructor(
    private requestPostService: RequestPostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user().subscribe((user) => {
      this.currentUser = user;

      if (this.currentUser) {
        this.requestPosts$ = this.requestPostService.getAllUsersRequests(
          this.currentUser.id
        );
      }
    });
  }
}
