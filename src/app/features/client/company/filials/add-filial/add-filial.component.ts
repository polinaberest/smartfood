import { Component, OnInit } from '@angular/core';
import { AddFilial } from '../../../models/add-filial.model';
import { FilialService } from '../services/filial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-filial',
  templateUrl: './add-filial.component.html',
  styleUrls: ['./add-filial.component.css'],
})
export class AddFilialComponent implements OnInit {
  model: AddFilial = {
    name: '',
    address: '',
    organizationId: '',
  };

  constructor(
    private filialService: FilialService,
    private router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    const organizationId = this.route.snapshot.paramMap.get('organizationId');

    // Case when organizationId is missing in query params.
    if (!organizationId) {
      // TODO: Create not found page and navigate here to it.
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.model.organizationId = organizationId;
  }

  onFormSubmit(): void {
    if (this.model) {
      debugger;
      this.filialService.create(this.model).subscribe({
        next: (response) => {
          console.log('Successful filial creating!', this.model);
          // redirect to menu
          this.router.navigate([
            '/organization',
            this.model.organizationId,
            'filials',
          ]);
        },
        error: (error) => {
          console.error('error', error);
        },
      });
    }
  }
}
