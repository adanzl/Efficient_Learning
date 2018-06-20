import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamPage } from './exam';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ExamPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamPage),
    PipesModule,
    ComponentsModule,
  ],
  exports: [
    ExamPage,
  ]
})
export class ExamPageModule { }
