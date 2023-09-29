import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Organization } from '../../client/models/company.model';
import { UpdateOrganization } from '../../client/models/update-company.model';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations-management',
  templateUrl: './organizations-management.component.html',
  styleUrls: ['./organizations-management.component.css'],
  providers: [MessageService]
})
export class OrganizationsManagementComponent {
  organizations$?: Observable<Organization[]>;
  updateOrganization: UpdateOrganization;

  changeStateSubscription?: Subscription;

  private readonly blockMsg = 'The organization is blocked, no service available!';
  private readonly unblockMsg = 'The organization is unblocked, all the services available!';

  constructor(
    private adminService: AdminService,
    private readonly router: Router,
    public messageService: MessageService
  ) {
    this.updateOrganization = {
      isBlocked: false,
    };
  }

  ngOnInit(): void {
    this.organizations$ = this.adminService.getAllOrganizations();
  }

  ngOnDestroy(): void {
    this.changeStateSubscription?.unsubscribe();
  }

  blockOrganization(organization: Organization): void {
    this.showSuccess(this.blockMsg);

    this.updateOrganization = {
      isBlocked: true,
    };

    this.updateOrganizationState(organization.id);
  }

  unblockOrganization(organization: Organization): void {
    this.showSuccess(this.unblockMsg);

    this.updateOrganization = {
      isBlocked: false,
    };

    this.updateOrganizationState(organization.id);
  }

  updateOrganizationState(organizationId: string): void {
      this.changeStateSubscription = this.adminService.updateOrganization(organizationId, this.updateOrganization).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.router.navigateByUrl('/admin/organizations-management');
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
