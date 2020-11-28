import { NgModule } from '@angular/core';
import { BlogEditComponent } from './blog-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { AngularEditorModule } from '@kolkov/angular-editor';

const routes: Routes = [
  {
    path: '',
    component: BlogEditComponent
  }
];
@NgModule({
  declarations: [
    BlogEditComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, AngularEditorModule],
  exports: [
    BlogEditComponent
  ],
  providers: [BaseService]
})
export class BlogEditModule { }
