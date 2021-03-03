import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DisclosureTextComponent } from './disclosure-text.component';
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
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    DisclosureTextComponent
  ]
})
export class DisclosureTextModule { }
