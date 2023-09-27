import { Component, OnInit } from '@angular/core';
import { Filial } from '../../../models/filial.model';
import { Observable } from 'rxjs';
import { FilialService } from '../services/filial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filials-list',
  templateUrl: './filials-list.component.html',
  styleUrls: ['./filials-list.component.css']
})
export class FilialsListComponent implements OnInit{
  organizationId?: string;
  filials$?: Observable<Filial[]>;

  constructor(
    private filialService: FilialService,
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

    this.filials$ = this.filialService.getAllOrganizationFilials(organizationId);
  }
}
