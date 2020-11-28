import { NgModule } from '@angular/core';
import { UserRoleEditComponent } from './user-role-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: UserRoleEditComponent
  }
];
@NgModule({
  declarations: [
    UserRoleEditComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), MatSelectModule, MatButtonModule]
})
export class UserRoleEditModule { }
