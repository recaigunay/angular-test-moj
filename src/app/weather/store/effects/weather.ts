import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

//import { Observable, of } from "rxjs";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { map, catchError, switchMap } from "rxjs/operators";

import { WeatherService } from "../../weather.service";
import * as weatherActions from "../actions/weather";
import { Summary } from "../../../model/weather";

@Injectable()
export class weatherEffect {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
 
  @Effect()
  searchCity$: Observable<Action> = this.actions$.pipe(
    ofType<weatherActions.SearchCity>(
        weatherActions.WeatherActionTypes.SEARCH_CITY
    ),
    switchMap((action: weatherActions.SearchCity) =>
      this.weatherService.searchWeatherForCity(action.payload).pipe(
        map(
          (weather: Summary) => new weatherActions.SearchCitySuccess(weather)
        ),
        catchError(err => of(new weatherActions.SearchCityFail(err) )
        )
      )
    )
  );
  
 
}
