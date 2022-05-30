import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cajun';
  isLoader!: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }

  routerEvents() {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoader = true;
          break;
        }
        case event instanceof NavigationEnd: {
          this.isLoader = false;
          break;
        }
      }
    });
  }
}
