import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SharedModule } from '../../shared/shared.module';
import { SiteLayoutComponent } from './site-layout.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiteLayoutComponent
  ],
  imports: [SharedModule,RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SiteLayoutComponent
  ]
})
export class SiteLayoutModule { }
