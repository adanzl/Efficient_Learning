import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChipWordComponent } from './chip-word/chip-word';

@NgModule({
  declarations: [
    ChipWordComponent
  ],
  imports: [
    IonicModule.forRoot(ComponentsModule)
  ],
  exports: [ChipWordComponent]
})
export class ComponentsModule { }
