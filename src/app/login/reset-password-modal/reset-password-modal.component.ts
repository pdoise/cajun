import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './reset-password-modal.component.html'
})

export class ResetPasswordModalComponent {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['']
    });
  }

  confirm(): any {
    this.modal.close({action: 'confirm'});
  }

  cancel() {
    this.modal.close({action: 'cancel'});
  }
}
