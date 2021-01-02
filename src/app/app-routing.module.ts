import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'files',
    loadChildren: () => import('./file/file.module').then(m => m.FileModule),
  },
  {
    path: 'diagram',
    loadChildren: () => import('./diagram/diagram.module').then(m => m.DiagramModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
