import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AcdcLoadingService } from 'acdc-loading';
import { Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

  }
  ngOnInit() {
    let cc = window as any;
       cc.cookieconsent.initialise({
         palette: {
           popup: {
             background: "#7444fd",
             text:"#ffffff"
           },
           button: {
             background: "#fe4c55",
             text: "#ffffff",
             border: "#fe4c55"
           }
         },
         content: {
           message: "Sizlere daha iyi bir hizmet sunabilmek için sitemizde çerezlerden faydalanıyoruz. Sitemizi kullanmaya devam ederek çerezleri kullanmamıza izin vermiş oluyorsunuz. Daha fazla bilgi için",
           dismiss: "Anladım",
           link: "Çerez Politikası",
           href: environment.baseUrl + "/cerez-politikasi" 
         }
       });
  }
}
