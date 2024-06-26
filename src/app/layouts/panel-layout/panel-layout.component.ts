import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LazyLoadService } from '../../_services/lazy-load.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html'
})
export class PanelLayoutComponent implements OnInit,AfterViewInit {
 
  constructor(private lazyLoadService: LazyLoadService) {

  }
  ngAfterViewInit(): void {
    let scripts = ["assets/js/panel-vendors.min.js", "assets/js/panel-custom.js"];
    let cssFiles = ["assets/css/panel-vendors.min.css", "assets/css/panel-style.css", "assets/css/panel-responsive.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons"];
    this.lazyLoadService.loadScripts(scripts);
    this.lazyLoadService.loadCss(cssFiles); 
  }
  ngOnInit(): void {
   
  }

}
