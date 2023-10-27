import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Fridge } from '../../../models/fridge.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FridgeService } from '../services/fridge.service';
import { FridgeRequest } from '../../../models/fridge-request.model';
import { FridgeInstallService } from '../services/fridge-install.service';
import { DatePipe } from '@angular/common';
import { Organization } from '../../../models/organization.model';
import { OrganizationService } from '../../../services/organization.service';
import { AuthService } from 'src/app/features/auth/sevices/auth.service';

@Component({
  selector: 'app-fridges-list',
  templateUrl: './fridges-list.component.html',
  styleUrls: ['./fridges-list.component.css'],
  providers: [DatePipe]
})
export class FridgesListComponent implements OnInit{
  organizationId?: string;
  fridges$?: Observable<Fridge[]>;
  requests$?: Observable<FridgeRequest[]>;

  organization?: Organization | null;
  organizationSubscription$?: Subscription;

  constructor(
    private fridgeService: FridgeService,
    private fridgeInstallService: FridgeInstallService,
    private organizationService: OrganizationService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const organizationId = this.route.snapshot.paramMap.get('organizationId');

    // Case when orgId is missing in query params.
    if (!organizationId) {
      // TODO: Create not found page and navigate here to it.
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.organizationId = organizationId;

    this.organizationSubscription$ = this.organizationService
            .getById(organizationId)
            .subscribe((s) => {
              this.organization = s;
              
              if(this.organization?.isBlocked) {
                this.authService.logout();
                this.router.navigateByUrl('/blocked');
              }
            });

    this.fridges$ = this.fridgeService.getAllOrganizationsFridges(organizationId);

    this.requests$ = this.fridgeInstallService.getOrganizationsInstallationRequests(organizationId);
  }

  ngOnDestroy(): void {
    this.organizationSubscription$?.unsubscribe();
  }
}
