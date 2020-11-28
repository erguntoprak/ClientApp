import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RouterModule, Routes } from '@angular/router';
import { EducationEditComponent } from './education-edit.component';
import { SeCheckBox } from '../../_helpers/se-checkbox.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
const routes: Routes = [
  {
    path: '',
    component: EducationEditComponent
  }
];
@NgModule({
  declarations: [
    EducationEditComponent
  ],
  imports: [SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    AngularEditorModule,
    YouTubePlayerModule,
    RouterModule.forChild(routes)],
  exports: [
    EducationEditComponent
  ]
})
export class EducationEditModule { }
