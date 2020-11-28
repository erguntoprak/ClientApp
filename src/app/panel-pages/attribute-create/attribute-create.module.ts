import { NgModule } from '@angular/core';
import { AttributeCreateComponent } from './attribute-create.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    component: AttributeCreateComponent
  }
];
@NgModule({
  declarations: [
    AttributeCreateComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule]
})
export class AttributeCreateModule { }
