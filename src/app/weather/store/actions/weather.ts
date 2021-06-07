import { Action } from '@ngrx/store';
import { Summary } from '../../../model/weather';

export enum WeatherActionTypes {
    SEARCH_CITY = "[Weather] Search City",
    SEARCH_CITY_SUCCESS = "[Weather] Search City Success",
    SEARCH_CITY_FAIL = "[Weather] Search City Fail",
}

export class SearchCity implements Action {
    readonly type = WeatherActionTypes.SEARCH_CITY;
    constructor(public payload: string) {}
}

export class SearchCitySuccess implements Action {
    readonly type = WeatherActionTypes.SEARCH_CITY_SUCCESS;
    constructor(public payload: Summary) { }
}

export class SearchCityFail implements Action {
    readonly type = WeatherActionTypes.SEARCH_CITY_FAIL;
    constructor(public payload: string) { }
}

export type Actions = SearchCity | SearchCitySuccess | SearchCityFail