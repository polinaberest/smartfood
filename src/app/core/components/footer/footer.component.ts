import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateToTarget(fragment: string) {
    // Navigate to the target component with the fragment identifier
    this.router.navigate(['/'], { fragment: fragment });
  }
}
