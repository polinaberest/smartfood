import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { Observable, Subscription } from 'rxjs';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/sevices/auth.service';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/supplier.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  supplierId?: string;
  dishes$?: Observable<Dish[]>;

  supplierSubscription$?: Subscription;
  supplier?: Supplier | null;

  constructor(
    private dishService: DishService,
    private readonly authService: AuthService,
    private readonly supplierService: SupplierService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('supplierId');

    // Case when supplierId is missing in query params.
    if (!supplierId) {
      // TODO: Create not found page and navigate here to it.
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.supplierId = supplierId;

    this.supplierSubscription$ = this.supplierService
            .getById(supplierId)
            .subscribe((s) => {
              this.supplier = s;
              
              if(this.supplier?.isBlocked) {
                this.authService.logout();
                this.router.navigateByUrl('/blocked');
              }
            });

    this.dishes$ = this.dishService.getAllSupplierDishes(supplierId);
  }

  ngOnDestroy(): void {
    this.supplierSubscription$?.unsubscribe();
  }
}
