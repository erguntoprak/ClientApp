import { NgModule } from '@angular/core';
import { EducationViewListComponent } from './education-view-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatExpansionModule } from '@angular/material/expansion';
import { EducationListFilterPipe } from '../../_helpers/education-list-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination'; 



const routes: Routes = [
  {
    path: '',
    component: EducationViewListComponent,
    data: { breadcrumb: 'Home' }
  }
];
@NgModule({
  declarations: [
    EducationViewListComponent,
    EducationListFilterPipe
  ],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NgxPaginationModule
  ],
  exports: [
    EducationViewListComponent
  ],
  providers: [BaseService]
})
export class EducationViewListModule { }
