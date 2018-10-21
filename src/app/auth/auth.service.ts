import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  crearUsuario(email: string, password: string) {
    this
      .afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then( resp => {
          console.log(resp);
          this.router.navigate(['/']);
      })
      .catch( err => {
        Swal('Error en el login', err.message, 'error');
      });
  }

  autenticarUsuario(email: string, password) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal('Error en el login', err.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
}
