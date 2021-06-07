import * as weatherActions from '../actions/weather';
import { Summary } from '../../../model/weather';
import * as fromRoot from '../index';

export interface CityState {
  cityList: Summary[],
  loading: boolean,
  error: string
}

const initialState: CityState = {
  cityList: [],
  loading: false,
  error: ""
}

export function cityReducer(state = initialState, action: weatherActions.Actions): CityState {

  switch (action.type) {
    case weatherActions.WeatherActionTypes.SEARCH_CITY: {
      return {
        ...state,
        loading: true,
      }
    }
    case weatherActions.WeatherActionTypes.SEARCH_CITY_SUCCESS: {
      return {
        ...state,
        cityList: [
          ...state.cityList.filter(item => item.city !== action.payload.city),
          action.payload
        ],
        loading: false,
        error: ""
      }
    }
    case weatherActions.WeatherActionTypes.SEARCH_CITY_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

