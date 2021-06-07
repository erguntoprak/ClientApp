import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserResetPasswordComponent } from './user-reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
const routes: Routes = [
  {
    path: '',
    component: UserResetPasswordComponent
  }
];
@NgModule({
  declarations: [
    UserResetPasswordComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule, LazyLoadImagesModule]
})
export class UserResetPasswordModule { }
