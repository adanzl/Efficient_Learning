import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData';
import { LoadingProvider } from '../../providers/loading/loading';
import { ExamPage } from '../exam/exam';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  examItems: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbData: DBDataProvider, public LoadUtil: LoadingProvider) {
  }

  private Refresh() {
    this.LoadUtil.Show();
    this.dbData.queryExamData().then(
      (resp) => {
        let dataSet = resp.json();
        this.examItems = [];
        for (var node in dataSet) {
          this.examItems.push(dataSet[node]);
        }
        this.LoadUtil.Hide();
      }
    ).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.Refresh();
  }

  examClk(examNode) {
    this.navCtrl.push(ExamPage, examNode);
  }

}
