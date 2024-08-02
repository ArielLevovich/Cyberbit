import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { NAVIGATION_URLS } from '../model/enums/navigation-urls';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.login$.pipe(filter(loggedIn => loggedIn !== null)).subscribe((loggedIn => {
      if (!loggedIn) {
        this.router.navigate([NAVIGATION_URLS.LOGIN]);
      }
    }));
  }

  logout() {
    this.authService.logout();
    this.router.navigate([NAVIGATION_URLS.LOGIN]);
  }
}
