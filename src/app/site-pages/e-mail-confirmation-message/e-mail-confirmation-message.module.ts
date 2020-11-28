import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { EmailConfirmationMessageComponent } from './e-mail-confirmation-message.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: EmailConfirmationMessageComponent
  }
];
@NgModule({
  declarations: [
    EmailConfirmationMessageComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [
    EmailConfirmationMessageComponent
  ],
  providers: [BaseService]
})
export class EmailConfirmationMessageModule { }
