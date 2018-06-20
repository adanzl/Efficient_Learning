import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordPopoverPage } from './word-popover';

@NgModule({
  declarations: [
    WordPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(WordPopoverPage),
  ],
})
export class WordPopoverPageModule {}
