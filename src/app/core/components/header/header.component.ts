import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService, Role } from 'src/app/features/auth/sevices/auth.service';
import { Supplier } from 'src/app/features/client/models/supplier.model';
import { SupplierService } from 'src/app/features/client/services/supplier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user?: User;
  supplier?: Supplier;
  role = Role;

  userSubscription$?: Subscription;
  supplierSubscription$?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.userSubscription$ = this.authService.user().subscribe({
      next: (user) => {
        this.user = user;
        if (user && user?.roles?.includes(Role.Supplier)) {
          this.supplierSubscription$ = this.supplierService
            .getSupplier(user?.id)
            .subscribe((s) => (this.supplier = s));
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
