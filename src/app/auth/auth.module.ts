import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

const components = [
  LoginDialogComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    SharedModule,
  ],
})
export class AuthModule { }
