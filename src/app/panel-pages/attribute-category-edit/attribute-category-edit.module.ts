import { NgModule } from '@angular/core';
import { AttributeCategoryEditComponent } from './attribute-category-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AttributeCategoryEditComponent
  }
];
@NgModule({
  declarations: [
    AttributeCategoryEditComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class AttributeCategoryEditModule { }
