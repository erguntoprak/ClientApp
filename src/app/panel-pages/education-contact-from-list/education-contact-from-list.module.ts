import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { EducationContactFormListComponent } from './education-contact-from-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export let options: Partial<IConfig> | (() => Partial<IConfig>);

const routes: Routes = [
  {
    path: '',
    component: EducationContactFormListComponent
  }
];
@NgModule({
  declarations: [
    EducationContactFormListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), NgxMaskModule.forRoot(options),],
  exports: [
    EducationContactFormListComponent
  ],
  providers: [BaseService]
})
export class EducationContactFormListModule { }
