import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

/**
 * Generated class for the ChipContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chip-content',
  templateUrl: 'chip-content.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChipContentComponent),
    multi: true
  }]
})
export class ChipContentComponent implements ControlValueAccessor {

  private _content: string = "";

  private _wordList: string[] = [];
  constructor() {

  }

  private parseString() {
    this._wordList = [];
    if (this._content) {
      let words = this._content.split(/[\W]+/);
      this._wordList = this._wordList.concat(words);
    }
  }

  // ControlValueAccessor 接口
  writeValue(val: string): void {
    this._content = val;
    this.parseString();
  }

  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void {

  }
}
