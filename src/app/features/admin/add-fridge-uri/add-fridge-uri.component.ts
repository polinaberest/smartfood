import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FridgeInstallService } from '../../client/company/fridges/services/fridge-install.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-fridge-uri',
  templateUrl: './add-fridge-uri.component.html',
  styleUrls: ['./add-fridge-uri.component.css'],
  providers: [MessageService]
})
export class AddFridgeUriComponent {
  requestId: string | null = "";
  uri: string | null = null;

  routeSubscription?: Subscription;
  updateSubscription?: Subscription;
  checkSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fridgeInstallService: FridgeInstallService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.checkSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.requestId = params.get('requestId');
      },
    });
  }

  onFormSubmit(): void {
    console.log(this.uri);

    if (this.uri && this.requestId) {
      this.checkSubscription = this.fridgeInstallService.checkUriExists(this.uri).subscribe({ 

        next: urlExists => {
          if (urlExists) {
            this.showError();
          } 
          else {
            this.updateSubscription = this.fridgeInstallService.fulfillInstallation(this.requestId||'', this.uri||'').subscribe({
              next: () => console.log('URI saved.')
            });
          }
        }

      });
    };
  }

  showError() {
    this.messageService.add({ severity: 'danger', summary: 'Error: ', detail: $localize `The link is already taken! Make another one!` });
  }
}
