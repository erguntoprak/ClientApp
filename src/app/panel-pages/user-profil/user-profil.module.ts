import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { UserProfilComponent } from './user-profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OnlyAlphabetDirective } from 'src/app/_helpers/only-alphabet.directive';

const routes: Routes = [
  {
    path: '',
    component: UserProfilComponent
  }
];
@NgModule({
  declarations: [
    UserProfilComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class UserProfilModule { }
