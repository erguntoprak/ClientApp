import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BlogOperationListComponent } from './blog-operation-list.component';
const routes: Routes = [
  {
    path: '',
    component: BlogOperationListComponent
  }
];
@NgModule({
  declarations: [
    BlogOperationListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class BlogOperationListModule { }
