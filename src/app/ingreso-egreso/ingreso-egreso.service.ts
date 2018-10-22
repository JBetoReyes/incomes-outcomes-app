import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgreso} from './ingreso-egreso.model';
import {AuthService} from '../auth/auth.service';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction, UnsetItesmAction} from './ingreso-egreso.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    public auth: AuthService,
    public store: Store<AppState>
  ) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null )
      )
      .subscribe( auth => {
        this.ingresoEgresoItems(auth.user.uid);
    });
  }

  cancelarSubscription() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItesmAction());
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((collection: any[]) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.auth.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso})
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.auth.getUsuario();
    const userUid = user.uid;
    return this.afDB.doc(`${ userUid }/ingresos-egresos/items/${ uid }`)
      .delete();
  }

}
