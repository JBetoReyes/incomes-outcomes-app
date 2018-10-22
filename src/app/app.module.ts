import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import {AppRoutingModule} from './app-routing.module';


// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {appReducers} from './app.reducer';

// firebase
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

// modulos personalizados
import {AuthModule} from './auth/auth.module';
import {IngresoEgresoModule} from './ingreso-egreso/ingreso-egreso.module';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    // IngresoEgresoModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
