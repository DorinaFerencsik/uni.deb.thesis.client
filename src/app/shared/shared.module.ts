import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFilesizeModule } from 'ngx-filesize';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgxPermissionsModule } from 'ngx-permissions';

import { CodeBlockComponent } from './components/code-block/code-block.component';
import { DatasetListComponent } from './components/dataset-list/dataset-list.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FileContentComponent } from './components/file-content/file-content.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { DropdownComponent } from './components/inputs/dropdown/dropdown.component';
import { SubmitButtonComponent } from './components/inputs/submit-button/submit-button.component';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { SpaceComponent } from './components/space/space.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { ImageFallbackDirective } from './directives/image-fallback.directive';
import { FormatDatePipe } from './pipes/format-date.pipe';

const components = [
  CodeBlockComponent,
  SpaceComponent,
  FileListComponent,
  FileContentComponent,
  TextInputComponent,
  DropdownComponent,
  DynamicFormComponent,
  SubmitButtonComponent,
  DatasetListComponent,
];

const directives = [
  ImageFallbackDirective,
  DynamicFieldDirective,
];

const pipes = [
  FormatDatePipe,
];

const vendorModules = [
  CdkTableModule,
  ClipboardModule,
  FlexLayoutModule,
  HighlightModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule,
  NgxFilesizeModule,
  ReactiveFormsModule,
  TranslateModule,
];

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes,
  ],
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild(),
    ...vendorModules,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        languages: {
          python: () => import('highlight.js/lib/languages/python'),
        },
      },
    },
  ],
  exports: [
    ...components,
    ...directives,
    ...pipes,
    CommonModule,
    NgxPermissionsModule,
    ...vendorModules,
  ],
})
export class SharedModule { }
