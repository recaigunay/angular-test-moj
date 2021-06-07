import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Summary } from '../model/weather';
import { AppState } from './store';
import { SearchCity } from './store/actions/weather';
import * as selectors from '../weather/store/selectors/weather';

@Injectable()
export class WeatherFacadeService {

  constructor(private store: Store<AppState>) { }

  searchWeatherByCity(searchKey: string) {
    this.store.dispatch(new SearchCity(searchKey));
  }

  getCityList() : Observable<Summary[]> {
    return this.store.select(selectors.getCityList);
  }

  getCityListErrors() : Observable<string> {
    return this.store.select(selectors.getErrorMessage);
  }

}
