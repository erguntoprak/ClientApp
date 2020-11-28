import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html'
})
export class SiteLayoutComponent implements OnInit {


  constructor() {

  }
  ngOnInit(): void {

  }
  onActivate(event) {
    window.scroll(0, 0);
  }
}
