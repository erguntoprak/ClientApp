import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DisclosureTextComponent } from './disclosure-text.component';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
const routes: Routes = [
  {
    path: '',
    component: DisclosureTextComponent
  }
];
@NgModule({
  declarations: [
    DisclosureTextComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), LazyLoadImagesModule],
  exports: [
    DisclosureTextComponent
  ]
})
export class DisclosureTextModule { }
