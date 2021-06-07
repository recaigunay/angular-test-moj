import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchComponent } from './search.component';

import Spy = jasmine.Spy;
import { first } from 'rxjs/operators';

describe('Search Component', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create search component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search input value when search button clicked', () => {
    const expectedValue = 'London'
    let clickedEventValue : string = '';
    const nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector("input");
    input.value = expectedValue;
    component.searchValue.pipe(first()).subscribe((value: string) => clickedEventValue = value);

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(clickedEventValue).toBe(expectedValue);
  })


 
});
