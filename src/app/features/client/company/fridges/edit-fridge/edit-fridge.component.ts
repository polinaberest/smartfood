import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fridge } from '../../../models/fridge.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FridgeService } from '../services/fridge.service';
import { Subscription } from 'rxjs';
import { UpdateFridge } from '../../../models/update-fridge.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-fridge',
  templateUrl: './edit-fridge.component.html',
  styleUrls: ['./edit-fridge.component.css'],
  providers: [MessageService]
})
export class EditFridgeComponent implements OnInit, OnDestroy {
  id: string | null = null;
  organizationId: string | null = null;
  model?: Fridge;

  routeSubscription?: Subscription;
  updateFridgeSubscription?: Subscription;
  getFridgeSubscription?: Subscription;
  deleteFridgeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fridgeService: FridgeService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateFridgeSubscription?.unsubscribe();
    this.getFridgeSubscription?.unsubscribe();
    this.deleteFridgeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        this.organizationId = params.get('organizationId');

        //get fridge from API
        if (this.id) {
          this.getFridgeSubscription = this.fridgeService
            .getFridgeById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
              },
            });
        }
      },
    });
  }

  onFormSubmit(): void {
    console.log(this.model);

    if (this.model && this.id) {
      var updateFridge: UpdateFridge = {
        placementDescription: this.model.placementDescription,
      };

      this.updateFridgeSubscription = this.fridgeService
        .updateFridge(this.id, updateFridge)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/organization/' + this.organizationId + '/smartfridges-list');
          },
        });
    }
  }

  onDelete(): void {
    this.showError();
    if (this.model && this.id) {
      var updateFridge: UpdateFridge = {
        placementDescription: this.model.placementDescription,
        isDeleted: true,
      };

      this.deleteFridgeSubscription = this.fridgeService
        .updateFridge(this.id, updateFridge)
        .subscribe({
          next: (response) => {
           // this.router.navigateByUrl('/organization/' + this.organizationId + '/smartfridges-list');
           setTimeout(() => {
            this.router.navigateByUrl('/organization/' + this.organizationId + '/smartfridges-list');
          }, 3000);
          },
        });
    }
  }

  showError() {
    this.messageService.add({ severity: 'warn', summary: 'Warning: ', detail: $localize `The fridge will be removed at the earliest convenience. No more food orders available` });
  }
}
