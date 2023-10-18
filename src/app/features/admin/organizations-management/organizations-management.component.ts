import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Organization } from '../../client/models/organization.model';
import { UpdateOrganization } from '../../client/models/update-organization.model';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { OrganizationService } from '../../client/services/organization.service';

@Component({
  selector: 'app-organizations-management',
  templateUrl: './organizations-management.component.html',
  styleUrls: ['./organizations-management.component.css'],
  providers: [MessageService]
})
export class OrganizationsManagementComponent {
  organizations$?: Observable<Organization[]>;

  changeStateSubscription?: Subscription;

  private readonly blockMsg = $localize `The organization is blocked, no service available!`;
  private readonly unblockMsg = $localize `The organization is unblocked, all the services available!`;

  constructor(
    private readonly organizationService: OrganizationService,
    private readonly router: Router,
    public messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.organizations$ = this.organizationService.getAllOrganizations();
  }

  ngOnDestroy(): void {
    this.changeStateSubscription?.unsubscribe();
  }

  blockOrganization(organization: Organization): void {
    this.showSuccess(this.blockMsg);
    this.updateOrganizationState(organization.id);
  }

  unblockOrganization(organization: Organization): void {
    this.showSuccess(this.unblockMsg);
    this.updateOrganizationState(organization.id);
  }

  updateOrganizationState(organizationId: string): void {
      this.changeStateSubscription = this.organizationService.updateOrganizationsState(organizationId).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.router.navigateByUrl('/admin/organizations-management');
          }, 3000);

          this.organizations$ = this.organizationService.getAllOrganizations();
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
