import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { InfoCardModule } from 'client-utils/src/public-api';
import { HighlightModule, HIGHLIGHT_OPTIONS,  } from 'ngx-highlightjs';

import { CodeBlockComponent } from './components/code-block/code-block.component';

const components = [
  CodeBlockComponent,
];

const vendorModules = [
  ClipboardModule,
  FlexLayoutModule,
  HighlightModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatToolbarModule,
  ReactiveFormsModule,
  TranslateModule,
  InfoCardModule,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
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
    CommonModule,
    ...vendorModules,
  ],
})
export class SharedModule { }
