import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FileOwner } from '../../enums/file-owner.enum';
import { DatasetPreviewDialogComponent } from '../dataset-preview-dialog/dataset-preview-dialog.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {

  public readonly columns = ['name', 'createdAt', 'size', 'action'];

  @Input() dataSource: any[];
  @Input() owner: FileOwner;
  @Input() mode: 'use' | 'manage' = 'use';

  @Output() fileSelected = new EventEmitter();
  @Output() analyze = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openPreview(filename: string) {
    this.dialog.open(DatasetPreviewDialogComponent, { data: { fileOwner: this.owner, name: filename }});
  }

  public onAnalyze(filename) {
    this.analyze.emit({
      owner: this.owner,
      name: filename,
    });
  }

}
