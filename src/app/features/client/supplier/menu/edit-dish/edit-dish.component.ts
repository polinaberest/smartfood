import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { UpdateDish } from '../../../models/update-dish.model';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css'],
})
export class EditDishComponent implements OnInit, OnDestroy {
  id: string | null = null;
  supplierId: string | null = null;
  model?: Dish;

  routeSubscription?: Subscription;
  updateDishSubscription?: Subscription;
  getDishSubscription?: Subscription;
  deleteDishSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateDishSubscription?.unsubscribe();
    this.getDishSubscription?.unsubscribe();
    this.deleteDishSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        this.supplierId = params.get('supplierId');

        //get dish from API
        if (this.id) {
          this.getDishSubscription = this.dishService
            .getById(this.id)
            .subscribe({
              next: (response) => {
                if (response) {
                  this.model = response;
                } else {
                  console.error(`Dish with id: ${this.id} is not fould`);
                }
              },
            });
        }
      },
    });
  }

  onFormSubmit(): void {
    console.log(this.model);
    // convert model to dish object
    if (this.model && this.id) {
      var updateDish: UpdateDish = {
        name: this.model.name,
        description: this.model.description,
        price: this.model.price,
        supplierId: this.supplierId!,
      };

      this.updateDishSubscription = this.dishService
        .update(this.id, updateDish)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl(
              '/food-supplier/' + this.supplierId + '/menu'
            );
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteDishSubscription = this.dishService
        .deleteDish(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl(
              '/food-supplier/' + this.supplierId + '/menu'
            );
          },
        });
    }
  }
}
