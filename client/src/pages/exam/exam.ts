import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData';
import { LoadingProvider } from '../../providers/loading/loading';

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

  private _sectorReading;
  private _examData;

  constructor(public navCtrl: NavController, public navParams: NavParams, public LoadUtil: LoadingProvider, public dbData: DBDataProvider) {
  }

  private Refresh() {
    this.LoadUtil.Show();
    this.dbData.queryExamSctorReadingData().then(
      (resp) => {
        let dataSet = resp.json();
        this._sectorReading = [];
        for (var node in dataSet) {
          this._sectorReading.push(dataSet[node]);
        }
        this.LoadUtil.Hide();
      }
    ).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamPage');
    this.Refresh();
  }

}
