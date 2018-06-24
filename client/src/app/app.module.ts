import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MainApp } from './app.component';
import { DBDataProvider } from '../providers/DBData/DBData';

import { HttpModule } from '@angular/http';
import { LoadingProvider } from '../providers/loading/loading';
import { UtilsProvider } from '../providers/utils/utils';

@NgModule({
  declarations: [
    MainApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MainApp, {
      backButtonText: '返回',
      iconMode: 'ios', // 安卓icon强制使用ios的icon以及样式
      mode: 'ios', // 样式强制使用ios样式
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MainApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DBDataProvider,
    LoadingProvider,
    UtilsProvider
  ]
})
export class AppModule { }
