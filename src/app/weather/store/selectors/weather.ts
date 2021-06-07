import * as fromRoot from '../index';

export const getCityList = (state : fromRoot.AppState) => state.city.cityList;
export const getErrorMessage = (state : fromRoot.AppState) => state.city.error;


