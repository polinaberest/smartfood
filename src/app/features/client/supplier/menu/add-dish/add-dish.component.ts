import { Component, Input } from '@angular/core';
import { CreateDishRequest } from '../../models/create-dish-request.model';
import { DishService } from '../../services/dish.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css'],
})
export class AddDishComponent {
  @Input({ required: true }) supplierId: string = '';

  model: CreateDishRequest = {
    name: '',
    price: 0,
    supplierId: this.supplierId,
    description: null,
  };

  constructor(private dishService: DishService, private router: Router) {}

  validateDish(): boolean {
    return this.model.name.trim().length >= 2;
  }

  onFormSubmit(): void {
    debugger;
    if (this.validateDish()) {
      this.dishService.createDish(this.model).subscribe({
        next: (response) => {
          console.log('Successful dish creating!', this.model);
          // redirect to menu
          this.router.navigateByUrl('/food-supplier/menu');
        },
        error: (error) => {
          console.error('error', error);
        },
      });
    }
  }
}
