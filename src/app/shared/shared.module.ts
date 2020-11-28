import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeCheckBox } from '../_helpers/se-checkbox.component';
import { OnlyAlphabetDirective } from '../_helpers/only-alphabet.directive';

@NgModule({
  declarations: [
    SeCheckBox,
    OnlyAlphabetDirective
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    SeCheckBox,
    OnlyAlphabetDirective
  ]
})
export class SharedModule { }
