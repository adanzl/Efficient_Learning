import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamPage } from './exam';
// import { DictWordPipe } from '../../pipes/dict-word/dict-word';

@NgModule({
  declarations: [
    ExamPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamPage),
    // DictWordPipe,
  ],
  exports: [
    ExamPage,
  ]
})
export class ExamPageModule { }
