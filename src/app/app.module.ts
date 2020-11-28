import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
