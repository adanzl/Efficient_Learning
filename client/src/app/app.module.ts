import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from "@ionic-native/sqlite";

import { MainApp } from './app.component';
import { TabListPage } from '../pages/tab-list/tab-list';
import { DBDataProvider } from '../providers/DBData/DBData';
import { SQLiteMock } from '../lib/SQLiteMock';

@NgModule({
  declarations: [
    MainApp,
    TabListPage
  ],
  imports: [
    BrowserModule,
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
    { provide: SQLite, useClass: SQLiteMock},
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DBDataProvider
  ]
})
export class AppModule { }
