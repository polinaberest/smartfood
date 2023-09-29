import { Component } from '@angular/core';
import { Status } from '../../client/models/request-status';
import { MessageService } from 'primeng/api';
import { FridgeRequest } from '../../client/models/fridge-request.model';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { UpdateFridgeInstallRequest } from '../../client/models/update-fridge-install-request.model';

@Component({
  selector: 'app-fridge-installation-requests',
  templateUrl: './fridge-installation-requests.component.html',
  styleUrls: ['./fridge-installation-requests.component.css'],
  providers: [MessageService]
})
export class FridgeInstallationRequestsComponent {
  status = Status;
  requests$?: Observable<FridgeRequest[]>;
  updateRequest?: UpdateFridgeInstallRequest;

  approveRequestSubscription?: Subscription;
  rejectRequestSubscription?: Subscription;
  fulfillRequestSubscription?: Subscription;

  private readonly approveMsg = 'Request approved!';
  private readonly rejectMsg = 'Request rejected!';
  private readonly fulfiilledMsg = 'Request status changed to "fulfilled"!';

  constructor(
    private adminService: AdminService,
    private readonly router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.requests$ = this.adminService.getAllFridgeInstallRequests();
  }

  ngOnDestroy(): void {
    this.approveRequestSubscription?.unsubscribe();
    this.rejectRequestSubscription?.unsubscribe();
    this.fulfillRequestSubscription?.unsubscribe();
  }

  onAccept(request: FridgeRequest): void {
    this.showSuccess(this.approveMsg);

    this.updateRequest = {
      status: this.status.Approved,
    };

    this.approveRequestSubscription = this.adminService.updateFridgeInstallRequest(request.id, this.updateRequest).subscribe({
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

    this.updateRequest = {
      status: this.status.Rejected,
    };

    this.approveRequestSubscription = this.adminService.updateFridgeInstallRequest(request.id, this.updateRequest).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('/admin/fridge-installation-requests');
        }, 3000);
      },
    });
  }

  onFulfill(request: FridgeRequest): void {
    this.showSuccess(this.fulfiilledMsg);

    this.updateRequest = {
      status: this.status.Fulfilled,
    };

    this.approveRequestSubscription = this.adminService.updateFridgeInstallRequest(request.id, this.updateRequest).subscribe({
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
