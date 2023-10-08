import { Component } from '@angular/core';
import { CreateDishRequest } from '../../models/create-dish-request.model';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css'],
})
export class AddDishComponent {
  model: CreateDishRequest = {
    name: '',
    price: 0,
    supplierId: '',
    description: null,
  };

  constructor(
    private dishService: DishService,
    private router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    const supplierId = this.route.snapshot.paramMap.get('supplierId');

    // Case when supplierId is missing in query params.
    if (!supplierId) {
      // TODO: Create not found page and navigate here to it.
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.model.supplierId = supplierId;
  }

  validateDish(): boolean {
    return this.model.name.trim().length >= 2;
  }

  onFormSubmit(): void {
    if (this.validateDish()) {
      this.dishService.create(this.model).subscribe({
        next: (response) => {
          console.log('Successful dish creating!', this.model);
          // redirect to menu
          this.router.navigate([
            '/food-supplier',
            this.model.supplierId,
            'menu',
          ]);
        },
        error: (error) => {
          console.error('error', error);
        },
      });
    }
  }
}
