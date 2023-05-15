import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './error-page.component.html'
})

export class ErrorPageComponent {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { }

}
