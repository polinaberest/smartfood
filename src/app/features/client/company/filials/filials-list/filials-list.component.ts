import { Component, OnDestroy, OnInit } from '@angular/core';
import { Filial } from '../../../models/filial.model';
import { Observable, Subscription } from 'rxjs';
import { FilialService } from '../services/filial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from '../../../models/organization.model';
import { OrganizationService } from '../../../services/organization.service';
import { AuthService } from 'src/app/features/auth/sevices/auth.service';

@Component({
  selector: 'app-filials-list',
  templateUrl: './filials-list.component.html',
  styleUrls: ['./filials-list.component.css']
})
export class FilialsListComponent implements OnInit, OnDestroy{
  organizationId?: string;
  filials$?: Observable<Filial[]>;

  organization?: Organization | null;
  organizationSubscription$?: Subscription;

  constructor(
    private filialService: FilialService,
    private readonly organizationService: OrganizationService,
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

    this.organizationSubscription$ = this.organizationService
            .getById(organizationId)
            .subscribe((s) => {
              this.organization = s;
              
              if(this.organization?.isBlocked) {
                this.authService.logout();
                this.router.navigateByUrl('/blocked');
              }
    });

    this.organizationId = organizationId;

    this.filials$ = this.filialService.getAllOrganizationFilials(organizationId);
  }

  ngOnDestroy(): void {
    this.organizationSubscription$?.unsubscribe();
  }
}
