import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseService } from '../../shared/base.service';
import { BlogCreateComponent } from './blog-create.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: BlogCreateComponent
  }
];
@NgModule({
  declarations: [
    BlogCreateComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), AngularEditorModule, FormsModule, ReactiveFormsModule],
  exports: [
    BlogCreateComponent
  ],
  providers: [BaseService]
})
export class BlogCreateModule { }
