import { Component, OnDestroy, OnInit } from '@angular/core';
import { Filial } from '../../../models/filial.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FilialService } from '../services/filial.service';
import { MessageService } from 'primeng/api';
import { UpdateFilial } from '../../../models/update-filial.model';

@Component({
  selector: 'app-edit-filial',
  templateUrl: './edit-filial.component.html',
  styleUrls: ['./edit-filial.component.css'],
  providers: [MessageService]
})
export class EditFilialComponent implements OnInit, OnDestroy{
  id: string | null = null;
  organizationId: string | null = null;
  model?: Filial;

  routeSubscription?: Subscription;
  updateFilialSubscription?: Subscription;
  getFilialSubscription?: Subscription;
  deleteFilialSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private filialService: FilialService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateFilialSubscription?.unsubscribe();
    this.getFilialSubscription?.unsubscribe();
    this.deleteFilialSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        this.organizationId = params.get('organizationId');

        //get filial from API
        if (this.id) {
          this.getFilialSubscription = this.filialService
            .getFilialById(this.id)
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
      var updateFilial: UpdateFilial = {
        name: this.model.name,
        address: this.model.address
      };

      this.updateFilialSubscription = this.filialService
        .updateFilial(this.id, updateFilial)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/organization/' + this.organizationId + '/filials');
          },
        });
    }
  }

  onDelete(): void {
    this.showError();

    if (this.model && this.id) {
      var deleteFilial: UpdateFilial = {
        name: this.model.name,
        address: this.model.address,
        isDeleted: true,
      };

      this.deleteFilialSubscription = this.filialService
        .updateFilial(this.id, deleteFilial)
        .subscribe({
          next: (response) => {
           // this.router.navigateByUrl('/organization/' + this.organizationId + '/smartfridges-list');
           setTimeout(() => {
            this.router.navigateByUrl('/organization/' + this.organizationId + '/filials');
          }, 5000);
          },
        });
    }
  }

  showError() {
    this.messageService.add({ severity: 'warn', summary: 'Warning: ', detail: $localize `The filial was deleted. The smartfidges will be removed at the earliest convenience. No more food orders available` });
  }

}
