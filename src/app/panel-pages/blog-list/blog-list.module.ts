import { NgModule } from '@angular/core';
import { BlogListComponent } from './blog-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  }
];
@NgModule({
  declarations: [
    BlogListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    BlogListComponent
  ],
  providers: [BaseService]
})
export class BlogListModule { }
