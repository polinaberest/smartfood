import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FridgeUseRequest } from '../../../models/fridge-use-request.model';
import { FridgeUseService } from '../../../supplier/services/fridge-use.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css'],
  providers: [MessageService]
})
export class ManageRequestsComponent implements OnInit{
  organizationId?: string;
  requests$?: Observable<FridgeUseRequest[]>;

  acceptRequestSubscription?: Subscription;
  rejectRequestSubscription?: Subscription;

  constructor(
    private fridgeUseService: FridgeUseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    const organizationId = this.route.snapshot.paramMap.get('organizationId');

    // Case when organizationId is missing in query params.
    if (!organizationId) {
      // TODO: Create not found page and navigate here to it.
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.organizationId = organizationId;

    this.requests$ = this.fridgeUseService.getUnseenRequestsToOrganization(organizationId);
  }

  ngOnDestroy(): void {
    this.acceptRequestSubscription?.unsubscribe();
    this.rejectRequestSubscription?.unsubscribe();
  }

  onAccept(requestId: string): void {
    this.showSuccess();
    this.acceptRequestSubscription = this.fridgeUseService.acceptRequest(requestId).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('/organization/' + this.organizationId + '/fridge-use-requests');
        }, 3000);
      },
    });

    this.requests$ = this.fridgeUseService.getUnseenRequestsToOrganization(this.organizationId as string);
  }

  onReject(requestId: string): void {
    this.rejectRequestSubscription = this.fridgeUseService.acceptRequest(requestId).subscribe({
      next: (response) => {
          this.router.navigateByUrl('/organization/' + this.organizationId + '/fridge-use-requests');
      },
    });

    this.requests$ = this.fridgeUseService.getUnseenRequestsToOrganization(this.organizationId as string);
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success: ', detail: `Request accepted! Wait for the dishes in the fridge!` });
  }
}
