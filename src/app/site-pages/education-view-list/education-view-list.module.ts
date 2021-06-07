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
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';



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
    ReactiveFormsModule,
    MatExpansionModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    LazyLoadImagesModule
  ],
  exports: [
    EducationViewListComponent
  ],
  providers: [BaseService]
})
export class EducationViewListModule { }
