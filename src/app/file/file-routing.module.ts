import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UserFilesComponent } from './components/user-files/user-files.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserFilesComponent,
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
