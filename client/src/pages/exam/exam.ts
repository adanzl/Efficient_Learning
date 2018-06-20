import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, PopoverController } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData';

/**
 * Generated class for the ExamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {

  @ViewChild('artContent') artContent: Content;
  private _sectorReadings;
  private _examData;
  private _title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbData: DBDataProvider, public popoverCtrl: PopoverController) {
  }

  private Refresh() {
    this._title = this.navParams.get('title');

    this.dbData.queryExamSctorReadingData().then(
      (dataSet) => {
        this._sectorReadings = [];
        for (var key in dataSet) {
          let node = dataSet[key];
          if (node['exam_id'] == this.navParams.get('id')) {
            this._sectorReadings.push(node);
          }
        }
      }
    ).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamPage');
    this.Refresh();
  }

  onLongPress(event) {
    console.log(event);

    let popover = this.popoverCtrl.create('WordPopoverPage');
    popover.present({
      ev: event.from
    });

  }
  onPress(event) {
    console.log(event.target.innerText);

    let word = event.target.innerText;
    this.dbData.queryExamDictData().then(
      (dataSet) => {
        let wordNode;
        if (dataSet.hasOwnProperty(word)) {
          wordNode = dataSet[word];
        } else {
          wordNode = {
            "word": word,
            "sentence": "",
            "frequency": 0,
            "mean": "出错了，没这个单词",
            "id": -1,
            "add_time": ""
          }
        }

        let popover = this.popoverCtrl.create('WordPopoverPage', wordNode);
        popover.present({
          ev: event
        });
      }
    ).catch(e => console.log(e));
  }


}
