import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {IngresoEgreso} from '../ingreso-egreso.model';
import {IngresoEgresoService} from '../ingreso-egreso.service';

import Swal from 'sweetalert2';
import {FullAppState} from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  ingresoEgresoSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<FullAppState>,
    public ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.ingresoEgresoSubscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        const { items } = ingresoEgreso;
        this.items = items;
      });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal('Eliminado', item.descripcion, 'success');
      })
      .catch(error => {
        Swal('Error', error.message, 'error');
      });
  }

}
