import { TestBed } from '@angular/core/testing';
import { weatherEffect } from './weather';
import { WeatherService } from '../../weather.service'
import { Observable } from 'rxjs/Observable';

import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppState } from '..';
import { cityReducer } from '../reducers/weather';
import { of } from 'rxjs/observable/of';
import { hot } from 'jasmine-marbles';
import * as weatherActions from "../actions/weather";
import { Actions } from '@ngrx/effects';

export class StoreMock<T = any> extends Store<T> {
  public source = new BehaviorSubject<any>({});
  public overrideState(allStates: any) {
      this.source.next(allStates);
  }
}

describe('WeatherEffects', () => {
  let weatherEffects, weatherService;
  let actions$: Observable<Actions>;
  let store: StoreMock<AppState>;

  const mockData = {
    city: "london",
    country: "UK",
    temperature06am: 1,
    temperature12pm: 2,
    temperature06pm: 3,
    temperature12am: 4
  }
  let initialState = {
    cityList: [mockData], loading: false, error: ""
  }

  let mockAppState = { city: initialState };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({ city: cityReducer })
    ],
    providers: [
      weatherEffect,
      provideMockActions(() => actions$),
      {
        provide: WeatherService,
        useValue: jasmine.createSpyObj('weatherService', ['searchWeatherForCity'])
      },
      { provide: Store, useClass: StoreMock },
    ]
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.overrideState({
      currentStateName: mockAppState
  });
    weatherEffects = TestBed.get(weatherEffect);
    weatherService = TestBed.get(WeatherService);
  });

  it('should fetch data if the searchCity action dispatched ', () => {
    weatherService.searchWeatherForCity.and.returnValue(of(mockData));

    actions$ = hot('--a-', { a: new weatherActions.SearchCity('London') });

    weatherEffects.searchCity$.subscribe(action => {
      expect(action.payload).toEqual(mockData);
    });

  });

});

