import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {dasboardRoutes} from './dasboard.routes';
import {AuthGuardService} from '../auth/auth-guard.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dasboardRoutes,
    // canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes ),
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class DashboardRoutingModule { }
