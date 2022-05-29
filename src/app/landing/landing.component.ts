import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


//import { SessionService } from 'src/app/core/services/session.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn: boolean = false;
  username!: string;

  constructor(
    //private session: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //console.log(this.session)
    //this.isLoggedIn = !!this.session.valid;
//
    //if (this.isLoggedIn) {
    //  const user = this.session.user();
//
    //  this.username = user.username;
    //}
  }

  logout(): void {
    //this.session.signOut();
    //window.location.reload();
  }

}
