import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  },
    provideHttpClient(), Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
