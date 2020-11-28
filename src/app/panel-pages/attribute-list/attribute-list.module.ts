import { NgModule } from '@angular/core';
import { AttributeListComponent } from './attribute-list.component';
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
    component: AttributeListComponent
  }
];
@NgModule({
  declarations: [
    AttributeListComponent
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
export class AttributeListModule { }
