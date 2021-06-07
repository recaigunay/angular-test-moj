import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { WeatherFacadeService } from './weather-facade.service';
import { StoreModule } from '@ngrx/store';
import { Summary } from '../model/weather';
import { of } from 'rxjs/observable/of';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let weatherFacadeService: WeatherFacadeService;
  const mockCityListData: Summary[] = [{
    city: "London",
    country: "UK",
    temperature06am: 10,
    temperature12pm: 12,
    temperature06pm: 13,
    temperature12am: 14
  }];

  beforeEach(async(() => {
    const spyWeatherFacadeService = jasmine.createSpyObj('WeatherFacadeService', ['getCityList', 'getCityListErrors', 'searchWeatherByCity']);
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      imports: [StoreModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: WeatherFacadeService, useValue: spyWeatherFacadeService}
      ]
    })
      .compileComponents().then(_ => {
        fixture = TestBed.createComponent(WeatherContainer);
        component = fixture.componentInstance;
        weatherFacadeService = TestBed.get(WeatherFacadeService);
        component.cityList$ = of([]);
        component.errorMessage$ = of('');
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {


  });

  it('should create WeatherContainer component', () => {
    expect(component).toBeTruthy();
  });

  it('should be called getCityList when initialize component',() => {
    expect(weatherFacadeService.getCityList).toHaveBeenCalled();

  });

  it('should be called getCityListErrors when initialize component', () => {
    expect(weatherFacadeService.getCityListErrors).toHaveBeenCalled();
  })

  it('should be called searchWeatherByCity when clicked city search', fakeAsync(() => {
    const searchKey = 'London';
    component.citySearch(searchKey);
    tick();
    expect(weatherFacadeService.searchWeatherByCity).toHaveBeenCalled();
  }));
     
});