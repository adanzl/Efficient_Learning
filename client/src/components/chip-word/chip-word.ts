import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { PopoverController } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData';

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

  constructor(public dbData: DBDataProvider, public popoverCtrl: PopoverController) {

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
    this.dbData.queryExamDictData().then(
      (dataSet) => {
        let wordNode;
        if (dataSet.hasOwnProperty(this._word)) {
          wordNode = dataSet[this._word];
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
        }
        this._wordNode = wordNode;
        this._chipClass = 'chip-none';
      }
    ).catch(e => console.log(e));
  }

  // ControlValueAccessor 接口
  writeValue(val: string): void {
    this._word = val;
    this.parseWord();
  }

  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void {

  }
}
