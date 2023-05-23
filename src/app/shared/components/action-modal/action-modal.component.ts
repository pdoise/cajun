import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent {
  @Input() name!: string;
  @Input() schema!: IActionModal;

  constructor(public modal: NgbActiveModal) {}

  confirm() {
    this.modal.close({action: 'confirm'});
  }

  cancel() {
    this.modal.close({action: 'cancel'});
  }
}

export interface IActionModal {
  subText?: string;
  icon?: string;
  content: string;
  theme: string;
  action: string;
}
