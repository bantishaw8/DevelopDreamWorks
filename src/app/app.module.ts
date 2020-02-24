import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionComponent } from './accordion/accordion.component';
import { CommonService } from './common.service';


@NgModule({
  declarations: [AppComponent, AccordionComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService,
    // Remove this line if you want to use the real BFF API
    // dummyBackendProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
