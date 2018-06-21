import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChipWordComponent } from './chip-word/chip-word';
import { ChipContentComponent } from './chip-content/chip-content';

@NgModule({
  declarations: [
    ChipWordComponent,
    ChipContentComponent
  ],
  imports: [
    // IonicModule.forRoot(ComponentsModule) 如果不改成下面这个 popoer 就无法弹出
    IonicModule
  ],
  exports: [
    ChipWordComponent,
    ChipContentComponent
  ],
  schemas: []
})
export class ComponentsModule { }
