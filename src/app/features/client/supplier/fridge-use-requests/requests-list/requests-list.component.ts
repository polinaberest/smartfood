import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FridgeUseRequest } from '../../../models/fridge-use-request.model';
import { FridgeUseService } from '../../services/fridge-use.service';
import { AuthService } from 'src/app/features/auth/sevices/auth.service';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/supplier.model';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit, OnDestroy{
  supplierId?: string;
  requests$?: Observable<FridgeUseRequest[]>;

  supplierSubscription$?: Subscription;
  supplier?: Supplier | null;

  constructor(
    private fridgeUseService: FridgeUseService,
    private authService: AuthService,
    private supplierService: SupplierService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('supplierId');

    // Case when supId is missing in query params.
    if (!supplierId) {
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

    this.requests$ = this.fridgeUseService.getSupplierUsageRequests(supplierId);
  }

  ngOnDestroy(): void {
    this.supplierSubscription$?.unsubscribe();
  }

  getRequestStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return 'rgb(150, 255, 150)';
      case 'Rejected':
        return 'rgb(255, 146, 146)';
      default:
        return 'white'; 
    }
  }

}
