import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UserFilesComponent } from './components/user-files/user-files.component';
import { FileRoutingModule } from './file-routing.module';

const components = [
  UploadFileComponent,
  UserFilesComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    SharedModule,
    FileRoutingModule,
  ],
})
export class FileModule { }
