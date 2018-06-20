import { NgModule } from '@angular/core';
import { TabListPage } from './tab-list';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    TabListPage,
  ],
  imports: [
    IonicPageModule.forChild(TabListPage),
  ]
})
export class TabListPageModule {}
