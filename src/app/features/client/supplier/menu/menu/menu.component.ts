import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/sevices/auth.service';
import { DishService } from '../../services/dish.service';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  dishes$?: Observable<Dish[]>;

  constructor(
    private dishService: DishService,
    private supplierService: SupplierService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user().subscribe((user) => {
      if (user) {
        this.supplierService.getSupplier(user.id).subscribe(supplier => {
          this.dishes$ = this.dishService.getAllSupplierDishes(
            supplier.id
          );
        })
      }
    });
  }
}
