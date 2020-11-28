import { NgModule } from '@angular/core';
import { UserPasswordEditComponent } from './user-password-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UserPasswordEditComponent
  }
];
@NgModule({
  declarations: [
    UserPasswordEditComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class UserPasswordEditModule { }
