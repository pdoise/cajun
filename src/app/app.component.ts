import { Component, OnInit, OnDestroy, isDevMode } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cajun';
  isLoader!: boolean;
  private storeSub!: Subscription;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
    // Cache store
    this.store.subscribe((store) => {
      console.log(store)
    })
  }

  ngOnDestroy() {
    if (this.storeSub) { this.storeSub.unsubscribe(); }
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
