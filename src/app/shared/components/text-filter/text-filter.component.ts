import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppFiltering } from 'src/app/state/app.actions';

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss']
})

export class TextFilterComponent {
  @Input() placeholder!: string;
  @Input() tooltip!: string;
  @Input() tooltipPlacement!: string;
  @Input() text!: string;
  @Input() filterStore: boolean = true;
  @Output() onChange = new EventEmitter<any>();

  constructor(private store: Store) {}

  set() {
    if (this.filterStore) {
      this.store.dispatch(AppFiltering.search({text: this.text}));
    } else {
      this.onChange.emit(this.text);
    }
  };

  change() {
    this.set();
  };

  clear() {
    this.text = '';
    this.set();
  }
}
