import { NgModule } from '@angular/core';
import { BlogViewListComponent } from './blog-view-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
const routes: Routes = [
  {
    path: '',
    component: BlogViewListComponent
  }
];
@NgModule({
  declarations: [
    BlogViewListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes),LazyLoadImagesModule],
  exports: [
    BlogViewListComponent
  ],
  providers: [BaseService]
})
export class BlogViewListModule { }
