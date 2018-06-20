import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MainApp } from './app.component';
import { DBDataProvider } from '../providers/DBData/DBData';
import { HttpModule } from '@angular/http';
import { LoadingProvider } from '../providers/loading/loading';

@NgModule({
  declarations: [
    MainApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MainApp)
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
    LoadingProvider
  ]
})
export class AppModule { }
