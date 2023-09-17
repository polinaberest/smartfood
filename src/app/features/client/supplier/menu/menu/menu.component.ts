import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { Observable } from 'rxjs';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { notFoundPath } from 'src/app/app-routing.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  supplierId?: string;
  dishes$?: Observable<Dish[]>;

  constructor(
    private dishService: DishService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('supplierId');

    // Case when supplierId is missing in query params.
    if (!supplierId) {
      // TODO: Create not found page and navigate here to it.
      this.router.navigateByUrl(notFoundPath);
      return;
    }

    this.supplierId = supplierId;

    this.dishes$ = this.dishService.getAllSupplierDishes(supplierId);
  }
}
