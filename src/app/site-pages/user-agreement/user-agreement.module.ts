import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserAgreementComponent } from './user-agreement.component';
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
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    UserAgreementComponent
  ]
})
export class UserAgreementModule { }
