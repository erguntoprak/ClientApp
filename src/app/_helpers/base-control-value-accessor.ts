import { ControlValueAccessor } from '@angular/forms';

export class BaseControlValueAccessor<T> implements ControlValueAccessor {
  public disabled = false;

  /**
   * Call when value has changed programmatically
   */
  protected onChanged(newValue: T) { }
  protected onTouched() { }
  public value: T;



  /**
   * Model -> View changes
   */
  public writeValue(obj: T): void { this.value = obj; }
  public registerOnChange(fn: any): void { this.onChanged = fn; }
  public registerOnTouched(fn: any): void { this.onTouched = fn; }
  public setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}
