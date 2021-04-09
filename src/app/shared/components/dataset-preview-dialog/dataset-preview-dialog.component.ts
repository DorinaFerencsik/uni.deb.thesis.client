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

    if (this.data.fileOwner === FileOwner.User) {
      combineLatest([
        this.fileService.readFile(this.data.name, this.pagination.rows, this.pagination.page),
        this.fileService.readFileStat(this.data.name),
      ]).subscribe(([fileContent, stat]) => {
          this.stats = stat;
          this.columns = Object.keys(fileContent.content[0]);
          this.fileContent = fileContent.content;
          this.pagination.totalRows = fileContent.maxRows;
      });
    } else {
      let obs = new Observable<IReadFileResponse>();
      if (this.data.source) {
        obs = this.fileService.readExampleDataset(this.data.source, this.data.name, this.pagination.rows, this.pagination.page);
      } else {
        obs = this.fileService.readExampleFile(this.data.name, this.pagination.rows, this.pagination.page);
      }

      obs.subscribe(res => {
        this.columns = Object.keys(res.content[0]);
        this.fileContent = res.content;
        this.pagination.totalRows = res.maxRows;
      });
    }
  }

}
