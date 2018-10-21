import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

import {AppState} from '../../app.reducer';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit( data: any ) {
    const { nombre, email, password } = data;
    this.authService.crearUsuario(email, password, nombre);
  }

}
