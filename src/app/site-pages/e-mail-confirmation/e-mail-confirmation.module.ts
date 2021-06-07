import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { EmailConfirmationComponent } from './e-mail-confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
const routes: Routes = [
  {
    path: '',
    component: EmailConfirmationComponent
  }
];
@NgModule({
  declarations: [
    EmailConfirmationComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule, LazyLoadImagesModule],
  exports: [
    EmailConfirmationComponent
  ],
  providers: [BaseService]
})
export class EmailConfirmationModule { }
