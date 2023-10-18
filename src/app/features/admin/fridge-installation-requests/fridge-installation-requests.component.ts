import { Component } from '@angular/core';
import { Status } from '../../client/models/request-status';
import { MessageService } from 'primeng/api';
import { FridgeRequest } from '../../client/models/fridge-request.model';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { UpdateFridgeInstallRequest } from '../../client/models/update-fridge-install-request.model';
import { FridgeInstallService } from '../../client/company/fridges/services/fridge-install.service';
import { FridgeDeinstallService } from '../../client/company/fridges/services/fridge-deinstall.service';
import { FridgeDeinstallationRequest } from '../../client/models/fridge-deinstall-request.model';

@Component({
  selector: 'app-fridge-installation-requests',
  templateUrl: './fridge-installation-requests.component.html',
  styleUrls: ['./fridge-installation-requests.component.css'],
  providers: [MessageService]
})
export class FridgeInstallationRequestsComponent {
  status = Status;
  requestsInstall$?: Observable<FridgeRequest[]>;
  requestsDeinstall$?: Observable<FridgeDeinstallationRequest[]>;
  updateRequest?: UpdateFridgeInstallRequest;

  approveRequestSubscription?: Subscription;
  rejectRequestSubscription?: Subscription;
  fulfillRequestSubscription?: Subscription;

  private readonly approveMsg = $localize `Request approved!`;
  private readonly rejectMsg = $localize `Request rejected!`;
  private readonly fulfiilledMsg = $localize `Request status changed to "fulfilled"!`;

  constructor(
    private readonly fridgeDeinstallService: FridgeDeinstallService,
    private readonly fridgeInstallService: FridgeInstallService,
    private readonly router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.requestsInstall$ = this.fridgeInstallService.getAllRequests();
    this.requestsDeinstall$ = this.fridgeDeinstallService.getAllRequests();
  }

  ngOnDestroy(): void {
    this.approveRequestSubscription?.unsubscribe();
    this.rejectRequestSubscription?.unsubscribe();
    this.fulfillRequestSubscription?.unsubscribe();
  }

  onAccept(request: FridgeRequest): void {
    this.showSuccess(this.approveMsg);

    request.status = this.status.Approved;

    this.approveRequestSubscription = this.fridgeInstallService.updateFridgeInstallRequest(request.id, request).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('/admin/fridge-installation-requests');
        }, 3000);
      },
    });

    //this.requests$ = this.adminService.getAllFridgeInstallRequests();
  }

  onReject(request: FridgeRequest): void {
    this.showSuccess(this.rejectMsg);

    request.status = this.status.Rejected;

    this.approveRequestSubscription = this.fridgeInstallService.updateFridgeInstallRequest(request.id, request).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('/admin/fridge-installation-requests');
        }, 3000);
      },
    });
  }

  onFulfill(request: FridgeRequest): void {
    this.showSuccess(this.fulfiilledMsg);

    request.status = this.status.Fulfilled;

    this.approveRequestSubscription = this.fridgeInstallService.updateFridgeInstallRequest(request.id, request).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('/admin/fridge-installation-requests');
        }, 3000);
      },
    });
  }

  onDeinstall(requestId: string): void {
    this.showSuccess(this.fulfiilledMsg);

    this.approveRequestSubscription = this.fridgeDeinstallService.fulfillFridgeDeinstallRequest(requestId).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('/admin/fridge-installation-requests');
        }, 3000);
      },
    });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success: ', detail: message });
  }

  getRequestStatusColor(requestStatus: string): string {
    switch (requestStatus) {
      case this.status.Approved:
        return 'rgb(150, 255, 150)';
      case this.status.Rejected:
        return 'rgb(255, 146, 146)';
      case this.status.Fulfilled:
        return 'rgb(220,220,220)';
      default:
        return 'white'; 
    }
  }
}
