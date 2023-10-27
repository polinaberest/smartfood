import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService, Role } from 'src/app/features/auth/sevices/auth.service';
import { Organization } from 'src/app/features/client/models/organization.model';
import { Supplier } from 'src/app/features/client/models/supplier.model';
import { OrganizationService } from 'src/app/features/client/services/organization.service';
import { SupplierService } from 'src/app/features/client/services/supplier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user?: User;
  supplier?: Supplier;
  organization?: Organization;
  role = Role;

  userSubscription$?: Subscription;
  supplierSubscription$?: Subscription;
  organizationSubscription$?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly supplierService: SupplierService,
    private readonly organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.userSubscription$ = this.authService.user().subscribe({
      next: (user) => {
        this.user = user;
        console.log(user);
        if (user && user?.roles?.includes(Role.Supplier)) {
          this.supplierSubscription$ = this.supplierService
            .getSupplier(user?.id)
            .subscribe((s) => {
              this.supplier = s;
            });
        }
        if (user && user?.roles?.includes(Role.OrganizationManager)) {
          this.organizationSubscription$ = this.organizationService
            .getOrganizationByManagerId(user?.id)
            .subscribe((s) => (this.organization = s));
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription$?.unsubscribe();
    this.supplierSubscription$?.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
