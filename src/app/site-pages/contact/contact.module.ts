import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);

const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  }
];
@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule, NgxMaskModule.forRoot(options)
],
  exports: [
    ContactComponent
  ],
  providers: [BaseService]
})
export class ContactModule { }
