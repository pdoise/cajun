import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    //this.auth.login({username: 'blankpage985', password: 'password'})
    //.subscribe((response) => {
    //  console.log(response)
    //});

    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    this.auth.login(this.form.getRawValue()).subscribe((response) => {
      console.log(response)
    }, error => {
      // handle login error
    });
  }

  ngOnDestroy() {
    //this.auth.logout();
  }

}
