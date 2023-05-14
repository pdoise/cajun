import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first: [''],
      last: [''],
      location: [''],
      email: [''],
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
