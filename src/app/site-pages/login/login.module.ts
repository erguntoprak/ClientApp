import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild(routes), LazyLoadImagesModule],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
