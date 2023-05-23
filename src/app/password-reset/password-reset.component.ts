import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: [''],
      password_confirmation: ['']
    });
  }

  signUp() {
    firstValueFrom(this.auth.signUp(this.form.getRawValue())).then((response) => {
    },
    (error) => {
      this.errorMessage = error.error.error_message
    });
  }

}
