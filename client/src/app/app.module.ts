import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MainApp } from './app.component';
import { TabListPage } from '../pages/tab-list/tab-list';
import { DBDataProvider } from '../providers/DBData/DBData';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MainApp,
    TabListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MainApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MainApp,
    TabListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DBDataProvider
  ]
})
export class AppModule { }
