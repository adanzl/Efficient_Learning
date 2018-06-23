import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { UtilsProvider } from '../../providers/utils/utils';

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
  constructor(public utils: UtilsProvider) {

  }

  private parseString() {
    this._wordList = [];
    if (this._content) {
      // handle html tag <xx> first
      let tagList = this._content.split(/(<.*?>.*?<\/.*?>|<.*?\/>)/);
      // split word
      for (let item of tagList) {
        if (this.utils.isDOMTag(item)) {
          // TODO need to parse chip word for underline
          this._wordList = this._wordList.concat(item);
        } else {
          let words = item.split(/([^\W\s]+)/);
          this._wordList = this._wordList.concat(words);
        }
      }
    }
  }

  // ControlValueAccessor interface implement
  writeValue(val: string): void {
    this._content = val;
    this.parseString();
  }

  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void {

  }
}
