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
  }

}
