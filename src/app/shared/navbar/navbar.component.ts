import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {AuthState} from '../../auth/auth.reducer';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  usuario: string;

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null )
      )
      .subscribe((authState: AuthState) => {
        this.usuario = authState.user.nombre;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
