import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EducationDetailComponent } from './education-detail.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
const routes: Routes = [
  {
    path: '',
    component: EducationDetailComponent
  }
];
@NgModule({
  declarations: [
    EducationDetailComponent
  ],
  imports: [SharedModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    NgxGalleryModule,
    ShareButtonsModule,
    ShareIconsModule,
    NgxMaskModule.forRoot(options),
    NgxSkeletonLoaderModule,
    RouterModule.forChild(routes),
    LazyLoadImagesModule
  ]
})
export class EducationDetailModule { }
