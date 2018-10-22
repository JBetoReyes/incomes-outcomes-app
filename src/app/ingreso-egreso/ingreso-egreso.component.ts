import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngresoEgreso} from './ingreso-egreso.model';
import {IngresoEgresoService} from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {Subscription} from 'rxjs';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';
import {FullAppState} from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';

  loadingSubscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService,
              private store: Store<FullAppState>) { }

  ngOnInit() {

    this.loadingSubscription = this.store.select('ui')
      .subscribe(ui => { this.cargando = ui.isLoading; });

    this.form = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0)),
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch( new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then((response) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal('Creado', ingresoEgreso.descripcion, 'success');
        this.form.reset({ monto: 0, });
      }).catch(err => {
        Swal('No creado', err.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
    });

  }

}
