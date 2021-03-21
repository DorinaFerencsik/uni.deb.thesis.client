import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CreateDiagramComponent } from './components/create-diagram/create-diagram.component';
import { DiagramAdminComponent } from './components/diagram-admin/diagram-admin.component';
import { DiagramCardComponent } from './components/diagram-card/diagram-card.component';
import { DiagramListComponent } from './components/diagram-list/diagram-list.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { ParameterCardComponent } from './components/parameter-card/parameter-card.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UserFilesComponent } from './components/user-files/user-files.component';
import { DiagramRoutingModule } from './diagram-routing.module';

@NgModule({
  declarations: [
    ExampleListComponent,
    CreateDiagramComponent,
    DiagramListComponent,
    DiagramCardComponent,
    ParameterCardComponent,
    UploadFileComponent,
    UserFilesComponent,
    DiagramAdminComponent,
  ],
  imports: [
    SharedModule,
    DiagramRoutingModule,
  ],
})
export class DiagramModule { }
