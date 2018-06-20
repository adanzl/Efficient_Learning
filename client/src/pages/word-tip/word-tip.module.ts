import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordTipPage } from './word-tip';

@NgModule({
  declarations: [
    WordTipPage,
  ],
  imports: [
    IonicPageModule.forChild(WordTipPage),
  ],
})
export class WordTipPageModule {}
