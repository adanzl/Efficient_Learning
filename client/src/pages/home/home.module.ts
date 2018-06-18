import { NgModule } from '@angular/core';
import { IonicPageModule, LoadingController } from 'ionic-angular';
import { HomePage } from './home';
import { DBDataProvider } from '../../providers/DBData/DBData'

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {
  private loading;
  private examItems;
  constructor(public dbData: DBDataProvider, public LoadCtrl: LoadingController) {
    setTimeout(() => { this.Refresh(); }, 1000);
  }

  loadDefault() {
    this.loading = this.LoadCtrl.create({
      content: "loading...",//loading框显示的内容
      dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
      showBackdrop: false // 是否显示遮罩层
    });
    this.loading.present();// 弹出load框
    // setTimeout(() => { loading.dismiss(); }, 3000); // 上面这段代码先是在按下按钮1000毫秒之后挑战页面，再在3000毫秒之后关闭loading框 // 但是因为设置了切换页面之后关闭loading框，因此在切换页面后则关闭loading框
  }

  private Refresh() {
    this.loadDefault();
    this.dbData.queryData('SELECT * FROM exam', []).then(
      (dataSet) => {
        this.examItems = [];
        for (var i = 0; i < dataSet.rows.length; i++) {
          this.examItems.push({
            id: dataSet.rows.item(i).id,
            title: dataSet.rows.item(i).title
          })
        }
        this.loading.dismiss();
      }
    ).catch(e => console.log(e));
  }
}
