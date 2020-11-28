import { NgModule } from '@angular/core';
import { AttributeCategoryListComponent } from './attribute-category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  {
    path: '',
    component: AttributeCategoryListComponent
  }
];
@NgModule({
  declarations: [
    AttributeCategoryListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule]
})
export class AttributeCategoryListModule { }
