import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trowser-layout',
  templateUrl: './trowser-layout.component.html',
  styleUrls: ['./trowser-layout.component.scss']
})
export class TrowserLayoutComponent  {
  @Input() header!: string;
  @Output() cancel = new EventEmitter<any>();

  cancelOut() {
    this.cancel.emit();
  }
}
