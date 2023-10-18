import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Status } from '../../client/models/request-status';
import { TechInspectionRequest } from '../../client/models/tech-inspection-request';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TechInspectionRequestsService } from '../services/tech-inspection-requests.service';

@Component({
  selector: 'app-tech-inspections-management',
  templateUrl: './tech-inspections-management.component.html',
  styleUrls: ['./tech-inspections-management.component.css'],
  providers: [MessageService]
})
export class TechInspectionsManagementComponent {
  status = Status;
  requests$?: Observable<TechInspectionRequest[]>;

  fulfillRequestSubscription?: Subscription;

  private readonly fulfiilledMsg = $localize `Request status changed to "fulfilled"!`;

  constructor(
    private readonly techInspectionService: TechInspectionRequestsService,
    private readonly router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.requests$ = this.techInspectionService.getAllRequests();
  }

  ngOnDestroy(): void {
    this.fulfillRequestSubscription?.unsubscribe();
  }

  onFulfill(requestId: string): void {
    this.showSuccess(this.fulfiilledMsg);

    this.fulfillRequestSubscription = this.techInspectionService.fulfillTechRequest(requestId).subscribe({
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
}
