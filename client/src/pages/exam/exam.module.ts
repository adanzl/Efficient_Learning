import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamPage } from './exam';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ExamPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamPage),
    PipesModule,
  ],
  exports: [
    ExamPage,
  ]
})
export class ExamPageModule { }
