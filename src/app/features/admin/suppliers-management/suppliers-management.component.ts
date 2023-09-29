import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Supplier } from '../../client/models/supplier.model';
import { Observable, Subscription } from 'rxjs';
import { UpdateSupplier } from '../../client/models/update-supplier.model';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers-management',
  templateUrl: './suppliers-management.component.html',
  styleUrls: ['./suppliers-management.component.css'],
  providers: [MessageService]
})
export class SuppliersManagementComponent {
  suppliers$?: Observable<Supplier[]>;
  updateSupplier: UpdateSupplier;

  changeStateSubscription?: Subscription;

  private readonly blockMsg = 'The food supplier is blocked, no service available!';
  private readonly unblockMsg = 'The food supplier is unblocked, all the services available!';

  constructor(
    private adminService: AdminService,
    private readonly router: Router,
    public messageService: MessageService
  ) {
    this.updateSupplier = {
      isBlocked: false,
    };
  }

  ngOnInit(): void {
    this.suppliers$ = this.adminService.getAllSuppliers();
  }

  ngOnDestroy(): void {
    this.changeStateSubscription?.unsubscribe();
  }

  blockSupplier(supplier: Supplier): void {
    this.showSuccess(this.blockMsg);

    this.updateSupplier = {
      isBlocked: true,
    };

    this.updateSupplierState(supplier.id);
  }

  unblockSupplier(supplier: Supplier): void {
    this.showSuccess(this.unblockMsg);

    this.updateSupplier = {
      isBlocked: false,
    };

    this.updateSupplierState(supplier.id);
  }

  updateSupplierState(supplierId: string): void {
      this.changeStateSubscription = this.adminService.updateSupplier(supplierId, this.updateSupplier).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.router.navigateByUrl('/admin/food-suppliers-management');
          }, 3000);
        },
      });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success: ', detail: message });
  }

  getStateColor(isBlocked: boolean = false): string {
    if (isBlocked) {
      return 'rgb(255, 146, 146)';
    }
    else {
      return 'white';
    }
  }
}
