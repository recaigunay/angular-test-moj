import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';

// IF YOU DECIDE TO USE NG-RX YOU'LL NEED TO UNCOMMENT SOME LINES
 import { StoreModule } from '@ngrx/store';
 import { Store } from "@ngrx/store";
 import { EffectsModule } from '@ngrx/effects';

 import { cityReducer } from './store/reducers/weather';
 import { weatherEffect } from './store/effects/weather';

 import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WeatherFacadeService } from './weather-facade.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature('city', cityReducer),
    EffectsModule.forFeature([weatherEffect])
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainer
  ],
  providers: [
    WeatherService, Store, WeatherFacadeService
  ]
})
export class WeatherModule { }
