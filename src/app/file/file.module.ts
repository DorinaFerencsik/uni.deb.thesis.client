import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FileRoutingModule } from './file-routing.module';

const components = [
  UploadFileComponent,
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
