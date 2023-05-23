import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import { AppAuth } from '../state/app.actions';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private auth: AuthService,
    private store: Store,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    firstValueFrom(this.auth.login(this.form.getRawValue())).then((response) => {

    },
    (error) => {
      this.errorMessage = error.error.error_message
    });
  }

  forgotPassword() {
    let modal = this.modalService.open(ResetPasswordModalComponent, { centered: true }) ;
    modal.result.then((result) => {
      if (result.action == 'confirm') {
        //this.router
        //this.store.dispatch(AppAuth.forgotPassword({ email: result.email}));
      }
    });
  }

}
