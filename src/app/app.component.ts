import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AcdcLoadingService } from 'acdc-loading';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router, private acdcLoadingService: AcdcLoadingService,private metaTagService: Meta) {

  }
  ngOnInit() {
    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        this.acdcLoadingService.showLoading();
      }
      if (route instanceof NavigationEnd) {
        this.acdcLoadingService.hideLoading();
      }
    });
  }
}
