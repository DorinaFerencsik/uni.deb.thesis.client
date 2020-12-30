import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadFileComponent } from './components/upload-file/upload-file.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'upload',
  },
  {
    path: 'upload',
    component: UploadFileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileRoutingModule { }
