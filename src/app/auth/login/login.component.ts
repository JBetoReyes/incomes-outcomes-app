import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';

import Swal from 'sweetalert2';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando = false;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(ui =>{
        this.cargando = ui.isLoading;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data: any) {
    const { email, password } = data;
    this.authService.autenticarUsuario(email, password);
  }

}
