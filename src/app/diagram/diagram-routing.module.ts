import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { Roles } from 'utils/enums/user';

import { CreateDiagramComponent } from './components/create-diagram/create-diagram.component';
import { DiagramAdminComponent } from './components/diagram-admin/diagram-admin.component';
import { DiagramListComponent } from './components/diagram-list/diagram-list.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { UserFilesComponent } from './components/user-files/user-files.component';


const routes: Routes = [
  {
    path: 'diagram',
    children: [
      {
        path: '',
        pathMatch: 'full',
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
      {
        path: 'admin',
        component: DiagramAdminComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: Roles.Admin,
            redirectTo: 'landing',
          },
        },
      },
    ],
  },
  {
    path: 'files',
    component: UserFilesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagramRoutingModule { }
