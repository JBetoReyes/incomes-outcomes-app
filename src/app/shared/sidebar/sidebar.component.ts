import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {IngresoEgresoService} from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [ `.cursor { cursor: pointer; }` ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: string;
  subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    public store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null )
      )
      .subscribe((auth) => {
        this.user = auth.user.nombre;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.ingresoEgresoService.cancelarSubscription();
    this.authService.logout();
  }

}
