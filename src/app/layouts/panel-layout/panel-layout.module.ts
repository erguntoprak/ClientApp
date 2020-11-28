import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PanelLayoutComponent } from './panel-layout.component';
import { PanelAsideComponent } from '../panel-aside/panel-aside.component';
import { PanelHeaderComponent } from '../panel-header/panel-header.component';
import { PanelFooterComponent } from '../panel-footer/panel-footer.component';
@NgModule({
  declarations: [
    PanelLayoutComponent,
    PanelAsideComponent,
    PanelHeaderComponent,
    PanelFooterComponent
  ],
  imports: [SharedModule,RouterModule],
  exports: [
    PanelLayoutComponent,
    PanelAsideComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    RouterModule
  ]
})
export class PanelLayoutModule { }
