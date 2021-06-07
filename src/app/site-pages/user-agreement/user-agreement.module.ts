import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserAgreementComponent } from './user-agreement.component';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
const routes: Routes = [
  {
    path: '',
    component: UserAgreementComponent
  }
];
@NgModule({
  declarations: [
    UserAgreementComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), LazyLoadImagesModule],
  exports: [
    UserAgreementComponent
  ]
})
export class UserAgreementModule { }
