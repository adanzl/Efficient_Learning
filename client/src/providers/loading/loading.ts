import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  private loading;
  constructor(private LoadCtrl: LoadingController) {

  }

  public Show() {
    this.loading = this.LoadCtrl.create({
      content: "loading...",//loading框显示的内容
      dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
      showBackdrop: true // 是否显示遮罩层
    });
    this.loading.present();// 弹出load框
    // setTimeout(() => { loading.dismiss(); }, 3000);
    // 上面这段代码先是在按下按钮1000毫秒之后挑战页面，再在3000毫秒之后关闭loading框 // 但是因为设置了切换页面之后关闭loading框，因此在切换页面后则关闭loading框
  }

  public Hide() {
    this.loading.dismiss();
  }

}
