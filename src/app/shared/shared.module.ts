import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

import { BbUIModule } from './bb-ui/bb-ui.module';

const COMPONENTS = [CardComponent, ModalComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [BbUIModule, CommonModule],
  exports: [...COMPONENTS, BbUIModule],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
