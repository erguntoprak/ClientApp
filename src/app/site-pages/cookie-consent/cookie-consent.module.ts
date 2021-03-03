import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CookieConsentComponent } from './cookie-consent.component';
const routes: Routes = [
  {
    path: '',
    component: CookieConsentComponent
  }
];
@NgModule({
  declarations: [
    CookieConsentComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    CookieConsentComponent
  ]
})
export class CookieConsentModule { }
