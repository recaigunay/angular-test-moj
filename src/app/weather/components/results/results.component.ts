import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  @Input() cityList = [];
  @Input() errorMessage:string;
}


