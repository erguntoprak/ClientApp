import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];
@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [SharedModule, ReactiveFormsModule, NgxMaskModule.forRoot(options), RouterModule.forChild(routes), LazyLoadImagesModule],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
