import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fridge } from '../../../models/fridge.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FridgeService } from '../services/fridge.service';
import { FridgeRequest } from '../../../models/fridge-request.model';
import { FridgeInstallService } from '../services/fridge-install.service';
import { DatePipe } from '@angular/common';

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

  constructor(
    private fridgeService: FridgeService,
    private fridgeInstallService: FridgeInstallService,
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

    this.fridges$ = this.fridgeService.getAllOrganizationsFridges(organizationId);

    this.requests$ = this.fridgeInstallService.getOrganizationsInstallationRequests(organizationId);
  }

}
