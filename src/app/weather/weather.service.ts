import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from "rxjs/operators";
import { Summary } from '../model/weather';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private http: HttpClient) { }

  searchWeatherForCity(city): Observable<any> {
    let options = { params: new HttpParams().set('cnt', '8').set('units', 'metric').set('APPID', '010721642521f31b0fbc8c3831d45951').set('q', city) };
    return this.http.get(`${this.url}`, options).pipe(
      map(
        (weather: any) => { return this.getNext24HoursWeather(weather) }),
      catchError(err => err)
    );
  }

  private getNext24HoursWeather(weatherItem) {
    let newItem: Summary = {
      city: "",
      country: "",
      temperature06am: null,
      temperature12pm: null,
      temperature06pm: null,
      temperature12am: null
    }
    if (weatherItem == null) return newItem;

    newItem.city = weatherItem.city.name;
    newItem.country = weatherItem.city.country;

    newItem.temperature06am = this.findTemperatureByDateTime(weatherItem.list, '06');
    newItem.temperature12pm = this.findTemperatureByDateTime(weatherItem.list, '12');
    newItem.temperature06pm = this.findTemperatureByDateTime(weatherItem.list, '18');
    newItem.temperature12am = this.findTemperatureByDateTime(weatherItem.list, '00');

    return newItem;
  }

  private findTemperatureByDateTime(weatherItemList, time) {
    let searchKey = this.getFormattedTime(time);
    let weatherData = weatherItemList.filter(p => p.dt_txt == searchKey)
    if (weatherData != null && weatherData.length > 0) {
      return weatherData[0].main.temp;
    }
    return "";
  }

  private getFormattedTime(hour) {
    let d = new Date;
    if (hour == "00") d.setDate(d.getDate() + 1);
    return [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-') + ' ' + [hour, '00', '00'].join(':');
  }

}
