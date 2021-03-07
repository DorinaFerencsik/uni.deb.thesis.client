import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CreateDiagramComponent } from './components/create-diagram/create-diagram.component';
import { DiagramCardComponent } from './components/diagram-card/diagram-card.component';
import { DiagramListComponent } from './components/diagram-list/diagram-list.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { ParameterCardComponent } from './components/parameter-card/parameter-card.component';
import { DiagramRoutingModule } from './diagram-routing.module';

@NgModule({
  declarations: [
    ExampleListComponent,
    CreateDiagramComponent,
    DiagramListComponent,
    DiagramCardComponent,
    ParameterCardComponent,
  ],
  imports: [
    SharedModule,
    DiagramRoutingModule,
  ],
})
export class DiagramModule { }
