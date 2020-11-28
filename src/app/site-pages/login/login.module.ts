import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
