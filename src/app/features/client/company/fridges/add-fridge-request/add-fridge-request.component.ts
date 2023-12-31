import { Component } from '@angular/core';
import { FridgeInstallRequest } from '../../../models/fridge-install-request.model';
import { Filial } from '../../../models/filial.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { FilialService } from '../../filials/services/filial.service';
import { FridgeInstallService } from '../services/fridge-install.service';

@Component({
  selector: 'app-add-fridge-request',
  templateUrl: './add-fridge-request.component.html',
  styleUrls: ['./add-fridge-request.component.css'],
  providers: [MessageService]
})
export class AddFridgeRequestComponent {
    organizationId: string | null = null;
    model: FridgeInstallRequest;
    filials$?: Observable<Filial[]>;

    routeSubscription?: Subscription;

    constructor(
      private route: ActivatedRoute,
      private fridgeInstallService: FridgeInstallService,
      private filialService: FilialService,
      private router: Router,
      public messageService: MessageService
    ) {
      this.model = {
        filialId: '',
        placementDescription: '',
      }
    }

    ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe();
    }

    ngOnInit(): void {
      this.routeSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.organizationId = params.get('organizationId');

          //get all filials of this Organization from API
          if (this.organizationId) {
            this.filials$ = this.filialService.getAllOrganizationFilials(this.organizationId);
          }
        },
      });
    }

    onFormSubmit(): void {
      console.log(this.model);

      if (this.organizationId && this.model.filialId) {
        this.showSuccess();

        this.fridgeInstallService.create(this.model)
        .subscribe({
          next: (response) => {
            // this.router.navigateByUrl('/organization/' + this.organizationId + '/smartfridges-list');
            setTimeout(() => {
             this.router.navigateByUrl('/organization/' + this.organizationId + '/smartfridges-list');
           }, 3000);
           }
        });
      }
      else {
        this.showError();
      }
    }

    showSuccess() {
      this.messageService.add({ severity: 'success', summary: 'Success: ', detail: $localize `The installation request is accepted.` });
    }

    showError() {
      this.messageService.add({ severity: 'error', summary: 'Error: ', detail: $localize `Fill in the form first.` });
    }
  }
