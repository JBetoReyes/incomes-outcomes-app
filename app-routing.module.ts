import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './src/app/auth/login/login.component';
import {RegisterComponent} from './src/app/auth/register/register.component';
import {DashboardComponent} from './src/app/dashboard/dashboard.component';
import {dasboardRoutes} from './src/app/dashboard/dasboard.routes';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dasboardRoutes
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}