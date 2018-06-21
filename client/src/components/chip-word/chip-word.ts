import { Component, forwardRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { PopoverController } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the ChipWordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chip-word',
  templateUrl: 'chip-word.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipWordComponent),
      multi: true
    }
  ]
})

export class ChipWordComponent implements ControlValueAccessor {

  private _word: string;
  private _wordNode: any;
  private _chipClass: string = "chip-none";

  @Input('color') color: string;

  @Output('longPress') parentPress: EventEmitter<any> = new EventEmitter();

  constructor(public dbData: DBDataProvider, public popoverCtrl: PopoverController, public changeDetectorRef: ChangeDetectorRef, public utils: UtilsProvider) {

  }

  onLongPress(event) {
    if (this._wordNode.id != -1) {
      let popover = this.popoverCtrl.create('WordPopoverPage', this._wordNode);
      popover.present({
        ev: event
      });

      this.parentPress.emit(
        {
          from: event,
          data: this._wordNode
        }
      );
    }
  }

  private parseWord() {
    if (this._word == null) {
      return;
    }
    this.dbData.queryExamDictData().then(
      (dataSet) => {
        let wordNode;
        if (dataSet.hasOwnProperty(this._word.toLowerCase())) {
          wordNode = dataSet[this._word.toLowerCase()];
          this._chipClass = 'chip-word';
        } else {
          wordNode = {
            "word": this._word,
            "sentence": "",
            "frequency": 0,
            "mean": "出错了，没这个单词",
            "id": -1,
            "add_time": ""
          }
          this._chipClass = 'chip-none';
        }
        this._wordNode = wordNode;
        // this.changeDetectorRef.markForCheck();
      }
    ).catch(e => console.log(e));
  }

  // ControlValueAccessor 接口
  writeValue(val: string): void {
    this._word = this.utils.trim(val);
    this.parseWord();
  }

  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void {

  }
}
