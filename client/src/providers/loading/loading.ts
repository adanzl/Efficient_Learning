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
  private loadingIsOpen: boolean;
  constructor(private LoadCtrl: LoadingController) {
    this.loadingIsOpen = false;
  }

  public Show() {
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.LoadCtrl.create({
        content: "loading...",//loading框显示的内容
        dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
        showBackdrop: true // 是否显示遮罩层
      });
      this.loading.present();// 弹出load框
    }
  }

  public Hide() {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  }

}
