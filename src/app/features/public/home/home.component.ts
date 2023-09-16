import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from '../../client/models/company.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/sevices/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clients$?: Observable<Organization[]>;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    const fragment = window.location.hash;
    if (fragment) {
      this.scrollToElement(fragment.replace('#', ''));
    }
  }

  scrollToElement(id: string) {
    const element = this.elementRef.nativeElement.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
