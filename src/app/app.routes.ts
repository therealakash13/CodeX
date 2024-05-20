import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { CreateBinComponent } from './components/create-bin/create-bin.component';
import { AppComponent } from './app.component';
import { authGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewComponent } from './components/view/view.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'create', component: CreateBinComponent, canActivate: [authGuard] },
  // lazyLoad
  // {
  //   path: 'about',
  //   loadComponent: () =>
  //     import('./components/about/about.component').then(
  //       (mod) => mod.AboutComponent
  //     ),
  // },
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'view/:id', component: ViewComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent },
];
