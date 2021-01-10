import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html'
})
export class SiteLayoutComponent implements OnInit {


  constructor(@Inject(PLATFORM_ID) private platformId: any) {

  }
  ngOnInit(): void {

  }
  onActivate(event) {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
  }
}
