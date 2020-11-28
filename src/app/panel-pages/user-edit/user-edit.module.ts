import { NgModule } from '@angular/core';
import { UserEditComponent } from './user-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OnlyAlphabetDirective } from 'src/app/_helpers/only-alphabet.directive';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
const routes: Routes = [
  {
    path: '',
    component: UserEditComponent
  }
];
@NgModule({
  declarations: [
    UserEditComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes),
    NgxMaskModule.forRoot(options),
    MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class UserEditModule { }
