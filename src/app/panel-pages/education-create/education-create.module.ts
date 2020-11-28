import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationCreateComponent } from './education-create.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RouterModule, Routes } from '@angular/router';
import { SeCheckBox } from '../../_helpers/se-checkbox.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
const routes: Routes = [
  {
    path: '',
    component: EducationCreateComponent
  }
];
@NgModule({
  declarations: [
    EducationCreateComponent
  ],
  imports: [SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    AngularEditorModule,
    YouTubePlayerModule,
    RouterModule.forChild(routes)],
  exports: [
    EducationCreateComponent
  ]
})
export class EducationCreateModule { }
