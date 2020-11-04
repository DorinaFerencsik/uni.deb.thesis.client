import { OverlayModule} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const components = [
  HeaderComponent,
  FooterComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    OverlayModule,
    SharedModule,
  ],
  exports: [
    ...components,
  ],
})
export class CoreModule { }
