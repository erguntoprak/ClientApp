import { NgModule } from '@angular/core';
import { BlogDetailComponent } from './blog-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
const routes: Routes = [
  {
    path: '',
    component: BlogDetailComponent
  }
];
@NgModule({
  declarations: [
    BlogDetailComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    BlogDetailComponent
  ],
  providers: [BaseService]
})
export class BlogDetailModule { }
