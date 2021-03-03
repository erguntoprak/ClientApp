import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelLayoutModule } from './layouts/panel-layout/panel-layout.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SiteLayoutModule } from './layouts/site-layout/site-layout.module';
import { AuthInterceptorService } from './_services/auth-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AcdcLoadingModule } from 'acdc-loading';
import { HammerModule} from '@angular/platform-browser';

@Injectable() 
export class MyHammerConfig extends HammerGestureConfig { 
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "pan-y"
    });
    return mc;
  }
} 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HammerModule,
    AppRoutingModule,
    PanelLayoutModule,
    SiteLayoutModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AcdcLoadingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
