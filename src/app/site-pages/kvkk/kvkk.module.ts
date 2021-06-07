import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { KvkkComponent } from './kvkk.component';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
const routes: Routes = [
  {
    path: '',
    component: KvkkComponent
  }
];
@NgModule({
  declarations: [
    KvkkComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), LazyLoadImagesModule],
  exports: [
    KvkkComponent
  ]
})
export class KvkkModule { }
