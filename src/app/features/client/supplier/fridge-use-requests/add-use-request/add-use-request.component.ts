import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddFridgeUseRequest } from '../../../models/add-fridge-use-request.model';
import { Observable, Subscription } from 'rxjs';
import { Filial } from '../../../models/filial.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FridgeService } from '../../../company/fridges/services/fridge.service';
import { DishService } from '../../services/dish.service';
import { MessageService } from 'primeng/api';
import { Dish } from '../../../models/dish.model';
import { Fridge } from '../../../models/fridge.model';
import { FilialService } from '../../../company/filials/services/filial.service';
import { FridgeUseService } from '../../services/fridge-use.service';

@Component({
  selector: 'app-add-use-request',
  templateUrl: './add-use-request.component.html',
  styleUrls: ['./add-use-request.component.css'],
  providers: [MessageService]
})
export class AddUseRequestComponent implements OnInit, OnDestroy{
  supplierId: string | null = null;
  model: AddFridgeUseRequest;
  dishes$?: Observable<Dish[]>;
  filials$?: Observable<Filial[]>;
  fridges$?: Observable<Fridge[]>;

  selectedFilialId?: string;

  routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fridgeService: FridgeService,
    private fridgeUseService: FridgeUseService,
    private filialService: FilialService,
    private dishService: DishService,
    private router: Router,
    public messageService: MessageService
  ) {
    this.model = {
      supplierId: '',
      fridgeId: '',
      dishId: '',
      requestMessage: undefined,
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.supplierId = params.get('supplierId');

        //get all filials, dishes, fridges from API
        if (this.supplierId) {
          this.model.supplierId = this.supplierId;
          this.filials$ = this.filialService.getAll();
          this.dishes$ = this.dishService.getAllSupplierDishes(this.supplierId);
          this.fridges$ = this.fridgeService.getAll();
        }
      },
    });
  }

  onFormSubmit(): void {
    console.log(this.model);

    if (this.supplierId && this.model.fridgeId && this.model.dishId) {
      this.showSuccess();

      this.fridgeUseService.create(this.model)
      .subscribe({
        next: (response) => {
          setTimeout(() => {
           this.router.navigateByUrl('/food-supplier/' + this.supplierId + '/requests');
         }, 3000);
         }
      });
    }
    else {
      this.showError();
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success: ', detail: $localize `The request is accepted.` });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error: ', detail: $localize `Fill in the form first.` });
  }

  onFilialChange() {
    if (this.selectedFilialId)
      this.fridges$ = this.fridgeService.getFilialFridges(this.selectedFilialId);
  }

}
