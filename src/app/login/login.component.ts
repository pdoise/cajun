import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
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

}
