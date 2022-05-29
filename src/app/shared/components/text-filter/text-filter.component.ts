import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss']
})

export class TextFilterComponent {
  @Input() placeholder!: string;
  @Input() tooltip!: string;
  @Input() tooltipPlacement!: string;
  @Input() text!: string;
  @Output() onChange = new EventEmitter<any>();

  emit() {
    this.onChange.emit(this.text);
  };

  change() {
    this.emit();
  };

  clear() {
    this.text = '';
    this.emit();
  }
}
