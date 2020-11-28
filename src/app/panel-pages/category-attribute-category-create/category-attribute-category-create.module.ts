import { NgModule } from '@angular/core';
import { CategoryAttributeCategoriCreateComponent } from './category-attribute-category-create.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: CategoryAttributeCategoriCreateComponent
  }
];
@NgModule({
  declarations: [
    CategoryAttributeCategoriCreateComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), MatSelectModule, MatButtonModule, DragDropModule]
})
export class CategoryAttributeCategoriCreateModule { }
