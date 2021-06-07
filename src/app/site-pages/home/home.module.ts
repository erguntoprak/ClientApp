import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  }
];
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild(routes), NgSelectModule, Ng2SearchPipeModule, NgxSkeletonLoaderModule,
    LazyLoadImagesModule]
})
export class HomeModule { }
