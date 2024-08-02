import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { NAVIGATION_URLS } from '../model/enums/navigation-urls';
import { AuthService as AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error = false;
  loginFG: FormGroup;
  userNameFC = new FormControl('', [Validators.required, Validators.email]);
  passwordFC = new FormControl('', [Validators.required]);

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authService.login$.pipe(filter(loggedIn => loggedIn !== null)).subscribe((loggedIn => {
      if (loggedIn) {
        this.router.navigate([NAVIGATION_URLS.TASK_MANGER]);
      }
    }));

    this.loginFG = fb.group({
      userNameFC: this.userNameFC,
      passwordFC: this.passwordFC
    });
  }

  login(): void {
    this.error = false;
    this.authService.login(this.userNameFC.value, this.passwordFC.value).subscribe((result) => {
      if (result) {
        this.router.navigate([NAVIGATION_URLS.TASK_MANGER]);
      } else {
        this.error = true;
      }
    })
  }
}
