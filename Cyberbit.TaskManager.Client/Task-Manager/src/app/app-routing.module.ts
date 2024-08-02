import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NAVIGATION_URLS } from './model/enums/navigation-urls';

const routes: Routes = [
  {
    path: '',
    redirectTo: NAVIGATION_URLS.LOGIN,
    pathMatch: 'full'
  },
  {
    path: NAVIGATION_URLS.LOGIN,
    component: LoginComponent
  },
  {
    path: NAVIGATION_URLS.TASK_MANGER,
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
