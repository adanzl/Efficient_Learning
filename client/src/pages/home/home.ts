import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 * list all the exam
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private examItems: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbData: DBDataProvider) {
  }

  private Refresh() {
    this.dbData.queryExamData().then(
      (dataSet) => {
        this.examItems = [];
        for (var key in dataSet) {
          let node = dataSet[key];
          this.examItems.push(node);
        }
      }
    ).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    this.dbData.preLoadData().then(
      () => {
        this.Refresh();
      }, (e) => { console.log(e); }
    );
  }

  onExamClk(examNode) {
    this.navCtrl.push("ExamPage", examNode);
  }

}
