import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserForgotPasswordComponent } from './user-forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: UserForgotPasswordComponent
  }
];
@NgModule({
  declarations: [
    UserForgotPasswordComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule]
})
export class UserForgotPasswordModule { }
