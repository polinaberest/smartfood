import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FridgeUseRequest } from '../../../models/fridge-use-request.model';
import { FridgeUseService } from '../../services/fridge-use.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent {
  supplierId?: string;
  requests$?: Observable<FridgeUseRequest[]>;

  constructor(
    private fridgeUseService: FridgeUseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('supplierId');

    // Case when supId is missing in query params.
    if (!supplierId) {
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.supplierId = supplierId;

    this.requests$ = this.fridgeUseService.getSuppliersRequests(supplierId);
  }

  getRequestStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return 'rgb(150, 255, 150)';
      case 'Rejected':
        return 'rgb(255, 146, 146)';
      default:
        return 'white'; 
    }
  }

}
