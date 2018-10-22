import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

import {Router} from '@angular/router';

import {Store} from '@ngrx/store';
import {ActivarLoadingAction,
  DesactivarLoadingAction} from '../shared/ui.actions';
import {AppState} from '../app.reducer';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {User} from './user.model';
import {SetUserAction, UnsetUserAction} from './auth.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
          .subscribe( (usuarioDoc: any) => {
            const newUser = new User(usuarioDoc);
            this.store.dispatch(new SetUserAction(newUser));
            this.usuario = newUser;
          });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(email: string, password: string, nombre: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp)  => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email,
        };

        this.afDB.doc(`${ user.uid }/usuario`)
          .set(user)
          .then( () => {
            this.router.navigate(['/']);
            this.store.dispatch( new DesactivarLoadingAction() );
          })
          .catch(err => {
            this.store.dispatch( new DesactivarLoadingAction() );
            Swal('Error en el login', err.message, 'error');
          });

      })
      .catch(err => {
        this.store.dispatch( new DesactivarLoadingAction() );
        Swal('Error en el login', err.message, 'error');
      });
  }

  autenticarUsuario(email: string, password) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.store.dispatch( new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal('Error en el login', err.message, 'error');
      });
  }

  logout() {
    this.store.dispatch( new UnsetUserAction());
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
        })
      );
  }

  getUsuario() {
    return { ...this.usuario };
  }

}
