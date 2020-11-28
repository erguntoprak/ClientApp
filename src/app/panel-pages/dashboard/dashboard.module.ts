import { NgModule } from '@angular/core';
import { DashBoardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: DashBoardComponent
  }
];
@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [SharedModule,RouterModule.forChild(routes)],
  exports: [
    DashBoardComponent
  ]
})
export class DashBoardModule { }
