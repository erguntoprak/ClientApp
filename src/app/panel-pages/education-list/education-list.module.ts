import { NgModule } from '@angular/core';
import { EducationListComponent } from './education-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: EducationListComponent
  }
];
@NgModule({
  declarations: [
    EducationListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class EducationListModule { }
