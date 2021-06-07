import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  // IMPLEMENT ANY INPUT OR OUTPUT YOU MIGHT NEED
  @Output()
  searchValue = new EventEmitter<string>();

  search(event) {
    if (!event.value) return;
    this.searchValue.emit(event.value);
    event.value = '';
  }
}
