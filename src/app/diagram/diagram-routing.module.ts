import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateDiagramComponent } from './components/create-diagram/create-diagram.component';
import { DiagramListComponent } from './components/diagram-list/diagram-list.component';
import { ExampleListComponent } from './components/example-list/example-list.component';


const routes: Routes = [
  {
    path: '',
    component: ExampleListComponent,
  },
  {
    path: 'create',
    component: CreateDiagramComponent,
  },
  {
    path: 'saved',
    component: DiagramListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagramRoutingModule { }
