import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    DBDataProvider,
  ]
})

export class ChipWordComponent {

  @Input('word') word: string;

  @Input('color') color: string;

  @Output('longPress') parentPress: EventEmitter<any> = new EventEmitter();

  constructor(public dbData: DBDataProvider, public popoverCtrl: PopoverController) {

  }

  onLongPress(event) {
    this.dbData.queryExamDictData().then(
      (dataSet) => {
        let wordNode;
        if (dataSet.hasOwnProperty(this.word)) {
          wordNode = dataSet[this.word];
        } else {
          wordNode = {
            "word": this.word,
            "sentence": "",
            "frequency": 0,
            "mean": "出错了，没这个单词",
            "id": -1,
            "add_time": ""
          }
        }
        this.parentPress.emit(
          {
            from: event,
            data: wordNode
          }
        );
      }
    ).catch(e => console.log(e));
  }

}
