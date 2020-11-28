import { NgModule } from '@angular/core';
import { AttributeEditComponent } from './attribute-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    component: AttributeEditComponent
  }
];
@NgModule({
  declarations: [
    AttributeEditComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule]
})
export class AttributeEditModule { }
