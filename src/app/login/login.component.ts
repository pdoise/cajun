import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";

import { AuthService } from '../auth/auth.service';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
declare const window: any;

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
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
    });
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: any) => {
        console.log('Logged in with Facebook:', user);
        // Perform further actions with the user data
      })
      .catch((error: any) => {
        console.error('Error logging in with Facebook:', error);
      });
  }

  signOut(): void {
    this.socialAuthService.signOut();
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
