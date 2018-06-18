import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData'

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
  private loading;
  examItems: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbData: DBDataProvider, public LoadCtrl: LoadingController) {
    setTimeout(() => {
      this.Refresh();
    }, 1000);
  }
  loadDefault() {
    this.loading = this.LoadCtrl.create({
      content: "loading...",//loading框显示的内容
      dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
      showBackdrop: false // 是否显示遮罩层
    });
    this.loading.present();// 弹出load框
    // setTimeout(() => { loading.dismiss(); }, 3000);
    // 上面这段代码先是在按下按钮1000毫秒之后挑战页面，再在3000毫秒之后关闭loading框 // 但是因为设置了切换页面之后关闭loading框，因此在切换页面后则关闭loading框
  }

  private Refresh() {
    this.loadDefault();
    this.dbData.queryExamData().then(
      (resp) => {
        let dataSet = resp.json();
        this.examItems = [];
        for (var node in dataSet) {
          this.examItems.push(dataSet[node]);
        }
        console.log(this.examItems);
        this.loading.dismiss();
      }
    ).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  examClk(examNode) {
    console.log("examClk " + examNode.title);
  }

}
