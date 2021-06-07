import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Summary } from '../model/weather';
import { WeatherFacadeService } from './weather-facade.service';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (searchValue)="citySearch($event)"></app-search>
  <app-results [cityList]="cityList$ | async"  [errorMessage]="errorMessage$ | async"></app-results>  `
})
export class WeatherContainer implements OnInit {

  cityList$: Observable<Summary[]>;
  errorMessage$: Observable<string>;

  constructor(private weatherFacade: WeatherFacadeService) { }

  citySearch(value: string) {
    this.weatherFacade.searchWeatherByCity(value)
  }

  ngOnInit() {
    this.cityList$ = this.weatherFacade.getCityList();
    this.errorMessage$ = this.weatherFacade.getCityListErrors();
  }
}
