import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent], // Declaración de AppComponent
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(), // Configuración de Ionic Storage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    Camera,
  ],
  bootstrap: [AppComponent], // Punto de inicio de la aplicación
})
export class AppModule {}


