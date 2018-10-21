import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    const { email, password } = data;
    console.log(data);
    this.authService.autenticarUsuario(email, password);
  }

}
