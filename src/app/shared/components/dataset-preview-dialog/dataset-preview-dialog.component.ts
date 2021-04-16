import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { ApiFileService } from 'src/app/diagram/services/api-file.service';
import { IPagination } from 'utils/interfaces/common/pagination.interface';
import { IReadFileResponse } from 'utils/payloads/file/read-file.interface';
import { IFileStat } from 'utils/payloads/file/stat.interface';

import { FileOwner } from '../../enums/file-owner.enum';

@Component({
  selector: 'app-dataset-preview-dialog',
  templateUrl: './dataset-preview-dialog.component.html',
  styleUrls: ['./dataset-preview-dialog.component.scss'],
})
export class DatasetPreviewDialogComponent implements OnInit {

  public fileContent: any;
  public columns = [];
  public pagination: IPagination = { page: 0, rows: 5, totalRows: 0 };
  public stats: IFileStat;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { fileOwner: FileOwner, name: string, source?: string },
    private dialogRef: MatDialogRef<DatasetPreviewDialogComponent>,
    private fileService: ApiFileService) {
      this.fileService.readStat(this.data.fileOwner, this.data.name, this.data.source).subscribe(res => {
        this.stats = res;
      });
      this.readData();
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  public onPageChange(event) {
    this.pagination.page = event.pageIndex;
    this.pagination.rows = event.pageSize;
    this.readData();
  }

  private readData() {
    this.fileService.readData(
      this.data.fileOwner,
      this.data.name,
      this.data.source,
      this.pagination.rows,
      this.pagination.page
    ).subscribe(res => {
      this.columns = Object.keys(res.content[0]);
      this.fileContent = res.content;
      this.pagination.totalRows = res.maxRows;
    });
  }

}
