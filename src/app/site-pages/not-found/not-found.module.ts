import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { NotFoundComponent } from './not-found.component';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
];
@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), LazyLoadImagesModule
],
  exports: [
    NotFoundComponent
  ],
  providers: [BaseService]
})
export class NotFoundModule { }
