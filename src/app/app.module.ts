import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { WeatherModule } from './weather/weather.module';

import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';

//import the NGRX Store
import { StoreModule } from "@ngrx/store";

//import effects module
import { EffectsModule } from "@ngrx/effects"; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WeatherModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
