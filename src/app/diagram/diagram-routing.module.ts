import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateDiagramComponent } from './components/create-diagram/create-diagram.component';
import { DiagramListComponent } from './components/diagram-list/diagram-list.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { UserFilesComponent } from './components/user-files/user-files.component';


const routes: Routes = [
  {
    path: 'diagram',
    pathMatch: 'full',
    component: ExampleListComponent,
    children: [
      {
        path: 'create',
        component: CreateDiagramComponent,
      },
      {
        path: 'saved',
        component: DiagramListComponent,
      },
    ],
  },
  {
    path: 'file',
    component: UserFilesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagramRoutingModule { }
