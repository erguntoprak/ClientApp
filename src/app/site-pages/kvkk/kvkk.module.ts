import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { KvkkComponent } from './kvkk.component';
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
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    KvkkComponent
  ]
})
export class KvkkModule { }
