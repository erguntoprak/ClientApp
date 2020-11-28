import { Component, Input, forwardRef, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
@Component({
  selector: 'se-checkbox',
  template:
    ` <div class="checkbox">
         <input class="inp-cbx" [checked]="checkControl" id="{{id}}" type="checkbox" style="display: none;">
               <label class="cbx" for="{{id}}">
                    <span>
                        <svg width="12px" height="10px" viewbox="0 0 12 10">
                             <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                    </span>
                    {{text}}
               </label>
     </div>
`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeCheckBox),
      multi: true
    }
  ]
})
export class SeCheckBox extends BaseControlValueAccessor<number> implements OnInit {

  @Input() text: string;
  @Input() id = uuid();
  @Input() existingAttributeIds = [];
  checkControl = false;

  ngOnInit(): void {
    this.checkControl = _.includes(this.existingAttributeIds, this.id);
  }
  ngOnChanges(changes) {
    if (changes.existingAttributeIds) {
      this.checkControl = _.includes(changes.existingAttributeIds.currentValue, this.id);
    }
  }
}
